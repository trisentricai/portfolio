/**
 * Deterministic lattice geometry for the hero visualization.
 *
 * The structure is a woven double shell — an outer ellipsoid and a smaller
 * rotated inner core — with edges running between Fibonacci neighbours. That
 * produces a regular, engineered network rather than a random point cloud,
 * which is what keeps it from reading as a generic "AI brain" graphic.
 *
 * Everything is generated from a seeded PRNG so the composition is identical on
 * every load (no hydration-style flicker, no visual diff between sessions).
 *
 * This module deliberately has **no Three.js import**. It is shared by the WebGL
 * canvas and the static SVG fallback, and the fallback is in the initial bundle —
 * importing `three` here would drag the whole 3D engine into the critical path
 * for every visitor, including the ones who never see a 3D frame. Positions are
 * plain numbers; the canvas wraps them in `THREE.Vector3` where it needs to.
 */

const GOLDEN_ANGLE = Math.PI * (3 - Math.sqrt(5));

/** A 3D position, kept dependency-free so this module stays Three.js-free. */
export interface Point3 {
  x: number;
  y: number;
  z: number;
}

/** Small, fast, deterministic PRNG. */
function mulberry32(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export interface LatticeGeometry {
  nodePositions: Float32Array;
  /** Normalised 0–1 value driving the travelling wave, per node. */
  nodeSeeds: Float32Array;
  nodeScales: Float32Array;
  edgePositions: Float32Array;
  /** Position along the edge, 0 at `from` and 1 at `to` — drives the pulse. */
  edgeProgress: Float32Array;
  edgeSeeds: Float32Array;
  nodeCount: number;
  edgeCount: number;
}

interface Shell {
  positions: Point3[];
  seeds: number[];
  scales: number[];
}

function buildShell(count: number, radius: number, yScale: number, shellIndex: number, rand: () => number): Shell {
  const positions: Point3[] = [];
  const seeds: number[] = [];
  const scales: number[] = [];

  // Shell offset so the inner core is rotated away from the outer lattice.
  const offset = shellIndex * 0.618;
  const waist = shellIndex === 0 ? 0.055 : 0.02;

  for (let i = 0; i < count; i += 1) {
    const t = i / count;
    const y = 1 - t * 2;
    const ringRadius = Math.sqrt(Math.max(0, 1 - y * y));
    const theta = i * GOLDEN_ANGLE + offset * Math.PI * 2;

    const x = Math.cos(theta) * ringRadius;
    const z = Math.sin(theta) * ringRadius;

    // Low-frequency radial modulation: an engineered-looking "contour" shell.
    const contour = 1 + waist * Math.cos(theta * 3 + shellIndex) + 0.03 * Math.cos(y * 5);
    // Small per-vertex jitter keeps it organic without looking noisy.
    const jitter = 1 + (rand() - 0.5) * 0.035;

    positions.push({
      x: x * radius * contour * jitter,
      y: y * radius * yScale * contour,
      z: z * radius * contour * jitter,
    });
    seeds.push(i / count);
    scales.push(0.7 + rand() * 0.6);
  }

  return { positions, seeds, scales };
}

function connect(shell: Shell, offsets: number[]): { a: number; b: number }[] {
  const edges: { a: number; b: number }[] = [];
  const n = shell.positions.length;
  for (let i = 0; i < n; i += 1) {
    for (const offset of offsets) {
      const j = (i + offset) % n;
      if (i !== j) edges.push({ a: i, b: j });
    }
  }
  return edges;
}

export function buildLattice({
  outerCount = 260,
  innerCount = 110,
  radius = 1.62,
  seed = 20260117,
}: {
  outerCount?: number;
  innerCount?: number;
  radius?: number;
  seed?: number;
} = {}): LatticeGeometry {
  const rand = mulberry32(seed);

  const outer = buildShell(outerCount, radius, 0.86, 0, rand);
  const inner = buildShell(innerCount, radius * 0.54, 0.92, 1, rand);

  const nodePositions: number[] = [];
  const nodeSeeds: number[] = [];
  const nodeScales: number[] = [];

  const pushShell = (shell: Shell, seedOffset: number) => {
    shell.positions.forEach((p, i) => {
      nodePositions.push(p.x, p.y, p.z);
      nodeSeeds.push((shell.seeds[i] + seedOffset) % 1);
      nodeScales.push(shell.scales[i]);
    });
  };

  pushShell(outer, 0);
  pushShell(inner, 0.5);

  const edgePositions: number[] = [];
  const edgeProgress: number[] = [];
  const edgeSeeds: number[] = [];

  const addEdge = (from: Point3, to: Point3, seed: number) => {
    // Subdivide so the pulse has vertices to interpolate across.
    const steps = 6;
    for (let s = 0; s < steps; s += 1) {
      const t0 = s / steps;
      const t1 = (s + 1) / steps;
      edgePositions.push(
        from.x + (to.x - from.x) * t0,
        from.y + (to.y - from.y) * t0,
        from.z + (to.z - from.z) * t0,
        from.x + (to.x - from.x) * t1,
        from.y + (to.y - from.y) * t1,
        from.z + (to.z - from.z) * t1,
      );
      edgeProgress.push(t0, t1);
      edgeSeeds.push(seed, seed);
    }
  };

  let edgeSeed = 0;
  const nextSeed = () => {
    edgeSeed = (edgeSeed + 0.137) % 1;
    return edgeSeed;
  };

  const outerEdges = connect(outer, [1, 2, 3]);
  outerEdges.forEach(({ a, b }) => addEdge(outer.positions[a], outer.positions[b], nextSeed()));

  const innerEdges = connect(inner, [1, 2]);
  innerEdges.forEach(({ a, b }) => addEdge(inner.positions[a], inner.positions[b], nextSeed()));

  // Radial bridges between the core and the shell give the structure depth.
  const bridgeCount = Math.round(outerCount * 0.18);
  for (let i = 0; i < bridgeCount; i += 1) {
    const o = Math.floor((i / bridgeCount) * outerCount);
    const n = Math.floor((i / bridgeCount) * innerCount) % innerCount;
    addEdge(outer.positions[o], inner.positions[n], nextSeed());
  }

  return {
    nodePositions: new Float32Array(nodePositions),
    nodeSeeds: new Float32Array(nodeSeeds),
    nodeScales: new Float32Array(nodeScales),
    edgePositions: new Float32Array(edgePositions),
    edgeProgress: new Float32Array(edgeProgress),
    edgeSeeds: new Float32Array(edgeSeeds),
    nodeCount: outerCount + innerCount,
    edgeCount: (outerEdges.length + innerEdges.length + bridgeCount),
  };
}
