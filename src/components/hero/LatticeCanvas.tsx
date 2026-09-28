import { useEffect, useMemo, useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { buildLattice } from './latticeGeometry';

const BRAND = new THREE.Color('#2457FF');
const BRAND_SOFT = new THREE.Color('#6D8DFF');
const ACCENT = new THREE.Color('#C8FF3D');

/* -------------------------------------------------------------------------- */
/* Shaders                                                                    */
/* -------------------------------------------------------------------------- */

const NODE_VERTEX = /* glsl */ `
  attribute float aSeed;
  attribute float aScale;

  uniform float uTime;
  uniform float uSize;
  uniform float uPixelRatio;
  uniform vec3  uHover;
  uniform float uHoverActive;

  varying float vWave;
  varying float vHover;
  varying float vSeed;

  void main() {
    vSeed = aSeed;

    // A single wave travelling around the lattice, sharpened so most nodes
    // stay quiet and a moving band lights up.
    float w = sin(aSeed * 6.2831853 - uTime * 0.85) * 0.5 + 0.5;
    w = pow(w, 4.0);
    vWave = w;

    float hover = uHoverActive * smoothstep(0.62, 0.0, distance(position, uHover));
    vHover = hover;

    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    float size = uSize * aScale * (1.0 + w * 0.85 + hover * 1.35);
    gl_PointSize = size * uPixelRatio * (1.0 / max(-mv.z, 0.001));
    gl_Position = projectionMatrix * mv;
  }
`;

const NODE_FRAGMENT = /* glsl */ `
  precision highp float;

  uniform vec3 uBrand;
  uniform vec3 uBrandSoft;
  uniform vec3 uAccent;

  varying float vWave;
  varying float vHover;
  varying float vSeed;

  void main() {
    vec2 uv = gl_PointCoord - vec2(0.5);
    float d = length(uv);
    if (d > 0.5) discard;

    float core = smoothstep(0.5, 0.05, d);
    float halo = smoothstep(0.5, 0.0, d);

    vec3 base = mix(uBrand, uBrandSoft, vSeed * 0.7);
    vec3 col = mix(base, uAccent, clamp(vWave * 1.15 + vHover * 0.6, 0.0, 1.0));

    float alpha = core * (0.62 + vWave * 0.38) + halo * halo * 0.22;
    alpha = clamp(alpha + vHover * 0.25, 0.0, 1.0);

    gl_FragColor = vec4(col, alpha);
  }
`;

const EDGE_VERTEX = /* glsl */ `
  attribute float aProgress;
  attribute float aSeed;

  uniform float uTime;

  varying float vPulse;
  varying float vSeed;

  void main() {
    vSeed = aSeed;
    // A packet travelling from one end of the edge to the other.
    float head = fract(uTime * 0.28 + aSeed);
    float d = abs(aProgress - head);
    d = min(d, 1.0 - d);
    vPulse = smoothstep(0.10, 0.0, d);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const EDGE_FRAGMENT = /* glsl */ `
  precision highp float;

  uniform vec3 uBrand;
  uniform vec3 uAccent;
  uniform float uOpacity;

  varying float vPulse;
  varying float vSeed;

  void main() {
    vec3 col = mix(uBrand, uAccent, vPulse * 0.9);
    float alpha = (uOpacity * (0.35 + vSeed * 0.25)) + vPulse * 0.75;
    gl_FragColor = vec4(col, alpha);
  }
`;

/* -------------------------------------------------------------------------- */
/* Scene                                                                      */
/* -------------------------------------------------------------------------- */

interface SceneProps {
  compact: boolean;
  interactive: boolean;
}

function Lattice({ compact, interactive }: SceneProps) {
  const groupRef = useRef<THREE.Group>(null);
  const pointer = useRef({ x: 0, y: 0 });
  const target = useRef({ x: 0, y: 0 });
  const hoverPoint = useRef(new THREE.Vector3(99, 99, 99));
  const hoverActive = useRef(0);
  const { viewport } = useThree();

  const lattice = useMemo(
    () => buildLattice(compact ? { outerCount: 150, innerCount: 62 } : {}),
    [compact],
  );

  const nodeGeometry = useMemo(() => {
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.BufferAttribute(lattice.nodePositions, 3));
    g.setAttribute('aSeed', new THREE.BufferAttribute(lattice.nodeSeeds, 1));
    g.setAttribute('aScale', new THREE.BufferAttribute(lattice.nodeScales, 1));
    return g;
  }, [lattice]);

  const edgeGeometry = useMemo(() => {
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.BufferAttribute(lattice.edgePositions, 3));
    g.setAttribute('aProgress', new THREE.BufferAttribute(lattice.edgeProgress, 1));
    g.setAttribute('aSeed', new THREE.BufferAttribute(lattice.edgeSeeds, 1));
    return g;
  }, [lattice]);

  const nodeMaterial = useMemo(
    () =>
      new THREE.ShaderMaterial({
        vertexShader: NODE_VERTEX,
        fragmentShader: NODE_FRAGMENT,
        transparent: true,
        depthWrite: false,
        uniforms: {
          uTime: { value: 0 },
          uSize: { value: compact ? 26 : 32 },
          uPixelRatio: { value: Math.min(window.devicePixelRatio || 1, 2) },
          uHover: { value: new THREE.Vector3(99, 99, 99) },
          uHoverActive: { value: 0 },
          uBrand: { value: BRAND },
          uBrandSoft: { value: BRAND_SOFT },
          uAccent: { value: ACCENT },
        },
      }),
    [compact],
  );

  const edgeMaterial = useMemo(
    () =>
      new THREE.ShaderMaterial({
        vertexShader: EDGE_VERTEX,
        fragmentShader: EDGE_FRAGMENT,
        transparent: true,
        depthWrite: false,
        blending: THREE.NormalBlending,
        uniforms: {
          uTime: { value: 0 },
          uOpacity: { value: compact ? 0.16 : 0.2 },
          uBrand: { value: BRAND },
          uAccent: { value: ACCENT },
        },
      }),
    [compact],
  );

  useEffect(
    () => () => {
      nodeGeometry.dispose();
      edgeGeometry.dispose();
      nodeMaterial.dispose();
      edgeMaterial.dispose();
    },
    [nodeGeometry, edgeGeometry, nodeMaterial, edgeMaterial],
  );

  useFrame((state, delta) => {
    const group = groupRef.current;
    if (!group) return;

    const t = state.clock.elapsedTime;

    nodeMaterial.uniforms.uTime.value = t;
    edgeMaterial.uniforms.uTime.value = t;

    if (interactive) {
      // Eased pointer parallax, frame-rate independent.
      pointer.current.x += (target.current.x - pointer.current.x) * Math.min(1, delta * 3.2);
      pointer.current.y += (target.current.y - pointer.current.y) * Math.min(1, delta * 3.2);
      hoverActive.current += (1 - hoverActive.current) * Math.min(1, delta * 4);

      group.rotation.y = pointer.current.x * 0.34 + t * 0.075;
      group.rotation.x = pointer.current.y * 0.24 + Math.sin(t * 0.28) * 0.045;
      group.position.x = pointer.current.x * 0.1;
      group.position.y = pointer.current.y * -0.08;

      // Project the pointer into the group's local space for the hover field.
      const ndc = new THREE.Vector2(
        (state.pointer.x * viewport.width) / viewport.width,
        (state.pointer.y * viewport.height) / viewport.height,
      );
      const world = new THREE.Vector3(ndc.x * 1.7, ndc.y * 1.7, 0.4);
      group.worldToLocal(hoverPoint.current.copy(world));
      nodeMaterial.uniforms.uHover.value.copy(hoverPoint.current);
      nodeMaterial.uniforms.uHoverActive.value = hoverActive.current;
    } else {
      group.rotation.y = t * 0.09;
      group.rotation.x = Math.sin(t * 0.3) * 0.05;
    }
  });

  return (
    <group ref={groupRef}>
      <lineSegments geometry={edgeGeometry} material={edgeMaterial} frustumCulled={false} />
      <points geometry={nodeGeometry} material={nodeMaterial} frustumCulled={false} />
    </group>
  );
}

/** Soft blue bloom rendered behind the lattice to lift it off the background. */
function CoreGlow({ compact }: { compact: boolean }) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime;
    const material = ref.current.material as THREE.ShaderMaterial;
    material.uniforms.uTime.value = t;
  });

  const material = useMemo(
    () =>
      new THREE.ShaderMaterial({
        transparent: true,
        depthWrite: false,
        uniforms: { uTime: { value: 0 } },
        vertexShader: /* glsl */ `
          varying vec2 vUv;
          void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,
        fragmentShader: /* glsl */ `
          precision highp float;
          uniform float uTime;
          varying vec2 vUv;
          void main() {
            float d = distance(vUv, vec2(0.5));
            float ring = smoothstep(0.5, 0.06, d);
            float pulse = 0.5 + 0.5 * sin(uTime * 0.55);
            vec3 col = mix(vec3(0.141, 0.341, 1.0), vec3(0.427, 0.553, 1.0), pulse);
            gl_FragColor = vec4(col, ring * (0.07 + pulse * 0.045));
          }
        `,
      }),
    [],
  );

  useEffect(() => () => material.dispose(), [material]);

  return (
    <mesh ref={ref} position={[0, 0, -1.4]} material={material} scale={compact ? 5.2 : 6.4}>
      <planeGeometry args={[1, 1]} />
    </mesh>
  );
}

export function LatticeCanvas({ compact = false, interactive = true }: { compact?: boolean; interactive?: boolean }) {
  return (
    <Canvas
      dpr={[1, compact ? 1.5 : 2]}
      gl={{ antialias: !compact, alpha: true, powerPreference: 'high-performance' }}
      camera={{ position: [0, 0, 4.6], fov: 42 }}
      style={{ width: '100%', height: '100%' }}
    >
      <Lattice compact={compact} interactive={interactive} />
      <CoreGlow compact={compact} />
    </Canvas>
  );
}

export default LatticeCanvas;
