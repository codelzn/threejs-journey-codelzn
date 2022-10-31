import React, { useRef } from 'react';
import * as THREE from 'three';
import { Canvas, RootState, useFrame } from '@react-three/fiber';
import {
  Html,
  OrbitControls,
  TransformControls,
  PivotControls,
  Text,
  Float,
  MeshReflectorMaterial,
  useHelper,
  BakeShadows,
  softShadows,
  AccumulativeShadows,
  RandomizedLight,
  ContactShadows,
  Sky,
  Environment,
  Lightformer,
} from '@react-three/drei';
import { useControls, button, Leva } from 'leva';
import { Perf } from 'r3f-perf';

// softShadows({
//   frustum: 3.75,
//   size: 0.005,
//   near: 9.5,
//   samples: 17,
//   rings: 11,
// });

const Experience: React.FC = () => {
  const cubeRef = useRef<THREE.Mesh>(null!);
  const sphereRef = useRef<THREE.Mesh>(null!);
  const directionalLight = useRef<THREE.DirectionalLight>(null!);
  // useHelper(directionalLight, THREE.DirectionalLightHelper, 1, 'hotpink');
  const { perVisible } = useControls({
    perVisible: true,
  });
  const { position, color, visible, myInterval, choice } = useControls('cube', {
    position: {
      value: { x: 2, y: 0 },
      step: 0.01,
      joystick: 'invertY',
    },
    color: 'rgb(0, 0, 255)',
    visible: true,
    myInterval: {
      min: 0,
      max: 10,
      value: [4, 5],
    },
    clickMe: button(() => {
      console.log('clicked');
    }),
    choice: {
      options: ['a', 'b', 'c'],
    },
  });
  const { scale } = useControls('sphere', {
    scale: {
      value: 1.5,
      min: 0,
      max: 2,
      step: 0.01,
    },
  });
  const { sunPosition } = useControls('sky', {
    sunPosition: {
      value: [1, 2, 3],
    },
  });
  return (
    <>
      {/* <BakeShadows /> */}
      <color args={['ivory']} attach="background" />
      {perVisible && <Perf position="top-left" />}
      <OrbitControls makeDefault />
      {/* <AccumulativeShadows
        position={[0, -0.99, 0]}
        scale={10}
        color="#316d39"
        opacity={0.8}
        frames={Infinity}
        temporal
        blend={100}
      >
        <RandomizedLight
          position={[1, 2, 3]}
          amount={8}
          radius={1}
          ambient={0.5}
          intensity={1}
          bias={0.001}
        />
      </AccumulativeShadows> */}
      {/* <ContactShadows
        position={[0, -0.99, 0]}
        scale={5}
        resolution={128}
        far={5}
      /> */}
      {/* <directionalLight
        castShadow
        position={[1, 2, 3]}
        intensity={1.5}
        ref={directionalLight}
        shadow-mapSize={[1024, 1024]}
        shadow-camera-near={1}
        shadow-camera-far={10}
        shadow-camera-left={-5}
        shadow-camera-right={5}
        shadow-camera-top={5}
        shadow-camera-bottom={-5}
      />
      <ambientLight intensity={1.5} />
      <Sky sunPosition={sunPosition} /> */}
      <Environment background>
        <color args={['white']} attach="background" />
        <Lightformer position-z={-5} scale={10} color="red" intensity={10} />
        {/* <mesh position-z={-5} scale={10}>
          <planeGeometry />
          <meshBasicMaterial color="white" />
        </mesh> */}
      </Environment>
      <PivotControls anchor={[0, 0, 0]} depthTest={false}>
        <mesh position-x={-2} ref={sphereRef} scale={scale} castShadow>
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
      <mesh
        scale={1.5}
        position={[position.x, position.y, 0]}
        ref={cubeRef}
        visible={visible}
        castShadow
      >
        <boxGeometry />
        <meshStandardMaterial color={color} />
      </mesh>
      <mesh
        position={[0, -1, 0]}
        rotation-x={-Math.PI * 0.5}
        scale={10}
        // receiveShadow
      >
        <planeGeometry />
        {/* <meshStandardMaterial color="green" side={THREE.DoubleSide} /> */}
        <MeshReflectorMaterial
          mirror={0.5}
          resolution={512}
          mixBlur={1}
          color="yellow"
        />
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
// const created = ({ gl, scene }: RootState) => {
//   scene.background = new THREE.Color('lightblue');
//   gl.setClearColor('orange');
// };
export default function Sketch01() {
  return (
    <>
      <Leva collapsed hidden={false} />
      <Canvas
        shadows
        // onCreated={created}
      >
        <Experience />
      </Canvas>
    </>
  );
}
