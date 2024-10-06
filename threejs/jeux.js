// Importation des modules nécessaires depuis Three.js
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'; // Import des contrôles d'orbite pour manipuler la caméra

// Création de la scène, qui est le conteneur pour tous les objets 3D, la lumière, la caméra, etc.
const scene = new THREE.Scene();

// Configuration de la caméra, qui définit le champ de vision, l'aspect, et la distance de rendu
const camera = new THREE.PerspectiveCamera(
  75, // Champ de vision (FOV)
  window.innerWidth / window.innerHeight, // Ratio d'aspect (largeur/hauteur)
  0.1, // Distance minimum de rendu
  1000 // Distance maximum de rendu
);
camera.position.set(4.61, 2.74, 8); // Position initiale de la caméra dans la scène

// Création du moteur de rendu WebGL, qui affiche la scène sur le canvas
const renderer = new THREE.WebGLRenderer({
  alpha: true, // Permet la transparence dans le fond
  antialias: true // Active l'anticrénelage pour des bords plus lisses
});
renderer.shadowMap.enabled = true; // Active les ombres dans la scène
renderer.setSize(window.innerWidth, window.innerHeight); // Définit la taille du rendu sur la page
document.body.appendChild(renderer.domElement); // Ajoute le canvas WebGL au corps du document

// Ajout des contrôles d'orbite pour permettre à l'utilisateur de manipuler la caméra avec la souris
const controls = new OrbitControls(camera, renderer.domElement);

// Définition de la classe "Box" qui étend la classe Mesh de Three.js. Elle représente un cube avec des propriétés physiques.
class Box extends THREE.Mesh {
  constructor({
    width, // Largeur du cube
    height, // Hauteur du cube
    depth, // Profondeur du cube
    color = '#00ff00', // Couleur par défaut du cube
    velocity = {
      x: 0, y: 0, z: 0 // Vitesse initiale du cube dans les trois axes
    },
    position = {
      x: 0, y: 0, z: 0 // Position initiale du cube
    },
    zAcceleration = false // Accélération optionnelle dans l'axe Z
  }) {
    super(
      new THREE.BoxGeometry(width, height, depth), // Création de la géométrie du cube
      new THREE.MeshStandardMaterial({ color }) // Matériau appliqué au cube
    );

    this.width = width;  // Largeur du cube
    this.height = height; // Hauteur du cube
    this.depth = depth;  // Profondeur du cube this.width = width;
    this.height = height;
    this.depth = depth;

    this.position.set(position.x, position.y, position.z); // Placement du cube selon la position spécifiée

    // Définition des côtés du cube (utile pour les collisions)
    this.right = this.position.x + this.width / 2;
    this.left = this.position.x - this.width / 2;
    this.bottom = this.position.y - this.height / 2;
    this.top = this.position.y + this.height / 2;
    this.front = this.position.z + this.depth / 2;
    this.back = this.position.z - this.depth / 2;

    this.velocity = velocity; // Initialisation de la vitesse
    this.gravity = -0.002; // Force gravitationnelle qui agit sur le cube
    this.zAcceleration = zAcceleration; // Accélération dans l'axe Z si activée
  }

  // Met à jour les côtés du cube après le déplacement
  updateSides() {
    this.right = this.position.x + this.width / 2;
    this.left = this.position.x - this.width / 2;
    this.bottom = this.position.y - this.height / 2;
    this.top = this.position.y + this.height / 2;
    this.front = this.position.z + this.depth / 2;
    this.back = this.position.z - this.depth / 2;
  }

  // Met à jour la position du cube et applique la gravité et la vitesse
  update(ground) {
    this.updateSides(); // Met à jour les côtés du cube

    if (this.zAcceleration) this.velocity.z += 0.0003; // Accélération en Z si activée

    // Mise à jour de la position selon la vitesse actuelle
    this.position.x += this.velocity.x;
    this.position.z += this.velocity.z;

    this.applyGravity(ground); // Applique la gravité au cube
  }

  // Applique la gravité au cube et gère la collision avec le sol
  applyGravity(ground) {
    this.velocity.y += this.gravity; // Applique la gravité à la vitesse verticale

    // Vérifie la collision avec le sol
    if (boxCollision({
      box1: this,
      box2: ground
    })) {
      const friction = 0.5; // Applique un facteur de friction lors de la collision
      this.velocity.y *= friction; // Réduit la vitesse verticale
      this.velocity.y = -this.velocity.y; // Rebondit
    } else this.position.y += this.velocity.y; // Sinon, continue à tomber
  }
}

// Fonction de détection de collision entre deux boîtes
function boxCollision({ box1, box2 }) {
  const xCollision = box1.right >= box2.left && box1.left <= box2.right; // Collision en X
  const yCollision = box1.bottom + box1.velocity.y <= box2.top && box1.top >= box2.bottom; // Collision en Y
  const zCollision = box1.front >= box2.back && box1.back <= box2.front; // Collision en Z

  return xCollision && yCollision && zCollision; // Retourne vrai si toutes les collisions sont détectées
}

// Création du cube qui tombera dans la scène
const cube = new Box({
  width: 1, height: 1, depth: 1, // Dimensions du cube
  velocity: { x: 0, y: -0.01, z: 0 } // Vitesse initiale du cube
});
cube.castShadow = true; // Le cube projette une ombre
scene.add(cube); // Ajoute le cube à la scène

// Création du sol pour que le cube puisse interagir avec lui
const ground = new Box({
  width: 10, height: 0.5, depth: 50, // Dimensions du sol
  color: '#0369a1', // Couleur du sol
  position: { x: 0, y: -2, z: 0 } // Position du sol
});
ground.receiveShadow = true; // Le sol reçoit les ombres
scene.add(ground); // Ajoute le sol à la scène

// Lumière directionnelle pour éclairer la scène
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.y = 3;
light.position.z = 1;
light.castShadow = true; // La lumière projette des ombres
scene.add(light);

// Ajout d'une lumière ambiante pour éclairer la scène globalement
scene.add(new THREE.AmbientLight(0xffffff, 0.5));

// Position de départ de la caméra
camera.position.z = 5;

// Gestion des touches pour le contrôle du cube
const keys = {
  a: { pressed: false }, d: { pressed: false }, s: { pressed: false }, w: { pressed: false }
};

// Écoute les touches appuyées et met à jour l'état des touches
window.addEventListener('keydown', (event) => {
  switch (event.code) {
    case 'KeyA': keys.a.pressed = true; break;
    case 'KeyD': keys.d.pressed = true; break;
    case 'KeyS': keys.s.pressed = true; break;
    case 'KeyW': keys.w.pressed = true; break;
    case 'Space': cube.velocity.y = 0.08; break; // Fait sauter le cube
  }
});

// Écoute les touches relâchées et met à jour l'état des touches
window.addEventListener('keyup', (event) => {
  switch (event.code) {
    case 'KeyA': keys.a.pressed = false; break;
    case 'KeyD': keys.d.pressed = false; break;
    case 'KeyS': keys.s.pressed = false; break;
    case 'KeyW': keys.w.pressed = false; break;
  }
});

// Tableau pour stocker les ennemis (cubes rouges)
const enemies = [];
let frames = 0;
let spawnRate = 200; // Fréquence à laquelle les ennemis apparaissent

// Fonction d'animation principale, appelée à chaque frame
function animate() {
  const animationId = requestAnimationFrame(animate); // Boucle d'animation
  renderer.render(scene, camera); // Rendu de la scène et de la caméra

  // Mise à jour de la vitesse du cube selon les touches pressées
  cube.velocity.x = 0;
  cube.velocity.z = 0;
  if (keys.a.pressed) cube.velocity.x = -0.05;
  else if (keys.d.pressed) cube.velocity.x = 0.05;
  if (keys.s.pressed) cube.velocity.z = 0.05;
  else if (keys.w.pressed) cube.velocity.z = -0.05;

  cube.update(ground); // Met à jour le cube

  // Incrémentation des frames et création d'ennemis tous les "spawnRate" frames
  frames++;
  if (frames % spawnRate === 0) {
    const enemy = new Box({
      width: 1, height: 1, depth: 1,
      color: '#ff0000', // Rouge pour différencier les ennemis
      velocity: { x: 0, y: 0, z: -0.03 }, // Vitesse des ennemis
      position: { x: (Math.random() - 0.5) * 10, y: 0, z: -15 }, // Position initiale des ennemis
      zAcceleration: true
    });
    enemies.push(enemy); // Ajout de l'ennemi au tableau
    scene.add(enemy); // Ajout de l'ennemi à la scène
  }

  // Mise à jour des ennemis et vérification des collisions
  enemies.forEach((enemy, index) => {
    enemy.update(ground); // Mise à jour de l'ennemi

    if (boxCollision({ box1: cube, box2: enemy })) {
      cancelAnimationFrame(animationId); // Arrête l'animation en cas de collision
      alert('Game Over'); // Affiche un message de fin de jeu
    }

    if (enemy.position.z > camera.position.z) {
      scene.remove(enemy); // Retire l'ennemi de la scène s'il dépasse la caméra
      enemies.splice(index, 1); // Supprime l'ennemi du tableau
    }
  });
}




// Appel de la fonction d'animation pour démarrer le jeu
animate();
