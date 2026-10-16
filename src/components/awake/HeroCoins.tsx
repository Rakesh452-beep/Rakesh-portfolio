"use client";

import { useEffect, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useReducedMotion } from "framer-motion";
import * as THREE from "three";
import Matter from "matter-js";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";

/**
 * Falling coins for the hero, rebuilt from the awakeagency.dev reference:
 * 3D tokens carrying a struck glyph, simulated with Matter.js so they rain
 * from above the headline, knock against the type and settle on the meta rule.
 */

const COIN_COLORS = [
  "#ffffff",
  "#e3e5e7",
  "#c3c8cc",
  "#8b9298",
  "#5d646b",
  "#161d25",
  "#ffd9e2",
  "#ffb0c5",
  "#ff6f95",
  "#ff2d5e",
] as const;

const GLYPH = "R";
const FIXED_STEP = 1000 / 60;

type Box = { left: number; right: number; top: number; bottom: number };
type Metrics = {
  w: number;
  h: number;
  floor: number;
  boxes: Box[];
  r: number;
  max: number;
};

type Coin = {
  body: Matter.Body;
  group: THREE.Group;
  z: number;
  spawnAt: number;
  spawned: boolean;
};

type Build = {
  engine: Matter.Engine;
  world: Matter.World;
  coins: Coin[];
  statics: Matter.Body[];
  geoms: THREE.BufferGeometry[];
  mats: THREE.Material[];
  t: number;
  acc: number;
  reduced: boolean;
};

function glyphInk(hex: string) {
  const c = new THREE.Color(hex);
  const lum = 0.2126 * c.r + 0.7152 * c.g + 0.0722 * c.b;
  return lum > 0.55 ? "rgba(18,22,26,0.55)" : "rgba(255,255,255,0.78)";
}

function makeGlyphTexture(hex: string) {
  const s = 256;
  const cv = document.createElement("canvas");
  cv.width = cv.height = s;
  const ctx = cv.getContext("2d")!;
  const ink = glyphInk(hex);

  ctx.fillStyle = ink;
  ctx.strokeStyle = ink;
  ctx.globalAlpha = 0.45;
  ctx.lineWidth = 7;
  ctx.beginPath();
  ctx.arc(s / 2, s / 2, s * 0.38, 0, Math.PI * 2);
  ctx.stroke();

  ctx.globalAlpha = 1;
  ctx.font = `800 ${Math.round(s * 0.6)}px Arial, Helvetica, sans-serif`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(GLYPH, s / 2, s * 0.55);

  const tex = new THREE.CanvasTexture(cv);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 4;
  return tex;
}

function measureHero(hero: HTMLElement): Metrics | null {
  const hr = hero.getBoundingClientRect();
  const w = hr.width;
  const h = hr.height;
  if (w < 40 || h < 40) return null;

  const floorEl = hero.querySelector<HTMLElement>("[data-coins-floor]");
  const floor = floorEl ? floorEl.getBoundingClientRect().top - hr.top : h - 48;

  const boxes: Box[] = [];
  hero.querySelectorAll<HTMLElement>("[data-coins-above]").forEach((el) => {
    const range = document.createRange();
    range.selectNodeContents(el);
    for (const rect of Array.from(range.getClientRects())) {
      if (rect.width < 8 || rect.height < 8) continue;
      boxes.push({
        left: rect.left - hr.left,
        right: rect.right - hr.left,
        top: rect.top - hr.top,
        bottom: rect.bottom - hr.top,
      });
    }
  });

  const r = Math.round(Math.min(Math.max(w * 0.024, 20), 38));
  const max = Math.round(Math.min(Math.max(w / 120, 5), 15));
  return { w, h, floor, boxes, r, max };
}

function syncCoin(coin: Coin, metrics: Metrics) {
  coin.group.position.set(
    coin.body.position.x - metrics.w / 2,
    metrics.h / 2 - coin.body.position.y,
    coin.z,
  );
  coin.group.rotation.z = -coin.body.angle;
}

function createBuild(metrics: Metrics, reduced: boolean, root: THREE.Group): Build {
  const { w, h, floor, boxes, r, max } = metrics;
  const thickness = Math.max(4, r * 0.26);

  const engine = Matter.Engine.create({ positionIterations: 12, velocityIterations: 8 });
  engine.gravity.y = 1;
  engine.gravity.scale = 0.001;
  const world = engine.world;

  const walls: Matter.IChamferableBodyDefinition = {
    isStatic: true,
    friction: 0.6,
    restitution: 0.08,
  };
  const wallThickness = 240;
  const statics: Matter.Body[] = [
    Matter.Bodies.rectangle(-wallThickness / 2, h / 2, wallThickness, h * 4, walls),
    Matter.Bodies.rectangle(w + wallThickness / 2, h / 2, wallThickness, h * 4, walls),
    Matter.Bodies.rectangle(w / 2, floor + 20, w + wallThickness * 2, 40, {
      ...walls,
      restitution: 0.16,
    }),
  ];
  for (const b of boxes) {
    const bw = b.right - b.left;
    const bh = Math.max(6, b.bottom - b.top);
    statics.push(
      Matter.Bodies.rectangle(b.left + bw / 2, b.top + bh / 2, bw, bh, {
        isStatic: true,
        friction: 0.7,
        restitution: 0.12,
      }),
    );
  }
  Matter.Composite.add(world, statics);

  const discGeo = new THREE.CylinderGeometry(r, r, thickness, 48);
  discGeo.rotateX(Math.PI / 2);
  const faceGeo = new THREE.CircleGeometry(r * 0.9, 48);
  const geoms = [discGeo, faceGeo];

  const mats: THREE.Material[] = [];
  const discMats = COIN_COLORS.map((hex) => {
    const m = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color(hex),
      roughness: 0.42,
      metalness: 0,
      clearcoat: 0.35,
      clearcoatRoughness: 0.25,
      envMapIntensity: 0.55,
    });
    mats.push(m);
    return m;
  });
  const faceMats = COIN_COLORS.map((hex) => {
    const tex = makeGlyphTexture(hex);
    const m = new THREE.MeshPhysicalMaterial({
      map: tex,
      transparent: true,
      depthWrite: false,
      roughness: 0.5,
      metalness: 0,
      clearcoat: 0.2,
      envMapIntensity: 0.3,
    });
    m.userData.tex = tex;
    mats.push(m);
    return m;
  });

  const coins: Coin[] = [];
  for (let i = 0; i < max; i++) {
    const oi = Math.floor(Math.random() * COIN_COLORS.length);
    const body = Matter.Bodies.circle(0, 0, r, {
      restitution: 0.3,
      friction: 0.35,
      frictionAir: 0.004,
      density: 0.0018,
      slop: 0.4,
      angle: Math.random() * Math.PI * 2,
    });
    Matter.Body.setPosition(body, {
      x: r + Math.random() * (w - 2 * r),
      y: -r - Math.random() * h * 0.7,
    });
    Matter.Body.setVelocity(body, { x: (Math.random() - 0.5) * 1.6, y: 1.5 + Math.random() * 2.5 });
    Matter.Body.setAngularVelocity(body, (Math.random() - 0.5) * 0.18);

    const group = new THREE.Group();
    const disc = new THREE.Mesh(discGeo, discMats[oi]);
    const face = new THREE.Mesh(faceGeo, faceMats[oi]);
    face.position.z = thickness / 2 + 0.6;
    const back = new THREE.Mesh(faceGeo, faceMats[oi]);
    back.position.z = -thickness / 2 - 0.6;
    back.rotation.y = Math.PI;
    group.add(disc, face, back);
    group.rotation.x = (Math.random() - 0.5) * 0.35;
    group.rotation.y = (Math.random() - 0.5) * 0.35;
    group.visible = false;
    root.add(group);

    coins.push({
      body,
      group,
      z: (Math.random() - 0.5) * r * 0.5,
      spawnAt: 0.5 + i * (reduced ? 0 : 0.24 + Math.random() * 0.26),
      spawned: false,
    });
  }

  const build: Build = {
    engine,
    world,
    coins,
    statics,
    geoms,
    mats,
    t: 0,
    acc: 0,
    reduced,
  };

  if (reduced) {
    for (const coin of coins) {
      coin.spawned = true;
      coin.group.visible = true;
      Matter.Composite.add(world, coin.body);
    }
    for (let i = 0; i < 600; i++) Matter.Engine.update(engine, FIXED_STEP);
    for (const coin of coins) syncCoin(coin, metrics);
  }

  return build;
}

function disposeBuild(build: Build, root: THREE.Group) {
  for (const coin of build.coins) root.remove(coin.group);
  Matter.Composite.clear(build.world, false);
  Matter.Engine.clear(build.engine);
  for (const g of build.geoms) g.dispose();
  for (const m of build.mats) {
    const tex = m.userData?.tex as THREE.Texture | undefined;
    if (tex) tex.dispose();
    m.dispose();
  }
}

function stepBuild(build: Build, delta: number, metrics: Metrics) {
  if (build.reduced) return;

  build.t += delta;
  for (const coin of build.coins) {
    if (!coin.spawned && build.t >= coin.spawnAt) {
      coin.spawned = true;
      coin.group.visible = true;
      Matter.Composite.add(build.world, coin.body);
    }
  }

  build.acc += delta * 1000;
  const steps = Math.min(Math.floor(build.acc / FIXED_STEP), 4);
  build.acc -= steps * FIXED_STEP;
  for (let i = 0; i < steps; i++) Matter.Engine.update(build.engine, FIXED_STEP);

  for (const coin of build.coins) if (coin.spawned) syncCoin(coin, metrics);
}

function CoinStage({ metrics, reduced }: { metrics: Metrics; reduced: boolean }) {
  const rootRef = useRef<THREE.Group>(null);
  const buildRef = useRef<Build | null>(null);
  const gl = useThree((s) => s.gl);
  const scene = useThree((s) => s.scene);
  const camera = useThree((s) => s.camera);

  useEffect(() => {
    const pmrem = new THREE.PMREMGenerator(gl);
    const env = new RoomEnvironment();
    const rt = pmrem.fromScene(env, 0.04);
    scene.environment = rt.texture;
    return () => {
      scene.environment = null;
      rt.dispose();
      pmrem.dispose();
      (env as unknown as { dispose?: () => void }).dispose?.();
    };
  }, [gl, scene]);

  useEffect(() => {
    const cam = camera as THREE.PerspectiveCamera;
    const camZ = metrics.h / 2 / Math.tan(THREE.MathUtils.degToRad(14));
    cam.fov = 28;
    cam.aspect = metrics.w / metrics.h;
    cam.position.set(0, 0, camZ);
    cam.near = 1;
    cam.far = camZ * 4;
    cam.updateProjectionMatrix();
  }, [metrics, camera]);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const build = createBuild(metrics, reduced, root);
    buildRef.current = build;
    return () => {
      buildRef.current = null;
      disposeBuild(build, root);
    };
  }, [metrics, reduced]);

  useFrame((_, delta) => {
    const build = buildRef.current;
    if (!build) return;
    stepBuild(build, Math.min(delta, 0.05), metrics);
  });

  return (
    <>
      <ambientLight intensity={0.85} />
      <directionalLight
        position={[metrics.w * 0.35, metrics.h * 0.5, metrics.h]}
        intensity={1.15}
      />
      <directionalLight
        position={[-metrics.w * 0.4, -metrics.h * 0.3, metrics.h * 0.6]}
        intensity={0.45}
      />
      <group ref={rootRef} />
    </>
  );
}

export default function HeroCoins({ ready = true }: { ready?: boolean }) {
  const hostRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const [metrics, setMetrics] = useState<Metrics | null>(null);

  useEffect(() => {
    if (!ready) return;
    const hero = hostRef.current?.parentElement;
    if (!hero) return;

    const mobile = window.matchMedia("(max-width: 767px), (pointer: coarse)");
    if (mobile.matches) return;

    let raf = 0;
    const update = () => {
      raf = 0;
      setMetrics(measureHero(hero));
    };
    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    const first = window.setTimeout(schedule, reduced ? 0 : 1400);

    const rect = hero.getBoundingClientRect();
    let lastW = rect.width;
    let lastH = rect.height;
    const ro = new ResizeObserver((entries) => {
      const box = entries[0]?.contentRect;
      if (!box) return;
      if (Math.abs(box.width - lastW) < 1 && Math.abs(box.height - lastH) < 1) return;
      lastW = box.width;
      lastH = box.height;
      schedule();
    });
    ro.observe(hero);
    window.addEventListener("resize", schedule);

    return () => {
      window.clearTimeout(first);
      ro.disconnect();
      window.removeEventListener("resize", schedule);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [ready, reduced]);

  return (
    <div className="heroCoins" aria-hidden="true" ref={hostRef}>
      {metrics && (
        <Canvas
          dpr={[1, 1.75]}
          gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
          frameloop="always"
        >
          <CoinStage metrics={metrics} reduced={!!reduced} />
        </Canvas>
      )}
    </div>
  );
}
