import * as THREE from "three";

/**
 * Raw ShaderMaterials bypass three's linear -> sRGB output conversion, so
 * colours are supplied as plain sRGB triplets and written straight through.
 * That keeps the shader output an exact match for the CSS palette.
 */
export function srgb(hex: string) {
  const n = parseInt(hex.replace("#", ""), 16);
  return new THREE.Vector3(((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255);
}

export const PALETTE = {
  paper: "#f6efe1",
  paper2: "#efe6d3",
  paper3: "#e6d9bf",
  ink: "#1d1811",
  ink2: "#453a2c",
  ink3: "#6c5c47",
  terra: "#b8461c",
  terraBright: "#d95f30",
  gold: "#9a7415",
  goldBright: "#c9a227",
  bronze: "#8a5a2b",
  bronzeDeep: "#2a1c10",
} as const;

/** Deterministic pseudo-random, so server and client markup can't diverge. */
export function seeded(seed: number) {
  let s = seed;
  return () => {
    s = (s * 1664525 + 1013904223) % 4294967296;
    return s / 4294967296;
  };
}
