// scripts/main.js
import { initScene } from "./initScene.js";
import { addLighting } from "./addLighting.js";
import { createProduct } from "./createProduct.js";
import { setupInteraction } from "./interaction.js";
import { setupCameraAnimation } from "./cameraAnimation.js";
import * as THREE from "three";

const { scene, camera, renderer, controls } = initScene();
addLighting(scene);
const { plate, orange } = createProduct(scene);
setupInteraction(renderer, scene, camera,controls); 
setTimeout(() => {
  camera.position.set(1, 2, 3); // move closer
  controls.target.set(0, 1, 0); // look at plate/orange center
  controls.update();
  console.log("✅ Camera moved!");
}, 2000);

const cameraAnimator = setupCameraAnimation(camera, controls);
let clock = new THREE.Clock(); 
let lastTime = performance.now();

function animate() {
  requestAnimationFrame(animate);

  const now = performance.now();
  const delta = (now - lastTime) / 1000; // seconds
  lastTime = now;

  const elapsed = clock.getElapsedTime(); 
  if (orange) {
    orange.position.y = 1.9 + Math.sin(elapsed * 2) * 0.05; // float
    orange.rotation.y += 0.01; // slow spin
  }
  controls.update();
  cameraAnimator.update(delta); // update orbit

  renderer.render(scene, camera);
}


animate();

