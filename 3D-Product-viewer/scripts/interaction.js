// scripts/interaction.js
import * as THREE from "three";
import { zoomToObject } from "./cameraAnimation.js";


let raycaster = new THREE.Raycaster();
let mouse = new THREE.Vector2();
let selectedObject = null;
let originalColor = null;

export function setupInteraction(
  renderer,
  scene,
  camera,
  controls,
  canvasElement = renderer.domElement
) {
  // === CLICK EVENT ===
  canvasElement.addEventListener("click", (event) => {
    updateMousePosition(event, canvasElement);

    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(scene.children, true);

    if (intersects.length > 0) {
      const clicked = intersects[0].object;

      if (clicked.userData.name) {
        // Show name panel
        showNamePanel(clicked.userData.name);

        // Animate scale pulse
        animateClickFeedback(clicked);

        if (["Plate", "Orange"].includes(clicked.userData.name)) {
          console.log("zoom working");
          zoomToObject(camera, controls, clicked);
        }
      }
    }
  });

  // === HOVER HIGHLIGHT ===
  canvasElement.addEventListener("mousemove", (event) => {
    updateMousePosition(event, canvasElement);

    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(scene.children, true);

    if (selectedObject && selectedObject !== intersects[0]?.object) {
      selectedObject.material.emissive?.set(0x000000); // remove glow
      selectedObject = null;
    }

    if (intersects.length > 0) {
      const hovered = intersects[0].object;
      if (hovered.userData.name) {
        selectedObject = hovered;
        hovered.material.emissive?.set(0x333333); // slight glow
      }
    }
  });
}

function updateMousePosition(event, canvas) {
  const rect = canvas.getBoundingClientRect();
  mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
  mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
}

function animateClickFeedback(mesh) {
  const originalScale = mesh.scale.clone();
  const pulse = 1.2;

  mesh.scale.set(
    originalScale.x * pulse,
    originalScale.y * pulse,
    originalScale.z * pulse
  );

  setTimeout(() => {
    mesh.scale.copy(originalScale);
  }, 200);
}

function showNamePanel(name) {
  let panel = document.getElementById("info-panel");
  if (!panel) {
    panel = document.createElement("div");
    panel.id = "info-panel";
    panel.style.position = "absolute";
    panel.style.top = "10px";
    panel.style.left = "10px";
    panel.style.padding = "8px 12px";
    panel.style.background = "#000000aa";
    panel.style.color = "#fff";
    panel.style.borderRadius = "8px";
    panel.style.fontFamily = "sans-serif";
    panel.style.fontSize = "14px";
    document.body.appendChild(panel);
  }
  panel.textContent = name;
}
