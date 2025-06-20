// scripts/addLighting.js
import * as THREE from 'three';

export function addLighting(scene) {
  // === Ambient Light ===
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.4); // soft fill light
  scene.add(ambientLight);

  // === Directional Light ===
  const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
  directionalLight.position.set(-5, 10 ,-7); // from top front-right
  directionalLight.castShadow = true;

  // Optional: tweak shadow quality
  directionalLight.shadow.mapSize.width = 1024;
  directionalLight.shadow.mapSize.height = 1024;
  directionalLight.shadow.camera.near = 0.5;
  directionalLight.shadow.camera.far = 50;

  const rimLight = new THREE.DirectionalLight(0xffffff, 0.3);
  rimLight.position.set(-5, 5, -5);
  scene.add(rimLight);



  scene.add(directionalLight);

}
