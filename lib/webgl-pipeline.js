const VERTEX_SHADER = `#version 300 es
in vec2 aPos;
out vec2 vTex;
void main() {
  vTex = vec2((aPos.x + 1.0) * 0.5, 1.0 - (aPos.y + 1.0) * 0.5);
  gl_Position = vec4(aPos, 0.0, 1.0);
}`;

const FRAGMENT_SHADER = `#version 300 es
precision highp float;
in vec2 vTex;
out vec4 fragColor;
uniform sampler2D uVideo;
uniform vec3 uGains;
void main() {
  vec3 tex = texture(uVideo, vTex).rgb;
  vec3 corrected = clamp(tex * uGains, 0.0, 1.0);
  fragColor = vec4(vec3(1.0) - corrected, 1.0);
}`;

function compileShader(gl, type, source) {
  const shader = gl.createShader(type);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    const log = gl.getShaderInfoLog(shader);
    gl.deleteShader(shader);
    throw new Error(`Shader compile failed: ${log}`);
  }
  return shader;
}

function linkProgram(gl, vertSrc, fragSrc) {
  const program = gl.createProgram();
  const vert = compileShader(gl, gl.VERTEX_SHADER, vertSrc);
  const frag = compileShader(gl, gl.FRAGMENT_SHADER, fragSrc);
  gl.attachShader(program, vert);
  gl.attachShader(program, frag);
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    const log = gl.getProgramInfoLog(program);
    gl.deleteProgram(program);
    throw new Error(`Program link failed: ${log}`);
  }
  return program;
}

export function createWebGLPipeline(canvas) {
  const gl = canvas.getContext("webgl2", {
    preserveDrawingBuffer: true,
    premultipliedAlpha: false,
    antialias: false,
  });
  if (!gl) return null;

  const program = linkProgram(gl, VERTEX_SHADER, FRAGMENT_SHADER);
  gl.useProgram(program);

  const quad = new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]);
  const buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, quad, gl.STATIC_DRAW);

  const aPosLoc = gl.getAttribLocation(program, "aPos");
  gl.enableVertexAttribArray(aPosLoc);
  gl.vertexAttribPointer(aPosLoc, 2, gl.FLOAT, false, 0, 0);

  const texture = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, texture);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);

  const uVideoLoc = gl.getUniformLocation(program, "uVideo");
  const uGainsLoc = gl.getUniformLocation(program, "uGains");
  gl.uniform1i(uVideoLoc, 0);
  gl.uniform3f(uGainsLoc, 1, 1, 1);

  let disposed = false;
  let lastWidth = 0;
  let lastHeight = 0;

  function resize(width, height) {
    if (width === lastWidth && height === lastHeight) return;
    canvas.width = width;
    canvas.height = height;
    gl.viewport(0, 0, width, height);
    lastWidth = width;
    lastHeight = height;
  }

  function renderFrame(videoEl) {
    if (disposed) return;
    if (!videoEl || videoEl.readyState < 2) return;
    const w = videoEl.videoWidth;
    const h = videoEl.videoHeight;
    if (!w || !h) return;
    resize(w, h);
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texImage2D(
      gl.TEXTURE_2D,
      0,
      gl.RGB,
      gl.RGB,
      gl.UNSIGNED_BYTE,
      videoEl
    );
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
  }

  function setGains({ r, g, b }) {
    if (disposed) return;
    gl.useProgram(program);
    gl.uniform3f(uGainsLoc, r, g, b);
  }

  function dispose() {
    if (disposed) return;
    disposed = true;
    gl.deleteTexture(texture);
    gl.deleteBuffer(buffer);
    gl.deleteProgram(program);
  }

  return { renderFrame, setGains, dispose };
}

export function gainsFromBase({ r, g, b }) {
  const safe = (v) => Math.max(v, 1);
  const gray = (r + g + b) / 3;
  return {
    r: gray / safe(r),
    g: gray / safe(g),
    b: gray / safe(b),
  };
}

export const IDENTITY_GAINS = { r: 1, g: 1, b: 1 };

export function gainsAreIdentity({ r, g, b }, eps = 1e-3) {
  return (
    Math.abs(r - 1) < eps && Math.abs(g - 1) < eps && Math.abs(b - 1) < eps
  );
}
