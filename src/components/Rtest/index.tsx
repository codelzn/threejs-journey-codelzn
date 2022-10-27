import * as THREE from 'three';
import { Canvas, useFrame, extend } from '@react-three/fiber';
import { shaderMaterial } from '@react-three/drei';
import vertex from './shader/vertex.vs';
import fragment from './shader/fragment.fs';

const CustomMaterial = shaderMaterial({}, vertex, fragment);
CustomMaterial.key = THREE.MathUtils.generateUUID();

extend({ CustomMaterial });

export default function Rtest() {
  return (
    <Canvas>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <mesh>
        <boxGeometry args={[1, 1, 1]} />
        {/* @ts-ignore */}
        <customMaterial key={CustomMaterial.key} />
      </mesh>
    </Canvas>
  );
}
