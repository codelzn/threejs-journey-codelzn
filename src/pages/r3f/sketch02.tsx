import { FC, useMemo, useRef, useEffect } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Text, OrbitControls } from '@react-three/drei';

const Experience: FC = () => {
  const { camera, gl } = useThree();
  const geometryRef = useRef<THREE.BufferGeometry>(null!);
  const verticesCount = 10 * 3;
  const positions = useMemo(() => {
    const positions = new Float32Array(verticesCount * 3);

    for (let i = 0; i < verticesCount * 3; i++) {
      positions[i] = (Math.random() - 0.5) * 3;
    }
    return positions;
  }, []);
  useEffect(() => {
    console.log(geometryRef.current);
    geometryRef.current.computeVertexNormals();
  }, []);
  // useFrame((state, delta) => {
  //   state.camera.position.x = Math.sin(state.clock.getElapsedTime()) * 30;
  //   state.camera.position.z = Math.cos(state.clock.getElapsedTime()) * 30;
  //   state.camera.lookAt(0, 0, 0);
  // });
  return (
    <>
      <OrbitControls makeDefault />
      <mesh visible={false}>
        <bufferGeometry ref={geometryRef}>
          <bufferAttribute
            attach="attributes-position"
            count={verticesCount}
            itemSize={3}
            array={positions}
          />
        </bufferGeometry>
        <meshBasicMaterial color="red" side={THREE.DoubleSide} />
      </mesh>
      <Text
        fontSize={1}
        color="salmon"
        font="/bangers-v20-latin-regular.woff"
        maxWidth={2}
        textAlign="center"
      >
        hello world!
        <meshNormalMaterial side={THREE.DoubleSide} />
      </Text>
    </>
  );
};

export default function Sketch02() {
  return (
    <Canvas
      gl={{
        toneMapping: THREE.ACESFilmicToneMapping,
      }}
      // camera={{
      //   fov: 45,
      //   near: 0.1,
      //   far: 1000,
      //   position: [3, 2, 6],
      // }}
    >
      <Experience />
    </Canvas>
  );
}
