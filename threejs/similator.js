const container = document.body;
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 200);
const controls = new THREE.OrbitControls(camera);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
container.appendChild(renderer.domElement);
controls.rotateSpeed = 0.2;
controls.enableZoom = false;
controls.enablePan = false;
camera.position.set(-0.1, 0, 0);
controls.update();

// Sphère
const geometry = new THREE.SphereGeometry(50, 32, 32);
const texture = new THREE.TextureLoader().load('360.jpg');
texture.wrapS = THREE.RepeatWrapping;
texture.repeat.x = -1;

const material = new THREE.MeshBasicMaterial({
    map: texture,
    side: THREE.DoubleSide,
    transparent: true
});

const sphere = new THREE.Mesh(geometry, material);
scene.add(sphere); // Utilisation de sphere au lieu de this.sphere

function render() {
    requestAnimationFrame(render); // Correction ici
    controls.update(); // Met à jour les contrôles
    renderer.render(scene, camera);
}
render();

const rayCaster = new THREE.Raycaster();
const tooltip = document.createElement('div'); // Assure-toi de créer un élément pour le tooltip
tooltip.style.position = 'absolute';
tooltip.style.pointerEvents = 'none';
document.body.appendChild(tooltip);

function onClick(e) {
    let mouse = new THREE.Vector2(
        (e.clientX / window.innerWidth) * 2 - 1,
        -(e.clientY / window.innerHeight) * 2 + 1
    );
    rayCaster.setFromCamera(mouse, camera);
    let intersects = rayCaster.intersectObject(sphere);
    if (intersects.length > 0) {
        console.log('Sphère touchée au point : ', intersects[0].point);
    }

    let intersectsSprites = rayCaster.intersectObjects(scene.children);
    intersectsSprites.forEach(function (intersect) {
        if (intersect.object instanceof THREE.Sprite) {
            let p = intersect.object.position.clone().project(camera);
            tooltip.style.top = ((-1 * p.y + 1) * window.innerHeight / 2) + 'px';
            tooltip.style.left = ((p.x + 1) * window.innerWidth / 2) + 'px';
            tooltip.classList.add('is-active');
            tooltip.innerHTML = intersect.object.name; // Assure-toi d'avoir défini le nom quelque part
        }
    });
}

container.addEventListener('click', onClick);

let point = { position: new THREE.Vector3(14, 1.9, -47), name: 'Info Point' }; // Création d'un point avec un nom
let spriteMap = new THREE.TextureLoader().load('info.png');
let spriteMaterial = new THREE.SpriteMaterial({
    map: spriteMap
});
let sprite = new THREE.Sprite(spriteMaterial);
sprite.name = point.name;
sprite.position.copy(point.position.clone().normalize().multiplyScalar(30)); 
scene.add(sprite);

// Pour masquer la sphère
TweenLite.to(sphere.material, 1, {
    opacity: 0,
    onComplete: () => {
        scene.remove(sphere);
    }
});

// Pour afficher la sphère
sphere.material.opacity = 0;
TweenLite.to(sphere.material, 1, {
    opacity: 1
});
