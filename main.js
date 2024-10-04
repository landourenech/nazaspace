// Importer Three.js
import * as THREE from 'three';

// 1. Créer une scène
const scene = new THREE.Scene();

// 2. Créer une caméra (PerspectiveCamera)
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

// 3. Créer un renderer et l'ajouter au document
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// 4. Créer la géométrie du cube
const geometry = new THREE.BoxGeometry(1, 1, 1);

// 5. Créer un matériau basique (avec une couleur)
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });

// 6. Créer un mesh (combinaison de géométrie et de matériau)
const cube = new THREE.Mesh(geometry, material);

// 7. Ajouter le cube à la scène
scene.add(cube);

// 8. Positionner la caméra
camera.position.z = 5;

// 9. Fonction pour animer le cube
function animate() {
    requestAnimationFrame(animate);

    // Rotation du cube sur les axes X et Y
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;

    // Rendu de la scène
    renderer.render(scene, camera);
}

// 10. Lancer l'animation
animate();

// 11. Mettre à jour la taille du renderer si la fenêtre est redimensionnée
window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});
