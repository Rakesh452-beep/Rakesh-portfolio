"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { PALETTE, srgb, seeded } from "@/lib/srgb";

const vert = /* glsl */ `
  uniform float u_time;
  uniform vec2  u_ptr;
  uniform float u_amount;

  varying vec3  v_nrm;
  varying vec3  v_view;
  varying float v_disp;

  float hash(vec3 p) {
    p = fract(p * 0.3183099 + vec3(0.1, 0.2, 0.3));
    p *= 17.0;
    return fract(p.x * p.y * p.z * (p.x + p.y + p.z));
  }

  float noise3(vec3 x) {
    vec3 i = floor(x);
    vec3 f = fract(x);
    f = f * f * (3.0 - 2.0 * f);
    return mix(
      mix(mix(hash(i), hash(i + vec3(1, 0, 0)), f.x),
          mix(hash(i + vec3(0, 1, 0)), hash(i + vec3(1, 1, 0)), f.x), f.y),
      mix(mix(hash(i + vec3(0, 0, 1)), hash(i + vec3(1, 0, 1)), f.x),
          mix(hash(i + vec3(0, 1, 1)), hash(i + vec3(1, 1, 1)), f.x), f.y),
      f.z
    );
  }

  float fbm3(vec3 p) {
    float v = 0.0;
    float a = 0.5;
    for (int i = 0; i < 3; i++) {
      v += a * noise3(p);
      p *= 2.03;
      a *= 0.5;
    }
    return v;
  }

  void main() {
    vec3 nrm = normalize(normal);
    float t = u_time * 0.3;
    vec3 sp = position * 1.5 + vec3(0.0, t, t * 0.4);

    float a = fbm3(sp) - 0.5;
    float b = fbm3(sp * 2.3 - t * 0.65) - 0.5;

    // The side the cursor points at inflates, so the form answers the pointer.
    vec3 dir = normalize(vec3(u_ptr * 1.5, 0.85));
    float infl = smoothstep(-0.35, 1.0, dot(nrm, dir));

    // Hammered-bronze chatter: a fine second octave catches the light.
    float hammer = noise3(position * 26.0 + t * 0.6) - 0.5;

    float disp = (a * 0.34 + b * 0.12) * u_amount * (0.5 + 0.95 * infl);
    disp += hammer * 0.014;
    vec3 pos = position + nrm * disp;

    vec4 mv = modelViewMatrix * vec4(pos, 1.0);
    v_nrm = normalize(normalMatrix * nrm);
    v_view = -mv.xyz;
    v_disp = disp;
    gl_Position = projectionMatrix * mv;
  }
`;

/**
 * Cast bronze on cream. The body runs deep umber into warm shell; the rim
 * lights terracotta, the highlight is burnished gold — a small sculpture
 * sitting on the page rather than a glowing orb floating in a void.
 */
const frag = /* glsl */ `
  precision highp float;

  uniform vec3 u_deep;
  uniform vec3 u_shell;
  uniform vec3 u_terra;
  uniform vec3 u_gold;
  uniform vec3 u_paper;

  varying vec3  v_nrm;
  varying vec3  v_view;
  varying float v_disp;

  void main() {
    vec3 n = normalize(v_nrm);
    vec3 v = normalize(v_view);

    float fres = pow(1.0 - clamp(dot(n, v), 0.0, 1.0), 2.2);

    vec3 l = normalize(vec3(0.5, 0.9, 0.65));
    float diff = clamp(dot(n, l), 0.0, 1.0);
    vec3 h = normalize(l + v);
    float spec = pow(clamp(dot(n, h), 0.0, 1.0), 46.0);

    // A cool fill from below-left keeps the shadow side from going dead.
    vec3 fill = normalize(vec3(-0.6, -0.35, 0.5));
    float bounce = clamp(dot(n, fill), 0.0, 1.0) * 0.28;

    float t = smoothstep(-0.07, 0.13, v_disp);

    vec3 col = mix(u_deep, u_shell, t) * (0.42 + 0.55 * diff);
    col += u_terra * fres * 0.62;
    col += u_gold * spec * 0.85;
    col += u_shell * bounce;
    col += u_gold * smoothstep(0.1, 0.22, v_disp) * 0.14;

    // Sit the form on the page: the furthest edge takes a wash of paper.
    col = mix(col, u_paper, fres * 0.10);

    gl_FragColor = vec4(col, 1.0);
  }
`;

function Knot() {
  const mat = useRef<THREE.ShaderMaterial>(null);
  const group = useRef<THREE.Group>(null);

  const uniforms = useMemo(
    () => ({
      u_time: { value: 0 },
      u_ptr: { value: new THREE.Vector2(0, 0) },
      u_amount: { value: 1 },
      u_deep: { value: srgb(PALETTE.bronzeDeep) },
      u_shell: { value: srgb(PALETTE.bronze) },
      u_terra: { value: srgb(PALETTE.terraBright) },
      u_gold: { value: srgb(PALETTE.goldBright) },
      u_paper: { value: srgb(PALETTE.paper) },
    }),
    [],
  );

  useFrame((state, delta) => {
    const k = Math.min(1, delta * 3.2);
    const { pointer } = state;

    if (mat.current) {
      const u = mat.current.uniforms;
      u.u_time.value += delta;
      u.u_ptr.value.x += (pointer.x - u.u_ptr.value.x) * k;
      u.u_ptr.value.y += (pointer.y - u.u_ptr.value.y) * k;
    }
    if (group.current) {
      group.current.rotation.y += delta * 0.16;
      group.current.rotation.x += (pointer.y * 0.2 - group.current.rotation.x) * k * 0.55;
      group.current.rotation.z += (-pointer.x * 0.12 - group.current.rotation.z) * k * 0.55;
    }
  });

  return (
    <group ref={group}>
      <mesh>
        <torusKnotGeometry args={[0.95, 0.3, 240, 44]} />
        <shaderMaterial
          ref={mat}
          vertexShader={vert}
          fragmentShader={frag}
          uniforms={uniforms}
        />
      </mesh>

      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.62, 0.004, 4, 128]} />
        <meshBasicMaterial color={PALETTE.gold} transparent opacity={0.7} />
      </mesh>

      <mesh rotation={[Math.PI / 2.7, 0.6, 0]}>
        <torusGeometry args={[2.05, 0.0035, 4, 128]} />
        <meshBasicMaterial color={PALETTE.terra} transparent opacity={0.5} />
      </mesh>

      <Drift />
    </group>
  );
}

function Drift() {
  const ref = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const count = 900;
    const arr = new Float32Array(count * 3);
    const rand = seeded(20250714);
    for (let i = 0; i < count; i++) {
      const r = 1.85 + rand() * 2.1;
      const theta = rand() * Math.PI * 2;
      const phi = Math.acos(2 * rand() - 1);
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) * 0.68;
      arr[i * 3 + 2] = r * Math.cos(phi);
    }
    return arr;
  }, []);

  const colors = useMemo(() => {
    const count = 900;
    const arr = new Float32Array(count * 3);
    const rand = seeded(20250714);
    const terra = srgb(PALETTE.terra);
    const gold = srgb(PALETTE.goldBright);
    const ink = srgb(PALETTE.ink2);
    for (let i = 0; i < count; i++) {
      const pick = rand();
      const src = pick > 0.84 ? gold : pick > 0.62 ? terra : ink;
      arr[i * 3] = src.x;
      arr[i * 3 + 1] = src.y;
      arr[i * 3 + 2] = src.z;
    }
    return arr;
  }, []);

  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y -= delta * 0.045;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.022}
        vertexColors
        transparent
        opacity={0.6}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

function Rig({ still }: { still: boolean }) {
  const group = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (still || !group.current) return;
    const { pointer, viewport } = state;
    group.current.position.x += (pointer.x * viewport.width * 0.09 - group.current.position.x) * 0.05;
    group.current.position.y += (pointer.y * viewport.height * 0.09 - group.current.position.y) * 0.05;
  });

  return (
    <group ref={group}>
      <Knot />
    </group>
  );
}

export default function HeroScene({ still = false }: { still?: boolean }) {
  return (
    <Canvas
      dpr={[1, 1.75]}
      camera={{ position: [0, 0, 4.2], fov: 42 }}
      gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }}
      frameloop={still ? "never" : "always"}
    >
      <Rig still={still} />
    </Canvas>
  );
}
