import { useEffect, useRef } from "react";
import * as THREE from "three";

const GOLD = new THREE.Color("#d8b46a");
const AMBER = new THREE.Color("#f5d896");
const IVORY = new THREE.Color("#fff2cf");
const SLATE = new THREE.Color("#6f7d91");

const gauss = () => (Math.random() + Math.random() + Math.random() - 1.5) / 1.5;

function glowTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = 64;
  canvas.height = 64;
  const context = canvas.getContext("2d");
  if (!context) return null;

  const gradient = context.createRadialGradient(32, 32, 0, 32, 32, 32);
  gradient.addColorStop(0, "rgba(255,255,255,1)");
  gradient.addColorStop(0.22, "rgba(255,238,194,0.8)");
  gradient.addColorStop(0.58, "rgba(216,180,106,0.16)");
  gradient.addColorStop(1, "rgba(216,180,106,0)");
  context.fillStyle = gradient;
  context.fillRect(0, 0, 64, 64);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

function points(
  positions: number[],
  colors: number[],
  size: number,
  opacity: number,
  sprite: THREE.Texture,
) {
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
  geometry.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3));

  return new THREE.Points(
    geometry,
    new THREE.PointsMaterial({
      size,
      map: sprite,
      vertexColors: true,
      transparent: true,
      opacity,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true,
    }),
  );
}

function buildParagraphHelix(sprite: THREE.Texture) {
  const group = new THREE.Group();
  const strand: number[] = [];
  const strandColors: number[] = [];
  const innerRibbon: number[] = [];
  const innerColors: number[] = [];
  const bars: number[] = [];
  const barParticles: number[] = [];
  const barColors: number[] = [];
  const sparks: number[] = [];
  const sparkColors: number[] = [];

  const LENGTH = 122;
  const RADIUS = 9.8;
  const TURNS = 4.2;
  const PER_STRAND = 3200;

  const at = (t: number, phase: number, radius = RADIUS) => {
    const angle = t * TURNS * Math.PI * 2 + phase;
    const paragraphBend = Math.sin(t * Math.PI * 2) * 1.4;
    return [
      Math.cos(angle) * radius + paragraphBend,
      (t - 0.5) * LENGTH,
      Math.sin(angle) * radius,
    ];
  };

  for (const phase of [0, Math.PI]) {
    for (let i = 0; i < PER_STRAND; i += 1) {
      const t = i / PER_STRAND;
      const [x, y, z] = at(t, phase);
      const spread = 0.42;
      strand.push(x + gauss() * spread, y + gauss() * spread, z + gauss() * spread);

      const color = GOLD.clone()
        .lerp(AMBER, 0.35 + 0.35 * Math.sin(t * 12 + phase))
        .lerp(IVORY, Math.random() * 0.12)
        .multiplyScalar(0.9 + Math.random() * 0.55);
      strandColors.push(color.r, color.g, color.b);

      if (i % 5 === 0) {
        const [ix, iy, iz] = at(t, phase + 0.28, RADIUS * 0.58);
        innerRibbon.push(ix + gauss() * 0.24, iy + gauss() * 0.24, iz + gauss() * 0.24);
        const innerColor = SLATE.clone().lerp(GOLD, 0.45 + Math.random() * 0.35);
        innerColors.push(innerColor.r, innerColor.g, innerColor.b);
      }

      if (Math.random() < 0.01) {
        sparks.push(x, y, z);
        sparkColors.push(IVORY.r, IVORY.g, IVORY.b);
      }
    }
  }

  const BAR_COUNT = 34;
  for (let i = 0; i <= BAR_COUNT; i += 1) {
    const t = i / BAR_COUNT;
    const left = at(t, 0, RADIUS * 0.98);
    const right = at(t, Math.PI, RADIUS * 0.98);
    bars.push(...left, ...right);

    for (let k = 1; k < 18; k += 1) {
      const f = k / 18;
      const wave = Math.sin(f * Math.PI) * Math.sin(t * Math.PI * 5) * 0.7;
      barParticles.push(
        left[0] + (right[0] - left[0]) * f + gauss() * 0.14,
        left[1] + (right[1] - left[1]) * f + gauss() * 0.14,
        left[2] + (right[2] - left[2]) * f + wave + gauss() * 0.14,
      );
      const color = AMBER.clone().lerp(IVORY, Math.sin(f * Math.PI) * 0.4);
      barColors.push(color.r, color.g, color.b);
    }
  }

  group.add(points(strand, strandColors, 0.78, 0.98, sprite));
  group.add(points(innerRibbon, innerColors, 0.42, 0.72, sprite));
  group.add(points(barParticles, barColors, 0.55, 0.88, sprite));

  const lineGeometry = new THREE.BufferGeometry();
  lineGeometry.setAttribute("position", new THREE.Float32BufferAttribute(bars, 3));
  group.add(
    new THREE.LineSegments(
      lineGeometry,
      new THREE.LineBasicMaterial({
        color: GOLD,
        transparent: true,
        opacity: 0.22,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      }),
    ),
  );

  const sparkPoints = points(sparks, sparkColors, 2.5, 1, sprite);
  group.add(sparkPoints);
  return { group, sparkPoints };
}

function buildGlyphEchoes(sprite: THREE.Texture) {
  const group = new THREE.Group();

  for (let i = 0; i < 18; i += 1) {
    const y = (i / 17 - 0.5) * 104;
    const radius = 14 + Math.sin(i * 1.7) * 2.2;
    const angle = i * 0.78;
    const x = Math.cos(angle) * radius;
    const z = Math.sin(angle) * radius;

    const upper: number[] = [];
    const upperColors: number[] = [];
    const lower: number[] = [];
    const lowerColors: number[] = [];
    const spine: number[] = [];
    const spineColors: number[] = [];

    for (let k = 0; k < 40; k += 1) {
      const a = (k / 39) * Math.PI * 1.55 + 0.2;
      upper.push(Math.cos(a) * 2.1, 1.7 + Math.sin(a) * 1.35, 0);
      lower.push(-Math.cos(a) * 2.1, -1.7 - Math.sin(a) * 1.35, 0);
      upperColors.push(GOLD.r, GOLD.g, GOLD.b);
      lowerColors.push(AMBER.r, AMBER.g, AMBER.b);
    }

    for (let k = 0; k < 32; k += 1) {
      const f = k / 31;
      spine.push(Math.sin(f * Math.PI * 2) * 0.18, -3.2 + f * 6.4, 0);
      spineColors.push(IVORY.r, IVORY.g, IVORY.b);
    }

    const glyph = new THREE.Group();
    glyph.add(points(upper, upperColors, 0.38, 0.38, sprite));
    glyph.add(points(lower, lowerColors, 0.38, 0.38, sprite));
    glyph.add(points(spine, spineColors, 0.3, 0.36, sprite));
    glyph.position.set(x, y, z);
    glyph.rotation.set(Math.random() * 0.6, angle + Math.PI / 2, Math.random() * 0.4);
    glyph.scale.setScalar(0.85 + Math.random() * 0.55);
    group.add(glyph);
  }

  return group;
}

function buildDust(sprite: THREE.Texture) {
  const positions: number[] = [];
  const colors: number[] = [];

  for (let i = 0; i < 1250; i += 1) {
    positions.push((Math.random() - 0.5) * 150, (Math.random() - 0.5) * 100, (Math.random() - 0.5) * 70 - 12);
    const color = (Math.random() < 0.48 ? GOLD : SLATE.clone().lerp(AMBER, Math.random() * 0.5)).clone().multiplyScalar(0.45 + Math.random() * 0.65);
    colors.push(color.r, color.g, color.b);
  }

  return points(positions, colors, 0.36, 0.68, sprite);
}

export const KistraBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const sprite = glowTexture();
    if (!canvas || !sprite) return;

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: "low-power" });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
    renderer.setClearColor(0x000000, 0);

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x0b0f16, 0.009);
    const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 380);
    camera.position.set(0, 0, 48);

    const { group: helix, sparkPoints } = buildParagraphHelix(sprite);
    const glyphs = buildGlyphEchoes(sprite);
    const dust = buildDust(sprite);

    const tilt = new THREE.Group();
    tilt.rotation.set(0.24, -0.04, -1.02);
    tilt.position.set(7, -1, 0);
    tilt.add(helix, glyphs);
    scene.add(tilt, dust);

    const resize = () => {
      const width = canvas.clientWidth || 1;
      const height = canvas.clientHeight || 1;
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.render(scene, camera);
    };

    const observer = new ResizeObserver(resize);
    observer.observe(canvas);
    resize();

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    let last = performance.now();
    let time = 0;
    let pointerX = 0;
    let pointerY = 0;

    const onPointerMove = (event: PointerEvent) => {
      pointerX = (event.clientX / window.innerWidth - 0.5) * 0.12;
      pointerY = (event.clientY / window.innerHeight - 0.5) * 0.1;
    };

    const frame = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      time += dt;

      helix.rotation.y += dt * 0.24;
      glyphs.rotation.y -= dt * 0.08;
      glyphs.position.y = Math.sin(time * 0.18) * 1.2;

      tilt.rotation.z = -1.02 + Math.sin(time * 0.09) * 0.06 + pointerX;
      tilt.rotation.x = 0.24 + Math.sin(time * 0.11) * 0.035 + pointerY;
      dust.rotation.y += dt * 0.016;
      dust.position.y = Math.sin(time * 0.11) * 1.5;
      (sparkPoints.material as THREE.PointsMaterial).size = 2.2 + Math.sin(time * 2.2) * 0.7;

      renderer.render(scene, camera);
      raf = requestAnimationFrame(frame);
    };

    const run = () => {
      if (!raf && !reducedMotion && !document.hidden) {
        last = performance.now();
        raf = requestAnimationFrame(frame);
      }
    };

    const pause = () => {
      cancelAnimationFrame(raf);
      raf = 0;
    };

    const onVisibility = () => (document.hidden ? pause() : run());
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    document.addEventListener("visibilitychange", onVisibility);
    run();

    return () => {
      pause();
      observer.disconnect();
      window.removeEventListener("pointermove", onPointerMove);
      document.removeEventListener("visibilitychange", onVisibility);
      scene.traverse((object) => {
        const mesh = object as THREE.Object3D & { geometry?: THREE.BufferGeometry; material?: THREE.Material | THREE.Material[] };
        mesh.geometry?.dispose();
        if (Array.isArray(mesh.material)) mesh.material.forEach((material) => material.dispose());
        else mesh.material?.dispose();
      });
      sprite.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-[#090c12]" aria-hidden="true">
      <canvas ref={canvasRef} className="h-full w-full opacity-95" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_62%_14%,rgba(216,180,106,0.13),transparent_32%),radial-gradient(circle_at_24%_70%,rgba(111,125,145,0.13),transparent_34%),linear-gradient(90deg,rgba(9,12,18,0.78),rgba(9,12,18,0.24)_52%,rgba(9,12,18,0.72))]" />
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(9,12,18,0.12),rgba(9,12,18,0.54)_72%,rgba(9,12,18,0.96))]" />
      <div className="absolute inset-0 opacity-[0.08] [background-image:linear-gradient(rgba(216,180,106,0.26)_1px,transparent_1px),linear-gradient(90deg,rgba(216,180,106,0.18)_1px,transparent_1px)] [background-size:64px_64px]" />
    </div>
  );
};
