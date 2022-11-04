import { FC } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

const Experience: FC = () => {
  return (
    <>
      <color args={['#201919']} attach="background" />
      <OrbitControls makeDefault />
      <mesh>
        <boxGeometry />
        <meshNormalMaterial />
      </mesh>
    </>
  );
};

export default function Sketch05() {
  return (
    <Canvas>
      <Experience />
    </Canvas>
  );
}
