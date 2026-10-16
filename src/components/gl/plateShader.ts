export const plateVert = /* glsl */ `
  varying vec2 v_uv;

  void main() {
    v_uv = uv;
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`;

/**
 * Plates printed on the page: contour surveys, ink-drop rings in a tray of
 * water, and ruled sheets bent by the field. Ink first, clay second, gold
 * only where the press bites hardest.
 */
export const plateFrag = /* glsl */ `
  precision highp float;

  uniform vec2  u_res;
  uniform float u_time;
  uniform vec2  u_ptr;
  uniform float u_seed;
  uniform float u_mode;
  uniform vec3  u_paper;
  uniform vec3  u_ink;
  uniform vec3  u_accent;

  varying vec2 v_uv;

  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(
      mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
      mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
      u.y
    );
  }

  float fbm(vec2 p) {
    float v = 0.0;
    float a = 0.5;
    mat2 m = mat2(1.6, 1.2, -1.2, 1.6);
    for (int i = 0; i < 5; i++) {
      v += a * noise(p);
      p = m * p;
      a *= 0.5;
    }
    return v;
  }

  void main() {
    float t = u_time * 0.1;
    float aspect = u_res.x / max(u_res.y, 1.0);
    vec2 uv = v_uv;

    // The cursor drags the tray sideways rather than snapping it.
    vec2 drag = (u_ptr - 0.5) * 0.3;
    vec2 p = vec2(uv.x * aspect, uv.y) * 2.3 + vec2(u_seed * 7.3) + drag;
    p.y += t;

    vec2 q = vec2(fbm(p + vec2(0.0, t)), fbm(p + vec2(4.4, 2.1) - t));
    vec2 r = vec2(fbm(p + 2.2 * q + 1.4), fbm(p + 2.2 * q + vec2(6.1, 3.3)));
    float f = fbm(p + 2.2 * r);

    float ink = 0.0;
    float accent = 0.0;

    if (u_mode < 0.5) {
      // Survey contours — every fifth line takes the clay ink.
      float c = abs(fract(f * 9.0 - t) - 0.5);
      ink = smoothstep(0.05, 0.0, c);
      ink += smoothstep(0.15, 0.0, c) * 0.2;
      float major = abs(fract(f * 9.0 - t) - 0.5);
      accent = smoothstep(0.03, 0.0, major) * step(0.5, fract(f * 1.8 + 0.25));
    } else if (u_mode < 1.5) {
      // Suminagashi rings — ink dropped into a tray, combed once.
      vec2 src = vec2(0.5 + sin(t * 0.7) * 0.2, 0.55 + cos(t * 0.55) * 0.16);
      float d = length((uv - src) * vec2(aspect, 1.0));
      float w = sin(d * 42.0 - u_time * 0.9 + f * 4.5);
      ink = pow(1.0 - abs(w), 14.0);
      float w2 = sin(d * 42.0 - u_time * 0.9 + f * 4.5 + 1.6);
      accent = pow(1.0 - abs(w2), 18.0) * 0.8;
    } else {
      // Ruled sheet — horizontal lines bent by the field, like a ledger page.
      float rows = fract(uv.y * 26.0 + f * 1.5);
      ink = smoothstep(0.045, 0.0, abs(rows - 0.5)) * 0.85;
      ink *= smoothstep(0.05, 0.6, fbm(p * 0.6) + 0.35);
      float cols = fract(uv.x * 14.0 + r.y * 0.8);
      accent = smoothstep(0.03, 0.0, abs(cols - 0.5)) * 0.4;
      accent *= smoothstep(0.2, 0.7, f);
    }

    float body = smoothstep(0.34, 0.9, f);

    vec3 col = u_paper;
    col = mix(col, u_ink, ink * 0.55);
    col = mix(col, u_accent, accent * 0.5);
    col = mix(col, u_accent, body * 0.07);

    // Plate edge falls off like the inked border of a letterpress print.
    col *= 1.0 - 0.16 * smoothstep(0.42, 1.15, length((uv - 0.5) * vec2(aspect, 1.0)));
    col += (hash(uv * u_res + fract(u_time) + u_seed) - 0.5) * 0.006;

    gl_FragColor = vec4(col, 1.0);
  }
`;
