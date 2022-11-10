import { FC, useEffect, useMemo, useRef, useState } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import { Perf } from 'r3f-perf';
import {
  Physics,
  RigidBody,
  Debug,
  CuboidCollider,
  BallCollider,
  RigidBodyApi,
  CylinderCollider,
  InstancedRigidBodies,
  Vector3Array,
} from '@react-three/rapier';

const Experience: FC = () => {
  const [hitSound] = useState<HTMLAudioElement>(() => new Audio('/hit.mp3'));
  const cube = useRef<RigidBodyApi>(null!);
  const twister = useRef<RigidBodyApi>(null!);
  const cubeJump = () => {
    const mass = cube.current.mass();
    // たて方向に力を加える
    cube.current.applyImpulse({ x: 0, y: 5 * mass, z: 0 });
    // よこ方向に力を加える
    cube.current.applyTorqueImpulse({
      x: Math.random() - 0.5,
      y: Math.random() - 0.5,
      z: Math.random() - 0.5,
    });
  };
  useFrame(({ clock }, delta) => {
    const eulerRotation = new THREE.Euler(0, clock.getElapsedTime() * 3, 0);
    const quaternionRotation = new THREE.Quaternion().setFromEuler(
      eulerRotation
    );
    twister.current.setNextKinematicRotation(quaternionRotation);
    const angle = clock.getElapsedTime() * 0.5;
    const x = Math.cos(angle) * 2;
    const z = Math.sin(angle) * 2;
    twister.current.setNextKinematicTranslation({ x, y: -0.8, z });
  });

  const collisionEnter = () => {
    // hitSound.currentTime = 0;
    // hitSound.volume = Math.random();
    // hitSound.play();
  };
  const hamburger = useGLTF('/models/hamburger-draco.glb');
  const cubesCount = 100;
  const cubes = useRef<THREE.InstancedMesh>(null!);
  const cubesTransforms = useMemo(() => {
    const positions = [];
    const rotations = [];
    const scales = [];
    for (let i = 0; i < cubesCount; i++) {
      positions.push([
        (Math.random() - 0.5) * 8,
        6 + i * 0.2,
        (Math.random() - 0.5) * 8,
      ]);
      rotations.push([
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI,
      ]);
      const scale = 0.2 + Math.random() * 0.8;
      scales.push([scale, scale, scale]);
    }
    return { positions, rotations, scales };
  }, []);
  // useEffect(() => {
  //   for (let i = 0; i < cubesCount; i++) {
  //     const matrix = new THREE.Matrix4();
  //     matrix.compose(
  //       new THREE.Vector3(i * 2, 0, 0),
  //       new THREE.Quaternion(),
  //       new THREE.Vector3(1, 1, 1)
  //     );
  //     cubes.current.setMatrixAt(i, matrix);
  //   }
  // }, []);
  return (
    <>
      <Perf position="top-left" />
      <OrbitControls makeDefault />
      <directionalLight position={[1, 2, 3]} intensity={1.5} />
      <ambientLight intensity={0.5} />
      <Physics gravity={[0, -9.08, 0]}>
        {/* <Debug /> */}
        <RigidBody colliders="ball">
          <mesh castShadow position={[-1.5, 2, 0]}>
            <sphereGeometry />
            <meshStandardMaterial color="orange" />
          </mesh>
        </RigidBody>
        <RigidBody
          ref={cube}
          position={[1.5, 2, 0]}
          // 重力の影響をコントロールする
          gravityScale={1}
          // 弾力
          restitution={1}
          // 摩擦
          friction={0.7}
          colliders={false}
          onCollisionEnter={collisionEnter}
          // onCollisionExit={() => console.log('exit')}
          onSleep={() => console.log('sleep')}
          onWake={() => console.log('wake')}
        >
          <mesh castShadow onClick={cubeJump}>
            <boxGeometry />
            <meshStandardMaterial color="mediumpurple" />
          </mesh>
          <CuboidCollider mass={2} args={[0.5, 0.5, 0.5]} />
        </RigidBody>
        <RigidBody type="fixed" friction={0.7}>
          <mesh receiveShadow position-y={-1.25}>
            <boxGeometry args={[10, 0.5, 10]} />
            <meshStandardMaterial color="greenyellow" />
          </mesh>
        </RigidBody>
        <RigidBody
          position={[0, -0.8, 0]}
          friction={0}
          type="kinematicPosition"
          ref={twister}
        >
          <mesh castShadow scale={[0.4, 0.4, 3]}>
            <boxGeometry />
            <meshStandardMaterial color="red" />
          </mesh>
        </RigidBody>
        <RigidBody colliders="hull" position={[0, 4, 0]}>
          <primitive object={hamburger.scene} scale={0.25} />
          {/* <CylinderCollider args={[0.5, 1.25]} /> */}
        </RigidBody>
        <RigidBody type="fixed">
          <CuboidCollider args={[5, 2, 0.5]} position={[0, 1, 5.5]} />
          <CuboidCollider args={[5, 2, 0.5]} position={[0, 1, -5.5]} />
          <CuboidCollider args={[0.5, 2, 5]} position={[5.5, 1, 0]} />
          <CuboidCollider args={[0.5, 2, 5]} position={[-5.5, 1, 0]} />
        </RigidBody>
        <InstancedRigidBodies
          positions={cubesTransforms.positions as Vector3Array[]}
          rotations={cubesTransforms.rotations as Vector3Array[]}
          scales={cubesTransforms.scales as Vector3Array[]}
        >
          {/* @ts-ignore */}
          <instancedMesh args={[null, null, cubesCount]} ref={cubes} castShadow>
            <boxGeometry />
            <meshStandardMaterial color="tomato" />
          </instancedMesh>
        </InstancedRigidBodies>
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
