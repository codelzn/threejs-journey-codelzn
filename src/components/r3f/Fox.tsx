import { useGLTF, useAnimations } from '@react-three/drei';
import { useEffect } from 'react';
import { Leva, useControls } from 'leva';

export default function Fox(props: JSX.IntrinsicElements['group']) {
  const fox = useGLTF('/models/Fox/glTF/Fox.gltf');
  const animations = useAnimations(fox.animations, fox.scene);
  const { animationName } = useControls({
    animationName: {
      options: ['Survey', 'Run', 'Walk'],
    },
  });
  useEffect(() => {
    const action = animations.actions[animationName];
    action?.reset().fadeIn(0.5).play();
    return () => {
      action?.fadeOut(0.5);
    }
  }, [animationName]);
  return <primitive object={fox.scene} {...props} />;
}
