// Geometry helpers shared by the live viewer and the capture path.
// A "view" is { zoom, pan: {x, y}, rotate (quarter turns, clockwise), mirror }.

export function clampValue(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

// Keep the visible window inside the source texture.
export function clampPan(pan, zoom) {
  const m = Math.max(0, 0.5 - 0.5 / Math.max(1, zoom));
  return { x: clampValue(pan.x, -m, m), y: clampValue(pan.y, -m, m) };
}

// The canvas is displayed with object-fit: contain, so the rendered content
// occupies a centered sub-rectangle of the element's client box.
export function contentRect(canvas) {
  const rect = canvas.getBoundingClientRect();
  if (!canvas.width || !canvas.height || !rect.width || !rect.height) {
    return { left: rect.left, top: rect.top, width: 0, height: 0 };
  }
  const scale = Math.min(rect.width / canvas.width, rect.height / canvas.height);
  const width = canvas.width * scale;
  const height = canvas.height * scale;
  return {
    left: rect.left + (rect.width - width) / 2,
    top: rect.top + (rect.height - height) / 2,
    width,
    height,
  };
}

// Client coordinates -> normalized position inside the rendered content.
// May fall outside [0, 1] when the click lands on the letterbox.
export function clientToContentNorm(canvas, clientX, clientY) {
  const c = contentRect(canvas);
  if (!c.width || !c.height) return null;
  return { x: (clientX - c.left) / c.width, y: (clientY - c.top) / c.height };
}

// Normalized display position -> normalized source (video) position.
// Must mirror the UV mapping in the fragment shader exactly.
export function displayToSource(nx, ny, view) {
  let u = nx;
  let v = ny;
  const rotate = ((view.rotate % 4) + 4) % 4;
  if (rotate === 1) {
    const t = u;
    u = v;
    v = 1 - t;
  } else if (rotate === 2) {
    u = 1 - u;
    v = 1 - v;
  } else if (rotate === 3) {
    const t = u;
    u = 1 - v;
    v = t;
  }
  if (view.mirror) u = 1 - u;
  u = 0.5 + (u - 0.5) / view.zoom + view.pan.x;
  v = 0.5 + (v - 0.5) / view.zoom + view.pan.y;
  return { u: clampValue(u, 0, 1), v: clampValue(v, 0, 1) };
}

// Normalized display-space delta -> source-space delta (before zoom division).
// Linear part of displayToSource, for drag panning.
export function panDeltaToSource(dx, dy, view) {
  const rotate = ((view.rotate % 4) + 4) % 4;
  let du = dx;
  let dv = dy;
  if (rotate === 1) {
    du = dy;
    dv = -dx;
  } else if (rotate === 2) {
    du = -dx;
    dv = -dy;
  } else if (rotate === 3) {
    du = -dy;
    dv = dx;
  }
  if (view.mirror) du = -du;
  return { u: du, v: dv };
}

// Largest rectangle of the given aspect ratio centered in a container,
// scaled by `fraction`. Used for the frame guide overlay and crop-on-save.
export function fitRect(containerW, containerH, aspect, fraction = 0.9) {
  let w = containerW * fraction;
  let h = w / aspect;
  if (h > containerH * fraction) {
    h = containerH * fraction;
    w = h * aspect;
  }
  return { x: (containerW - w) / 2, y: (containerH - h) / 2, w, h };
}
