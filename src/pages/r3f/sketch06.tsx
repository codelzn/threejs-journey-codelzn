import { FC, useRef } from 'react';
import * as THREE from 'three';
import { Canvas, ThreeEvent, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF, meshBounds } from '@react-three/drei';

const Experience: FC = () => {
  const eventHandler = (e: ThreeEvent<MouseEvent>) => {
    (cube.current.material as THREE.MeshStandardMaterial).color.set(
      `hsl(${Math.random() * 360}, 100%, 75%)`
    );
    console.log(e.distance);
  };
  const cube = useRef<THREE.Mesh>(null!);
  const hamburger = useGLTF('/models/hamburger-draco.glb');
  useFrame((state, delta) => {
    cube.current.rotation.x += 0.01;
    cube.current.rotation.y += 0.01;
  });
  return (
    <>
      <OrbitControls makeDefault />
      <directionalLight position={[1, 2, 3]} intensity={1.5} />
      <ambientLight intensity={0.5} />
      <mesh
        position-x={-2}
        onClick={event => {
          event.stopPropagation();
        }}
      >
        <sphereGeometry />
        <meshStandardMaterial color="orange" />
      </mesh>
      <mesh
        ref={cube}
        // good at performance but low precision
        raycast={meshBounds}
        position-x={2}
        scale={1.5}
        onClick={eventHandler}
        onPointerEnter={() => (document.body.style.cursor = 'pointer')}
        onPointerLeave={() => (document.body.style.cursor = 'default')}
        // onContextMenu={eventHandler}
        // onDoubleClick={eventHandler}
        // onPointerDown={eventHandler}
        // onPointerEnter={eventHandler}
        // onWheel={eventHandler}
        // onPointerMissed={eventHandler}
      >
        <boxGeometry />
        <meshStandardMaterial color="mediumpurple" />
      </mesh>
      <mesh position-y={-1} rotation-x={-Math.PI * 0.5} scale={10}>
        <planeGeometry />
        <meshStandardMaterial color="greenyellow" />
      </mesh>
      <primitive
        object={hamburger.scene}
        scale={0.25}
        position-y={0.5}
        onClick={(event: ThreeEvent<MouseEvent>) => {
          event.stopPropagation();
          console.log(event.object.name);
        }}
      />
    </>
  );
};

export default function Sketch06() {
  return (
    <Canvas>
      <Experience />
    </Canvas>
  );
}
