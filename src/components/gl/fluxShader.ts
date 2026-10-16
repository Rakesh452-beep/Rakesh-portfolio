export const fluxVert = /* glsl */ `
  varying vec2 v_uv;

  void main() {
    v_uv = uv;
    // The plane spans -1..1, so write it straight into clip space.
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`;

/**
 * Suminagashi — Japanese ink marbling. Two passes of domain warping curl the
 * field like water in a tray; contour bands are drawn as thin ink rings that
 * drift, and the pointer drops a fresh bead of ink that pushes them aside.
 */
export const fluxFrag = /* glsl */ `
  precision highp float;

  uniform vec2  u_res;
  uniform float u_time;
  uniform vec2  u_ptr;
  uniform float u_scroll;
  uniform vec3  u_paper;
  uniform vec3  u_ink;
  uniform vec3  u_terra;
  uniform vec3  u_gold;

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
    float t = u_time * 0.045;
    vec2 uv = v_uv;
    float aspect = u_res.x / max(u_res.y, 1.0);
    vec2 p = vec2(uv.x * aspect, uv.y) * 2.0;
    p.y += u_scroll * 0.0011;

    // The pointer is a bead of ink dropped into the tray: rings part around it.
    vec2 d = (uv - u_ptr) * vec2(aspect, 1.0);
    float pd = length(d);
    float pull = exp(-pd * 2.2);
    p += normalize(d + 1e-4) * pull * 0.22;

    // Two rounds of domain warping — the comb drawn through the floating ink.
    vec2 q = vec2(fbm(p + vec2(0.0, t)), fbm(p + vec2(5.2, 1.3) - t * 0.7));
    vec2 r = vec2(
      fbm(p + 2.4 * q + vec2(1.7, 9.2) + t * 0.5),
      fbm(p + 2.4 * q + vec2(8.3, 2.8) - t * 0.4)
    );
    float f = fbm(p + 2.1 * r);

    // Keep the copy readable: strongest through the right and lower field.
    float mask = 1.0 - 0.72 * smoothstep(0.55, 0.05, uv.y);
    mask *= 1.0 - 0.62 * smoothstep(0.18, 0.95, 1.0 - abs(uv.x - 0.58) * 1.7);
    mask = clamp(mask, 0.0, 1.0);

    // Two ink passes at different frequencies, offset so they never coincide.
    float a1 = abs(fract(f * 6.0 + r.x * 1.4 - t * 0.5) - 0.5);
    float ink1 = smoothstep(0.085, 0.0, a1);

    float a2 = abs(fract(f * 6.0 + r.y * 1.1 + 0.5 + t * 0.35) - 0.5);
    float ink2 = smoothstep(0.06, 0.0, a2);

    // Broad soft pools under the rings, like thinned ink spreading in water.
    float pool = smoothstep(0.34, 0.82, f);

    vec3 col = u_paper;
    col = mix(col, u_terra, pool * 0.13 * mask);
    col = mix(col, u_ink, ink1 * 0.40 * mask);
    col = mix(col, u_terra, ink2 * 0.34 * mask);

    // Where both inks cross, the surface flashes gold — the marbled vein.
    float vein = pow(clamp(ink1 * ink2 * 2.4, 0.0, 1.0), 1.6);
    col = mix(col, u_gold, vein * 0.42 * mask);

    // The fresh drop at the cursor darkens, as wet ink does.
    col = mix(col, u_ink, pull * 0.10);

    // Deckle vignette, then dither so the cream never bands.
    col *= 1.0 - 0.14 * smoothstep(0.5, 1.3, length((uv - 0.5) * vec2(aspect, 1.0)));
    col += (hash(uv * u_res + fract(u_time)) - 0.5) * 0.007;

    gl_FragColor = vec4(col, 1.0);
  }
`;
