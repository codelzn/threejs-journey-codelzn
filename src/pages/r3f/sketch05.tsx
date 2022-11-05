import { FC, useRef } from 'react';
import * as THREE from 'three';
import { Canvas, extend, useFrame, ReactThreeFiber } from '@react-three/fiber';
import {
  OrbitControls,
  useGLTF,
  useTexture,
  Center,
  Sparkles,
  shaderMaterial,
} from '@react-three/drei';
import vertexShader from '@/shaders/portal/vertex.glsl';
import fragmentShader from '@/shaders/portal/fragment.glsl';
declare global {
  namespace JSX {
    interface IntrinsicElements {
      portalMaterial: ReactThreeFiber.Object3DNode<
        THREE.ShaderMaterial,
        typeof PortalMaterial
      >;
    }
  }
}
const PortalMaterial = shaderMaterial(
  {
    uTime: 0,
    uColorStart: new THREE.Color('#ffffff'),
    uColorEnd: new THREE.Color('#000000'),
  },
  vertexShader,
  fragmentShader
);
extend({ PortalMaterial });
const Experience: FC = () => {
  const { nodes } = useGLTF('/models/portal.glb');
  const bakedTexture = useTexture('/models/baked.jpg');
  const portalMaterial = useRef<any>();
  useFrame((state, delta) => {
    portalMaterial.current.uniforms.uTime.value += delta;
  });
  return (
    <>
      <color args={['#201919']} attach="background" />
      <OrbitControls makeDefault />
      <Center>
        <mesh geometry={(nodes.baked as THREE.Mesh).geometry}>
          <meshBasicMaterial map={bakedTexture} map-flipY={false} />
        </mesh>
        <mesh
          geometry={(nodes.poleLightA as THREE.Mesh).geometry}
          position={(nodes.poleLightA as THREE.Mesh).position}
        >
          <meshBasicMaterial color="#ffffe5" />
        </mesh>
        <mesh
          geometry={(nodes.poleLightB as THREE.Mesh).geometry}
          position={(nodes.poleLightB as THREE.Mesh).position}
        >
          <meshBasicMaterial color="#ffffe5" />
        </mesh>
        <mesh
          geometry={(nodes.portalLight as THREE.Mesh).geometry}
          position={(nodes.portalLight as THREE.Mesh).position}
          rotation={(nodes.portalLight as THREE.Mesh).rotation}
        >
          <portalMaterial ref={portalMaterial} />
        </mesh>
        <Sparkles
          size={6}
          scale={[4, 2, 4]}
          position-y={1}
          speed={0.2}
          count={40}
        />
      </Center>
    </>
  );
};

export default function Sketch05() {
  return (
    <Canvas flat>
      <Experience />
    </Canvas>
  );
}
