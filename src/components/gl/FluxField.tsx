"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useReducedMotion } from "framer-motion";
import * as THREE from "three";
import { fluxFrag, fluxVert } from "./fluxShader";
import { PALETTE, srgb } from "@/lib/srgb";

function useActive() {
  const [active, setActive] = useState(true);
  useEffect(() => {
    const onChange = () => setActive(!document.hidden);
    document.addEventListener("visibilitychange", onChange);
    return () => document.removeEventListener("visibilitychange", onChange);
  }, []);
  return active;
}

function FluxPlane({ still }: { still: boolean }) {
  const { size } = useThree();
  const pointer = useRef({ x: 0.5, y: 0.55 });

  const uniforms = useMemo(
    () => ({
      u_res: { value: new THREE.Vector2(1, 1) },
      u_time: { value: 0 },
      u_scroll: { value: 0 },
      u_ptr: { value: new THREE.Vector2(0.5, 0.55) },
      u_paper: { value: srgb(PALETTE.paper) },
      u_ink: { value: srgb(PALETTE.ink) },
      u_terra: { value: srgb(PALETTE.terra) },
      u_gold: { value: srgb(PALETTE.goldBright) },
    }),
    [],
  );

  useEffect(() => {
    uniforms.u_res.value.set(size.width, size.height);
  }, [size, uniforms]);

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      pointer.current.x = e.clientX / Math.max(window.innerWidth, 1);
      pointer.current.y = 1 - e.clientY / Math.max(window.innerHeight, 1);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  useFrame((_, delta) => {
    const u = uniforms;
    u.u_scroll.value = window.scrollY;

    if (still) {
      u.u_time.value = 24;
      return;
    }
    u.u_time.value += delta;

    const k = Math.min(1, delta * 2.4);
    u.u_ptr.value.x += (pointer.current.x - u.u_ptr.value.x) * k;
    u.u_ptr.value.y += (pointer.current.y - u.u_ptr.value.y) * k;
  });

  return (
    <mesh frustumCulled={false}>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        vertexShader={fluxVert}
        fragmentShader={fluxFrag}
        uniforms={uniforms}
        depthTest={false}
        depthWrite={false}
      />
    </mesh>
  );
}

export default function FluxField() {
  const reduced = useReducedMotion();
  const active = useActive();
  const still = !!reduced;

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 z-0" style={{ contain: "strict" }}>
      <Canvas
        dpr={[1, 1.25]}
        gl={{
          antialias: false,
          alpha: false,
          powerPreference: "high-performance",
          preserveDrawingBuffer: false,
        }}
        frameloop={still ? "never" : active ? "always" : "never"}
      >
        <FluxPlane still={still} />
      </Canvas>
    </div>
  );
}
