"use client";

import { useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useReducedMotion } from "framer-motion";
import * as THREE from "three";
import { plateFrag, plateVert } from "./plateShader";
import { PALETTE, srgb } from "@/lib/srgb";

function Plate({ variant, seed }: { variant: number; seed: number }) {
  const gl = useThree((s) => s.gl);
  const pointer = useRef({ x: 0.5, y: 0.5 });

  const uniforms = useMemo(
    () => ({
      u_res: { value: new THREE.Vector2(1, 1) },
      u_time: { value: 0 },
      u_ptr: { value: new THREE.Vector2(0.5, 0.5) },
      u_seed: { value: seed },
      u_mode: { value: variant % 3 },
      u_paper: { value: srgb(PALETTE.paper2) },
      u_ink: { value: srgb(PALETTE.ink2) },
      u_accent: { value: srgb(variant % 2 === 0 ? PALETTE.terra : PALETTE.gold) },
    }),
    [variant, seed],
  );

  useEffect(() => {
    const el = gl.domElement;
    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      pointer.current.x = (e.clientX - r.left) / r.width;
      pointer.current.y = 1 - (e.clientY - r.top) / r.height;
    };
    el.addEventListener("pointermove", onMove, { passive: true });
    return () => el.removeEventListener("pointermove", onMove);
  }, [gl]);

  useFrame((state, delta) => {
    const u = uniforms;
    u.u_res.value.set(state.size.width, state.size.height);
    u.u_time.value += delta;
    const k = Math.min(1, delta * 3);
    u.u_ptr.value.x += (pointer.current.x - u.u_ptr.value.x) * k;
    u.u_ptr.value.y += (pointer.current.y - u.u_ptr.value.y) * k;
  });

  return (
    <mesh frustumCulled={false}>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        vertexShader={plateVert}
        fragmentShader={plateFrag}
        uniforms={uniforms}
        depthTest={false}
        depthWrite={false}
      />
    </mesh>
  );
}

export default function ProjectVisual({
  variant = 0,
  seed = 1,
}: {
  variant?: number;
  seed?: number;
}) {
  const reduced = useReducedMotion();

  return (
    <div aria-hidden className="absolute inset-0">
      <Canvas
        dpr={[1, 1.5]}
        gl={{
          antialias: false,
          alpha: false,
          powerPreference: "high-performance",
          preserveDrawingBuffer: false,
        }}
        frameloop={reduced ? "never" : "always"}
      >
        <Plate variant={variant} seed={seed} />
      </Canvas>
    </div>
  );
}
