import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import vertexShader from './shader/vertex.vs';
import fragmentShader from './shader/fragment.fs';
export default function Test() {
  const webgl = useRef<HTMLCanvasElement>(null!);
  class Sketch {
    private scene: THREE.Scene = new THREE.Scene();
    private camera: THREE.PerspectiveCamera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    private renderer: THREE.WebGLRenderer = new THREE.WebGLRenderer({
      canvas: webgl.current,
    });
    private geometry: THREE.BoxGeometry = new THREE.BoxGeometry();
    private material: THREE.ShaderMaterial = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
    });
    private cube: THREE.Mesh = new THREE.Mesh(this.geometry, this.material);
    constructor() {
      this.renderer.setSize(window.innerWidth, window.innerHeight);
      this.scene.add(this.cube);
      this.camera.position.z = 5;
      this.renderer.render(this.scene, this.camera);
    }
  }
  useEffect(() => {
    new Sketch();
  });
  return (
    <>
      <canvas ref={webgl}></canvas>
    </>
  );
}
