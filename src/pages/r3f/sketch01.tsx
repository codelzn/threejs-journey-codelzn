import React, { useRef } from 'react';
import * as THREE from 'three';
import { Canvas } from '@react-three/fiber';
import {
  Html,
  OrbitControls,
  TransformControls,
  PivotControls,
  Text,
  Float,
  MeshReflectorMaterial,
} from '@react-three/drei';

const Experience: React.FC = () => {
  const cubeRef = useRef<THREE.Mesh>(null!);
  const sphereRef = useRef<THREE.Mesh>(null!);
  return (
    <>
      <OrbitControls makeDefault />
      <directionalLight position={[1, 2, 3]} intensity={1.5} />
      <ambientLight intensity={1.5} />
      <PivotControls anchor={[0, 0, 0]} depthTest={false}>
        <mesh position-x={-2} ref={sphereRef}>
          <sphereGeometry />
          <meshStandardMaterial color="orange" />
          <Html
            position={[1, 1, 0]}
            wrapperClass="label"
            center
            distanceFactor={8}
            occlude={[cubeRef, sphereRef]}
          >
            Test
          </Html>
        </mesh>
      </PivotControls>
      {/* <TransformControls object={cubeRef} /> */}
      <mesh scale={1.5} position-x={2} ref={cubeRef}>
        <boxGeometry />
        <meshStandardMaterial color="red" />
      </mesh>
      <mesh position={-1} rotation-x={-Math.PI * 0.5} scale={10}>
        <planeGeometry />
        {/* <meshStandardMaterial color="green" side={THREE.DoubleSide} /> */}
        <MeshReflectorMaterial mirror={0.5} resolution={512} mixBlur={1} color="yellow" />
      </mesh>
      <Float speed={5} floatIntensity={2}>
        <Text
          position={[0, 2, 0]}
          fontSize={1}
          color="salmon"
          font="/bangers-v20-latin-regular.woff"
          maxWidth={2}
          textAlign="center"
        >
          hello world!
          <meshNormalMaterial side={THREE.DoubleSide} />
        </Text>
      </Float>
    </>
  );
};
export default function Sketch01() {
  return (
    <Canvas>
      <Experience />
    </Canvas>
  );
}
