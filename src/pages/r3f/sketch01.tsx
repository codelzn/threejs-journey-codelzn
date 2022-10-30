import React, { useRef } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame, extend, useThree, Node } from '@react-three/fiber';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
declare global {
  namespace JSX {
    interface IntrinsicElements {
      orbitControls: Node<OrbitControls, typeof OrbitControls>;
    }
  }
}
extend({ OrbitControls });

const Experience: React.FC = () => {
  const { camera, gl } = useThree();
  const cubeRef = useRef<THREE.Mesh>(null!);
  const groupRef = useRef<THREE.Group>(null!);
  useFrame((state, delta) => {
    groupRef.current.rotation.x += 0.01;
    groupRef.current.rotation.y += 0.01;
  });
  return (
    <>
      <orbitControls args={[camera, gl.domElement]} />
      <directionalLight position={[1, 2, 3]} intensity={1.5} />
      <ambientLight intensity={1.5} />
      <group ref={groupRef}>
        <mesh position-x={-2}>
          <sphereGeometry />
          <meshStandardMaterial color="orange" />
        </mesh>
        <mesh scale={1.5} position-x={2} ref={cubeRef}>
          <boxGeometry />
          <meshStandardMaterial color="red" />
        </mesh>
      </group>
      <mesh position={-1} rotation-x={-Math.PI * 0.5} scale={10}>
        <planeGeometry />
        <meshStandardMaterial color="green" side={THREE.DoubleSide} />
      </mesh>
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
