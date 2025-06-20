import * as THREE from "three";

export function setupCameraAnimation(camera, controls) {
  let angle = 0; // in radians
  let radius = 10; // distance from product
  let isUserInteracting = false;

  // Detect user interaction to pause rotation
  controls.addEventListener("start", () => {
    console.log("hi");
    isUserInteracting = true;
  });
  controls.addEventListener("end", () => {
    isUserInteracting = false;
  });

  // Update function to call every frame
  function update(deltaTime) {
    if (!isUserInteracting) {
      angle += deltaTime * 0.2; // speed in radians/sec

      camera.position.x = radius * Math.sin(angle);
      camera.position.z = radius * Math.cos(angle);
      camera.lookAt(0, 1.5, 0); // always look at center (table height)
    }
  }

  return { update };
}

export function zoomToObject(camera, controls, targetObject) {
  const duration = 1.2; // seconds
  const startPosition = camera.position.clone();
  const targetPosition = new THREE.Vector3()
    .copy(targetObject.position)
    .add(new THREE.Vector3(0, 2, 4)); // place camera in front of object
  const startTime = performance.now();

  const animate = () => {
    const elapsed = (performance.now() - startTime) / 1000;
    const t = Math.min(elapsed / duration, 1);

    camera.position.lerpVectors(startPosition, targetPosition, t);
    controls.target.lerp(targetObject.position, t); // keep camera locked on target
    controls.update();

    if (t < 1) {
      requestAnimationFrame(animate);
    }
  };

  animate();
}
