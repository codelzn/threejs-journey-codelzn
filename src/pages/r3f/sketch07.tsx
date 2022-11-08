import { FC, useRef, forwardRef } from 'react';
import * as THREE from 'three';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { Perf } from 'r3f-perf';
import {
  EffectComposer,
  Vignette,
  Glitch,
  Noise,
  Bloom,
  DepthOfField,
  SSR,
} from '@react-three/postprocessing';
import { BlendFunction, GlitchMode } from 'postprocessing';
import { useControls } from 'leva';
import DrunkEffect from '@/shaders/drunkeffect/DrunkEffect';
import type { DrunkProps } from '@/shaders/drunkeffect/DrunkEffect';
// const Drunk: FC<DrunkProps> = props => {
//   const effect = new DrunkEffect(props);
//   return <primitive object={effect} />;
// };
const Drunk = forwardRef<DrunkEffect, DrunkProps>(function (props, ref) {
  const effect = new DrunkEffect(props);
  return <primitive object={effect} ref={ref} {...props} />;
});
Drunk.displayName = 'Drunk';

const Experience: FC = () => {
  const drunkRef = useRef<DrunkEffect>(null!);
  // const ssrProps = useControls({
  //   temporalResolve: true,
  //   STRETCH_MISSED_RAYS: true,
  //   USE_MRT: true,
  //   USE_NORMALMAP: true,
  //   USE_ROUGHNESSMAP: true,
  //   ENABLE_JITTERING: true,
  //   ENABLE_BLUR: true,
  //   temporalResolveMix: { value: 0.9, min: 0, max: 1 },
  //   temporalResolveCorrectionMix: { value: 0.25, min: 0, max: 1 },
  //   maxSamples: { value: 0, min: 0, max: 1 },
  //   resolutionScale: { value: 1, min: 0, max: 1 },
  //   blurMix: { value: 0.5, min: 0, max: 1 },
  //   blurKernelSize: { value: 8, min: 0, max: 8 },
  //   blurSharpness: { value: 0.5, min: 0, max: 1 },
  //   rayStep: { value: 0.3, min: 0, max: 1 },
  //   intensity: { value: 1, min: 0, max: 5 },
  //   maxRoughness: { value: 0.1, min: 0, max: 1 },
  //   jitter: { value: 0.7, min: 0, max: 5 },
  //   jitterSpread: { value: 0.45, min: 0, max: 1 },
  //   jitterRough: { value: 0.1, min: 0, max: 1 },
  //   roughnessFadeOut: { value: 1, min: 0, max: 1 },
  //   rayFadeOut: { value: 0, min: 0, max: 1 },
  //   MAX_STEPS: { value: 20, min: 0, max: 20 },
  //   NUM_BINARY_SEARCH_STEPS: { value: 5, min: 0, max: 10 },
  //   maxDepthDifference: { value: 3, min: 0, max: 10 },
  //   maxDepth: { value: 1, min: 0, max: 1 },
  //   thickness: { value: 10, min: 0, max: 10 },
  //   ior: { value: 1.45, min: 0, max: 2 },
  // });
  const drunkProps = useControls('Drunk Effect', {
    frequency: { value: 2, min: 1, max: 20 },
    amplitude: { value: 0.1, min: 0, max: 1 },
  });
  return (
    <>
      <color args={['#ffffff']} attach="background" />
      <EffectComposer>
        {/* <Vignette
          offset={0.3}
          darkness={0.9}
          blendFunction={BlendFunction.NORMAL}
        />
        <Glitch
          delay={new THREE.Vector2(0.5, 1)}
          duration={new THREE.Vector2(0.1, 0.3)}
          strength={new THREE.Vector2(0.2, 0.4)}
          mode={GlitchMode.CONSTANT_MILD}
        />
        <Noise blendFunction={BlendFunction.SOFT_LIGHT} premultiply />
        <Bloom mipmapBlur intensity={0.5} luminanceThreshold={0} />
        <DepthOfField
          focusDistance={0.025}
          focalLength={0.025}
          bokehScale={6}
        />
        <SSR {...ssrProps} /> */}
        <Drunk {...drunkProps} ref={drunkRef} />
      </EffectComposer>
      <Perf position="top-left" />
      <OrbitControls makeDefault />
      <directionalLight position={[1, 2, 3]} intensity={1.5} />
      <ambientLight intensity={0.5} />
      <mesh position-x={-2} castShadow>
        <sphereGeometry />
        <meshStandardMaterial color="orange" />
      </mesh>
      <mesh position-x={2} scale={1.5} castShadow>
        <boxGeometry />
        {/* <meshStandardMaterial
          color="white"
          emissive="orange"
          emissiveIntensity={2}
          toneMapped={false}
        /> */}
        <meshStandardMaterial color="mediumpurple" />
        {/* <meshBasicMaterial color={[1.5, 1, 4]} toneMapped={false} /> */}
      </mesh>
      <mesh
        receiveShadow
        position-y={-1}
        rotation-x={-Math.PI * 0.5}
        scale={10}
      >
        <planeGeometry />
        <meshStandardMaterial color="orange" roughness={0} metalness={0} />
      </mesh>
    </>
  );
};

export default function Sketch07() {
  return (
    <Canvas shadows>
      <Experience />
    </Canvas>
  );
}
