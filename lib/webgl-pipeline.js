import { srgbToLinear } from "./color";

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
uniform int uMode;     // 0 = plain invert (uncorrected), 1 = mask removal + density inversion
uniform int uFilmType; // 0 = color negative, 1 = B&W negative, 2 = positive/slide
uniform vec3 uBase;    // film base color in linear light, each in (0, 1]
uniform float uGamma;  // print contrast
uniform float uWhite;  // negative transmittance that maps to paper white
uniform float uEv;     // exposure offset in stops
uniform float uZoom;   // digital zoom factor, >= 1
uniform vec2 uPan;     // view offset in texture space
uniform int uRotate;   // quarter turns, clockwise on screen, 0-3
uniform int uMirror;   // 1 = flip horizontally on screen

const float EPS = 1e-4;

vec3 srgbToLinear(vec3 c) {
  return mix(c / 12.92, pow((c + 0.055) / 1.055, vec3(2.4)), step(0.04045, c));
}

vec3 linearToSrgb(vec3 c) {
  return mix(c * 12.92, 1.055 * pow(c, vec3(1.0 / 2.4)) - 0.055, step(0.0031308, c));
}

void main() {
  // Screen UV -> source UV: undo rotation, then mirror, then zoom/pan.
  vec2 uv = vTex;
  if (uRotate == 1) uv = vec2(uv.y, 1.0 - uv.x);
  else if (uRotate == 2) uv = vec2(1.0 - uv.x, 1.0 - uv.y);
  else if (uRotate == 3) uv = vec2(1.0 - uv.y, uv.x);
  if (uMirror == 1) uv.x = 1.0 - uv.x;
  uv = vec2(0.5) + (uv - vec2(0.5)) / uZoom + uPan;
  vec3 tex = texture(uVideo, clamp(uv, 0.0, 1.0)).rgb;

  vec3 pos;
  if (uFilmType == 2) {
    pos = srgbToLinear(tex);
  } else if (uMode == 0) {
    pos = srgbToLinear(vec3(1.0) - tex);
  } else {
    vec3 lin = srgbToLinear(tex);
    vec3 t = clamp(lin / max(uBase, vec3(EPS)), EPS, 1.0);
    // Black-point normalization: film base (t = 1) maps to exactly 0.
    float black = pow(uWhite, uGamma);
    pos = (pow(vec3(uWhite) / t, vec3(uGamma)) - black) / (1.0 - black);
  }
  pos = clamp(pos * exp2(uEv), 0.0, 1.0);
  if (uFilmType == 1) {
    pos = vec3(dot(pos, vec3(0.2126, 0.7152, 0.0722)));
  }
  fragColor = vec4(linearToSrgb(pos), 1.0);
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

function sourceSize(source) {
  return {
    width: source.videoWidth ?? source.width ?? 0,
    height: source.videoHeight ?? source.height ?? 0,
  };
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
  const uModeLoc = gl.getUniformLocation(program, "uMode");
  const uFilmTypeLoc = gl.getUniformLocation(program, "uFilmType");
  const uBaseLoc = gl.getUniformLocation(program, "uBase");
  const uGammaLoc = gl.getUniformLocation(program, "uGamma");
  const uWhiteLoc = gl.getUniformLocation(program, "uWhite");
  const uEvLoc = gl.getUniformLocation(program, "uEv");
  const uZoomLoc = gl.getUniformLocation(program, "uZoom");
  const uPanLoc = gl.getUniformLocation(program, "uPan");
  const uRotateLoc = gl.getUniformLocation(program, "uRotate");
  const uMirrorLoc = gl.getUniformLocation(program, "uMirror");
  gl.uniform1i(uVideoLoc, 0);
  gl.uniform1i(uModeLoc, 0);
  gl.uniform1i(uFilmTypeLoc, 0);
  gl.uniform3f(uBaseLoc, 1, 1, 1);
  gl.uniform1f(uGammaLoc, DEFAULT_GAMMA);
  gl.uniform1f(uWhiteLoc, DEFAULT_WHITE);
  gl.uniform1f(uEvLoc, 0);
  gl.uniform1f(uZoomLoc, 1);
  gl.uniform2f(uPanLoc, 0, 0);
  gl.uniform1i(uRotateLoc, 0);
  gl.uniform1i(uMirrorLoc, 0);

  let disposed = false;
  let lastWidth = 0;
  let lastHeight = 0;
  let rotateQuarter = 0;

  function resize(width, height) {
    if (width === lastWidth && height === lastHeight) return;
    canvas.width = width;
    canvas.height = height;
    gl.viewport(0, 0, width, height);
    lastWidth = width;
    lastHeight = height;
  }

  function renderFrame(source) {
    if (disposed || !source) return;
    if (source.readyState !== undefined && source.readyState < 2) return;
    const { width, height } = sourceSize(source);
    if (!width || !height) return;
    const rotated = rotateQuarter % 2 === 1;
    resize(rotated ? height : width, rotated ? width : height);
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texImage2D(
      gl.TEXTURE_2D,
      0,
      gl.RGB,
      gl.RGB,
      gl.UNSIGNED_BYTE,
      source
    );
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
  }

  function setCorrection(correction) {
    if (disposed) return;
    gl.useProgram(program);
    if (!correction) {
      gl.uniform1i(uModeLoc, 0);
      return;
    }
    const { base, gamma, white } = correction;
    gl.uniform1i(uModeLoc, 1);
    gl.uniform3f(uBaseLoc, base.r, base.g, base.b);
    gl.uniform1f(uGammaLoc, gamma);
    gl.uniform1f(uWhiteLoc, white);
  }

  function setAdjust({ ev = 0, filmType = 0 } = {}) {
    if (disposed) return;
    gl.useProgram(program);
    gl.uniform1f(uEvLoc, ev);
    gl.uniform1i(uFilmTypeLoc, filmType);
  }

  function setView({ zoom = 1, pan = { x: 0, y: 0 }, rotate = 0, mirror = false } = {}) {
    if (disposed) return;
    gl.useProgram(program);
    rotateQuarter = ((rotate % 4) + 4) % 4;
    gl.uniform1f(uZoomLoc, Math.max(1, zoom));
    gl.uniform2f(uPanLoc, pan.x, pan.y);
    gl.uniform1i(uRotateLoc, rotateQuarter);
    gl.uniform1i(uMirrorLoc, mirror ? 1 : 0);
  }

  function clear() {
    if (disposed) return;
    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT);
  }

  function dispose() {
    if (disposed) return;
    disposed = true;
    gl.deleteTexture(texture);
    gl.deleteBuffer(buffer);
    gl.deleteProgram(program);
  }

  return {
    renderFrame,
    setCorrection,
    setAdjust,
    setView,
    clear,
    dispose,
    maxTextureSize: gl.getParameter(gl.MAX_TEXTURE_SIZE) || 4096,
  };
}

export const DEFAULT_GAMMA = 1.6;
export const DEFAULT_WHITE = 0.1;

export function correctionFromSample(base255, opts = {}) {
  // Clamp to 254: a blown-out base sample would make srgbToLinear ≈ 1 and
  // the per-channel division a no-op.
  const lin = (v) => Math.max(srgbToLinear(Math.min(v, 254) / 255), 1e-4);
  return {
    base: { r: lin(base255.r), g: lin(base255.g), b: lin(base255.b) },
    gamma: opts.gamma ?? DEFAULT_GAMMA,
    white: opts.white ?? DEFAULT_WHITE,
  };
}
