import { FC, useState, useEffect, useRef } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame } from '@react-three/fiber';
import {
  OrbitControls,
  Text3D,
  Center,
  useMatcapTexture,
} from '@react-three/drei';
import { Perf } from 'r3f-perf';

const torusGeometry = new THREE.TorusGeometry(1, 0.6, 16, 32);
const material = new THREE.MeshMatcapMaterial();

const Experience: FC = () => {
  // const [torusGeometry, setTorusGeometry] = useState<THREE.TorusGeometry>(
  //   null!
  // );
  // const [material, setMaterial] = useState<THREE.MeshMatcapMaterial>(null!);
  // const dountsGroup = useRef<THREE.Group>(null!);
  const donuts = useRef<THREE.Mesh[]>([]);
  const [matcapTexture] = useMatcapTexture('6E5137_E8CA90_271912_B99C74', 256);

  useEffect(() => {
    matcapTexture.encoding = THREE.sRGBEncoding;
    matcapTexture.needsUpdate = true;
    material.matcap = matcapTexture;
    material.needsUpdate = true;
  }, []);
  useFrame((state, delta) => {
    for (const donut of donuts.current) {
      donut.rotation.y += delta * 0.1;
    }
  });
  return (
    <>
      <Perf position="top-left" />
      <OrbitControls makeDefault />
      {/* @ts-ignore */}
      {/* <torusGeometry args={[1, 0.6, 16, 32]} ref={setTorusGeometry} /> */}
      {/* @ts-ignore */}
      {/* <meshMatcapMaterial matcap={matcapTexture} ref={setMaterial} /> */}
      <Center>
        <Text3D
          material={material}
          font="/fonts/helvetiker_regular.typeface.json"
          size={0.75}
          height={0.2}
          curveSegments={12}
          bevelEnabled
          bevelThickness={0.02}
          bevelSize={0.02}
          bevelOffset={0}
          bevelSegments={5}
        >
          Hello React Three Fiber!
        </Text3D>
      </Center>
      {/* <group ref={dountsGroup}> */}
      <group>
        {[...Array(100)].map((v, i) => (
          <mesh
            ref={element => donuts.current.push(element!)}
            key={i}
            geometry={torusGeometry}
            material={material}
            position={[
              (Math.random() - 0.5) * 10,
              (Math.random() - 0.5) * 10,
              (Math.random() - 0.5) * 10,
            ]}
            scale={0.2 + Math.random() * 0.2}
            rotation={[Math.random() * Math.PI, Math.random() * Math.PI, 0]}
          />
        ))}
      </group>
    </>
  );
};

export default function Sketch04() {
  return (
    <Canvas>
      <Experience />
    </Canvas>
  );
}
