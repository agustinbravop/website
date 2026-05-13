import { useRef, useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

const vertexShader = `
  uniform float u_time;
  uniform vec2 u_mouse;
  varying vec2 vUv;

  void main() {
    vUv = uv;
    vec3 pos = position;

    float mouse_dist = distance(vec2(pos.x, pos.y), u_mouse);

    // Lake-like waves using multiple sine waves
    float wave1 = sin(pos.x * 2.0 + u_time * 0.5 + mouse_dist * 0.5) * 0.15;
    float wave2 = sin(pos.y * 3.0 + u_time * 0.3 - mouse_dist * 0.3) * 0.1;
    float wave3 = sin(length(uv * 2.0) - u_time * 0.8 + mouse_dist * 0.2) * 0.2;

    pos.z = wave1 + wave2 + wave3;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

const fragmentShader = `
  varying vec2 vUv;
  uniform float u_time;

  void main() {
    vec2 centeredUv = vUv - 0.5;
    float dist = max(abs(centeredUv.x), abs(centeredUv.y));

    vec3 col = vec3(0.0);

    float r = sin(centeredUv.x * 5.0 + u_time * 0.5) * 0.5 + 0.5;
    float g = sin(centeredUv.y * 4.0 - u_time * 0.6) * 0.5 + 0.5;
    float b = sin(length(centeredUv) * 10.0 + u_time * 0.7) * 0.5 + 0.5;

    col.r = r * 0.2 + 0.1; // Reduced red component
    col.g = g * 0.7 + 0.4; // Emphasized green component
    col.b = b * 0.6 + 0.5; // Kept blue component for pearly effect

    // Pearly highlight
    float highlight = smoothstep(0.1, 0.6, sin(length(centeredUv) * 15.0 - u_time) * 0.5 + 0.5);
    col += highlight * 0.2; // Slightly reduced highlight

    // Fade at edges
    float alpha = 1.0 - smoothstep(0.3, 0.475, dist);

    gl_FragColor = vec4(col, alpha * 0.35);
  }
`;

const SquareFadeMesh = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const { viewport } = useThree();

  const uniforms = useMemo(
    () => ({
      u_time: { value: 0 },
      u_mouse: { value: new THREE.Vector2(0, 0) },
    }),
    [],
  );

  useFrame(({ clock, mouse }) => {
    if (!materialRef.current) return;

    materialRef.current.uniforms.u_time.value = clock.getElapsedTime();

    // Responsive mouse position
    const x = (mouse.x * viewport.width) / 2;
    const y = (mouse.y * viewport.height) / 2;
    materialRef.current.uniforms.u_mouse.value.set(x, y);
  });

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[viewport.width, viewport.height, 60, 60]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        wireframe={true}
        transparent={true}
      />
    </mesh>
  );
};

export default SquareFadeMesh;
