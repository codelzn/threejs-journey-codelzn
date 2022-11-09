import { FC, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { Perf } from 'r3f-perf';
import {
  Physics,
  RigidBody,
  Debug,
  CuboidCollider,
  BallCollider,
  RigidBodyApi,
} from '@react-three/rapier';

const Experience: FC = () => {
  const cube = useRef<RigidBodyApi>(null!);
  const cubeJump = () => {
    console.log(cube.current);
  };
  return (
    <>
      <Perf position="top-left" />
      <OrbitControls makeDefault />
      <directionalLight position={[1, 2, 3]} intensity={1.5} />
      <ambientLight intensity={0.5} />
      <Physics>
        <Debug />
        <RigidBody colliders="ball">
          <mesh castShadow position={[-1.5, 2, 0]}>
            <sphereGeometry />
            <meshStandardMaterial color="orange" />
          </mesh>
        </RigidBody>
        <RigidBody ref={cube} position={[1.5, 2, 0]}>
          <mesh castShadow onClick={cubeJump}>
            <boxGeometry />
            <meshStandardMaterial color="mediumpurple" />
          </mesh>
        </RigidBody>
        <RigidBody type="fixed">
          <mesh receiveShadow position-y={-1.25}>
            <boxGeometry args={[10, 0.5, 10]} />
            <meshStandardMaterial color="greenyellow" />
          </mesh>
        </RigidBody>
      </Physics>
    </>
  );
};

export default function R3fHome() {
  return (
    <Canvas shadows>
      <Experience />
    </Canvas>
  );
}
