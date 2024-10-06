import * as THREE from 'three';

export function createBonus(scene) {
  const bonusGeometry = new THREE.SphereGeometry(0.5, 16, 16);
  const bonusMaterial = new THREE.MeshBasicMaterial({ color: 0xffff00 });
  const bonus = new THREE.Mesh(bonusGeometry, bonusMaterial);
  bonus.position.set(Math.random() * 5 - 2.5, 0.5, -10);
  scene.add(bonus);
}

export function updateBonuses(scene) {
  scene.children.forEach(child => {
    if (child instanceof THREE.Mesh && child.geometry instanceof THREE.SphereGeometry) {
      child.position.z += 0.1;
      if (child.position.z > 5) {
        scene.remove(child);
      }
    }
  });
}
