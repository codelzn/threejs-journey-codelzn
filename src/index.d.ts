import type { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

declare module '*.vert' {
  const content: string;
  export default content;
}

declare module '*.frag' {
  const content: string;
  export default content;
}

declare module '*.glsl' {
  const content: string;
  export default content;
}

declare module '*.vs' {
  const content: string;
  export default content;
}

declare module '*.fs' {
  const content: string;
  export default content;
}

declare module '*.glb' {
  const value: string;
  export default value;
}

declare module '*.mp4' {
  const src: string;
  export default src;
}
