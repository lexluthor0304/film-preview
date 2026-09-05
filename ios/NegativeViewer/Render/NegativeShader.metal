#include <metal_stdlib>
using namespace metal;

// 1:1 port of the fragment shader in lib/webgl-pipeline.js.
// Uniform names and semantics match the WebGL uniforms (uBase, uGamma, ...).
// Field order and alignment must match ShaderUniforms in RenderState.swift.
struct Uniforms {
    float3 base;    // film base color in linear light, each in (0, 1]
    float gamma;    // print contrast
    float white;    // negative transmittance that maps to paper white
    float ev;       // exposure offset in stops
    float zoom;     // digital zoom factor, >= 1
    float2 pan;     // view offset in texture space
    int mode;       // 0 = plain invert (uncorrected), 1 = mask removal + density inversion
    int filmType;   // 0 = color negative, 1 = B&W negative, 2 = positive/slide
    int rotateQ;    // quarter turns, clockwise on screen, 0-3
    int mirror;     // 1 = flip horizontally on screen
};

constant float EPS = 1e-4;

static inline float3 srgbToLinear(float3 c) {
    return select(c / 12.92, pow((c + 0.055) / 1.055, float3(2.4)), c > 0.04045);
}

static inline float3 linearToSrgb(float3 c) {
    return select(c * 12.92, 1.055 * pow(c, float3(1.0 / 2.4)) - 0.055, c > 0.0031308);
}

struct VSOut {
    float4 position [[position]];
    float2 uv;
};

// Fullscreen triangle, no vertex buffer. Maps NDC so that texel (0,0)
// (top-left of the camera buffer) lands at the top-left of the screen,
// matching the Y-flip in the WebGL vertex shader.
vertex VSOut fullscreenVertex(uint vid [[vertex_id]]) {
    float2 ndc = float2(vid == 1 ? 3.0 : -1.0, vid == 2 ? 3.0 : -1.0);
    VSOut out;
    out.position = float4(ndc, 0.0, 1.0);
    out.uv = float2(ndc.x * 0.5 + 0.5, 0.5 - ndc.y * 0.5);
    return out;
}

fragment float4 negativeFragment(VSOut in [[stage_in]],
                                 texture2d<float> video [[texture(0)]],
                                 constant Uniforms &u [[buffer(0)]]) {
    constexpr sampler s(mag_filter::linear, min_filter::linear, address::clamp_to_edge);

    // Screen UV -> source UV: undo rotation, then mirror, then zoom/pan.
    float2 uv = in.uv;
    if (u.rotateQ == 1) uv = float2(uv.y, 1.0 - uv.x);
    else if (u.rotateQ == 2) uv = float2(1.0 - uv.x, 1.0 - uv.y);
    else if (u.rotateQ == 3) uv = float2(1.0 - uv.y, uv.x);
    if (u.mirror == 1) uv.x = 1.0 - uv.x;
    uv = float2(0.5) + (uv - float2(0.5)) / u.zoom + u.pan;
    float3 tex = video.sample(s, clamp(uv, 0.0, 1.0)).rgb;

    float3 pos;
    if (u.filmType == 2) {
        pos = srgbToLinear(tex);
    } else if (u.mode == 0) {
        pos = srgbToLinear(float3(1.0) - tex);
    } else {
        float3 lin = srgbToLinear(tex);
        float3 t = clamp(lin / max(u.base, float3(EPS)), EPS, 1.0);
        // Black-point normalization: film base (t = 1) maps to exactly 0.
        float black = pow(u.white, u.gamma);
        pos = (pow(float3(u.white) / t, float3(u.gamma)) - black) / (1.0 - black);
    }
    pos = clamp(pos * exp2(u.ev), 0.0, 1.0);
    if (u.filmType == 1) {
        pos = float3(dot(pos, float3(0.2126, 0.7152, 0.0722)));
    }
    return float4(linearToSrgb(pos), 1.0);
}
