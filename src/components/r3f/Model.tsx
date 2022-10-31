import { useGLTF, Clone } from '@react-three/drei';
export default function Model() {
  const model = useGLTF('/models/FlightHelmet/glTF/FlightHelmet.gltf');
  return (
    <>
      <Clone object={model.scene} scale={5} position-y={-1} position-x={-4} />
      <Clone object={model.scene} scale={5} position-y={-1} position-x={0} />
      <Clone object={model.scene} scale={5} position-y={-1} position-x={4} />
    </>
  );
}

useGLTF.preload('/models/FlightHelmet/glTF/FlightHelmet.gltf');
