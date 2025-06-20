// scripts/main.js
import { initScene } from "./initScene.js";
import { addLighting } from "./addLighting.js";
import { createProduct } from "./createProduct.js";
import { setupInteraction } from "./interaction.js";
import { setupCameraAnimation } from "./cameraAnimation.js";

const { scene, camera, renderer, controls } = initScene();
addLighting(scene);
createProduct(scene);
setupInteraction(renderer, scene, camera); 
const cameraAnimator = setupCameraAnimation(camera, controls);

let lastTime = performance.now();

function animate() {
  requestAnimationFrame(animate);

  const now = performance.now();
  const delta = (now - lastTime) / 1000; // seconds
  lastTime = now;

  controls.update();
  cameraAnimator.update(delta); // ← add this line to update orbit

  renderer.render(scene, camera);
}

animate();

