import { useMemo } from 'react';
import { buildLattice } from './latticeGeometry';

interface Projected {
  x: number;
  y: number;
  z: number;
  seed: number;
}

const SIZE = 520;
const CAMERA_Z = 4.6;
const FOCAL = 3.1;

/**
 * Static, dependency-free rendering of the same lattice.
 *
 * Used as the Suspense fallback for the 3D scene, and as the permanent
 * rendering when WebGL is unavailable, `prefers-reduced-motion` is set, or the
 * viewer is on a low-power device. It is a real projection of the real
 * geometry, not a decorative placeholder.
 */
export function LatticeStatic({ compact = false }: { compact?: boolean }) {
  const { nodes, edges } = useMemo(() => {
    const data = buildLattice(compact ? { outerCount: 150, innerCount: 62 } : {});
    const project = (x: number, y: number, z: number): Projected => {
      const scale = FOCAL / (CAMERA_Z - z);
      return { x: SIZE / 2 + x * scale * 82, y: SIZE / 2 - y * scale * 82, z, seed: 0 };
    };

    const rawNodes: { p: [number, number, number]; seed: number }[] = [];
    for (let i = 0; i < data.nodeCount; i += 1) {
      rawNodes.push({
        p: [data.nodePositions[i * 3], data.nodePositions[i * 3 + 1], data.nodePositions[i * 3 + 2]],
        seed: data.nodeSeeds[i],
      });
    }
    const projectedNodes = rawNodes.map((n) => ({ ...project(n.p[0], n.p[1], n.p[2]), seed: n.seed }));

    const edgeSegments: string[] = [];
    for (let i = 0; i < data.edgeCount * 6; i += 2) {
      const a = project(data.edgePositions[i * 3], data.edgePositions[i * 3 + 1], data.edgePositions[i * 3 + 2]);
      const b = project(data.edgePositions[(i + 1) * 3], data.edgePositions[(i + 1) * 3 + 1], data.edgePositions[(i + 1) * 3 + 2]);
      edgeSegments.push(`M${a.x.toFixed(1)} ${a.y.toFixed(1)}L${b.x.toFixed(1)} ${b.y.toFixed(1)}`);
    }

    return { nodes: projectedNodes, edges: edgeSegments };
  }, [compact]);

  return (
    <svg
      viewBox={`0 0 ${SIZE} ${SIZE}`}
      className="h-full w-full"
      role="img"
      aria-label="Abstract visualisation of a connected data lattice"
    >
      <defs>
        <radialGradient id="ts-static-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#2457FF" stopOpacity="0.16" />
          <stop offset="70%" stopColor="#6D8DFF" stopOpacity="0.05" />
          <stop offset="100%" stopColor="#6D8DFF" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="ts-node" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#2457FF" stopOpacity="1" />
          <stop offset="100%" stopColor="#2457FF" stopOpacity="0.15" />
        </radialGradient>
        <radialGradient id="ts-node-accent" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#C8FF3D" stopOpacity="1" />
          <stop offset="100%" stopColor="#C8FF3D" stopOpacity="0.2" />
        </radialGradient>
      </defs>

      <circle cx={SIZE / 2} cy={SIZE / 2} r={SIZE * 0.44} fill="url(#ts-static-glow)" />

      <g stroke="#2457FF" strokeOpacity="0.18" strokeWidth="0.7" fill="none">
        {edges.map((d, i) => (
          <path key={i} d={d} />
        ))}
      </g>

      <g>
        {nodes.map((node, i) => {
          const depth = (node.z + 2) / 4;
          const r = 1.1 + (1 - depth) * 2.2;
          const isAccent = node.seed > 0.86;
          return (
            <circle
              key={i}
              cx={node.x}
              cy={node.y}
              r={r}
              fill={isAccent ? 'url(#ts-node-accent)' : 'url(#ts-node)'}
              opacity={0.28 + (1 - depth) * 0.62}
            />
          );
        })}
      </g>
    </svg>
  );
}

export default LatticeStatic;
