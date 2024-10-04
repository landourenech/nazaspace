// import * as THREE from 'three';
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

// // Création de la scène
// const scene = new THREE.Scene();

// // Création de la caméra
// const camera = new THREE.PerspectiveCamera(
//   75,
//   window.innerWidth / window.innerHeight,
//   0.1,
//   1000
// );
// camera.position.set(4.61, 2.74, 8);

// // Configuration du rendu
// const renderer = new THREE.WebGLRenderer({
//   alpha: true,
//   antialias: true,
// });
// renderer.setSize(window.innerWidth, window.innerHeight);
// document.body.appendChild(renderer.domElement);
// renderer.shadowMap.enabled = true;

// // Ajout des contrôles de caméra
// const controls = new OrbitControls(camera, renderer.domElement);

// // Création de la classe Box
// class Box extends THREE.Mesh {
//   constructor({
//     width,
//     height,
//     depth,
//     color = '#00ff00',
//     position = { x: 0, y: 0, z: 0 },
//   }) {
//     super(
//       new THREE.BoxGeometry(width, height, depth),
//       new THREE.MeshStandardMaterial({ color })
//     );
//     this.position.set(position.x, position.y, position.z);
//     this.castShadow = true; // La boîte projette des ombres
//   }
// }

// // Création des objets de la scène
// const cube = new Box({ width: 1, height: 1, depth: 1 });
// scene.add(cube);

// const ground = new Box({
//   width: 10,
//   height: 0.5,
//   depth: 10,
//   color: '#0369a1',
//   position: { x: 0, y: -2, z: 0 },
// });
// ground.receiveShadow = true; // Le sol reçoit des ombres
// scene.add(ground);

// // Ajout de la lumière
// const light = new THREE.DirectionalLight(0xffffff, 1);
// light.position.set(5, 5, 5);
// light.castShadow = true;
// scene.add(light);
// scene.add(new THREE.AmbientLight(0xffffff, 0.5));

// // Fonction d'animation
// function animate() {
//   requestAnimationFrame(animate);
//   cube.rotation.x += 0.01; // Rotation de la boîte
//   cube.rotation.y += 0.01;
//   controls.update(); // Mise à jour des contrôles
//   renderer.render(scene, camera); // Rendu de la scène
// }

// // Gestion du redimensionnement de la fenêtre
// window.addEventListener('resize', () => {
//   camera.aspect = window.innerWidth / window.innerHeight;
//   camera.updateProjectionMatrix();
//   renderer.setSize(window.innerWidth, window.innerHeight);
// });

// // Lancement de l'animation
// animate();
