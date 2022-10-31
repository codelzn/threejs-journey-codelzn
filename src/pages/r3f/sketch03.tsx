import React from 'react';
import * as THREE from 'three';
import { Canvas, useFrame, useThree, useLoader } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { Perf } from 'r3f-perf';
import Model from '@/components/r3f/Model';
import Hamburger from '@/components/r3f/Hamburger';
import Fox from '@/components/r3f/Fox';

const Experience: React.FC = () => {
  return (
    <>
      <Perf position="top-left" />
      <OrbitControls makeDefault />
      <directionalLight
        castShadow
        position={[1, 2, 3]}
        intensity={1.5}
        shadow-normalBias={0.04}
      />
      <ambientLight intensity={0.5} />
      <mesh
        receiveShadow
        position-y={-1}
        rotation-x={-Math.PI * 0.5}
        scale={10}
      >
        <planeGeometry />
        <meshStandardMaterial color="hotpink" />
      </mesh>
      <React.Suspense
        fallback={
          <mesh position-y={0.5} scale={[2, 3, 2]}>
            <boxGeometry args={[1, 1, 1, 2, 2, 2]} />
            <meshBasicMaterial color="hotpink" wireframe />
          </mesh>
        }
      >
        {/* <Model /> */}
        <Hamburger scale={0.35} />
      </React.Suspense>
      <Fox scale={0.02} position={[-2.5, 0, 2.5]} />
    </>
  );
};

export default function Sketch03() {
  return (
    <Canvas>
      <Experience />
    </Canvas>
  );
}
