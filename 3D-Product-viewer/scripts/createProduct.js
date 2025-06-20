// scripts/createProduct.js
import * as THREE from 'three';

export function createProduct(scene) {
  
  const tableMaterial = new THREE.MeshStandardMaterial({
    color: 0x8b4513,
    roughness: 0.6, // controls softness of light reflection
    metalness: 0.2, // a tiny bit of shininess
  });

  // Table Top
  const tableTop = new THREE.Mesh(
    new THREE.BoxGeometry(5, 0.3, 3),
    tableMaterial
  );

  tableTop.position.y = 1.5;
  tableTop.userData.name = "Table Top";
  tableTop.castShadow = true;
  tableTop.receiveShadow = true;
  scene.add(tableTop);

  // Table Legs
  const legMaterial = new THREE.MeshStandardMaterial({ color: 0x5c4033 });
  const legGeometry = new THREE.CylinderGeometry(0.1, 0.1, 1.5, 16);
  const legPositions = [
    [-2.2, 0.75, -1.2],
    [2.2, 0.75, -1.2],
    [-2.2, 0.75, 1.2],
    [2.2, 0.75, 1.2],
  ];

  legPositions.forEach(([x, y, z]) => {
    const leg = new THREE.Mesh(legGeometry, legMaterial);
    leg.position.set(x, y, z);
    leg.castShadow = true;
    leg.receiveShadow = true;
    leg.userData.name = "Table Leg";
    scene.add(leg);
  });

  // Plate
  const plate = new THREE.Mesh(
    new THREE.CylinderGeometry(0.8, 0.8, 0.1, 32),
    new THREE.MeshStandardMaterial({
      color: 0xffffff,
      metalness: 0.2,
      roughness: 0.6,
    })
  );
  plate.position.set(0, 1.7, 0);
  plate.userData.name = "Plate";
  plate.castShadow = true;
  plate.receiveShadow = true;
  scene.add(plate);

  // Orange
  const orange = new THREE.Mesh(
    new THREE.SphereGeometry(0.3, 32, 32),
    new THREE.MeshStandardMaterial({ color: 0xffa500 })
  );
  orange.position.set(0, 1.9, 0);
  orange.userData.name = "Orange";
  orange.castShadow = true;
  orange.receiveShadow = true;
  scene.add(orange);

  // Floor
  const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(20, 20),
    new THREE.MeshStandardMaterial({ color: 0x808080, side: THREE.DoubleSide })
  );
  floor.rotation.x = -Math.PI / 2;
  floor.position.y = 0;
  floor.receiveShadow = true;
  scene.add(floor);

  return {plate ,orange };
}

