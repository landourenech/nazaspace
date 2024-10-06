import * as THREE from 'three';

export class Box extends THREE.Mesh {
  constructor({ width, height, depth, color = '#00ff00', velocity, position, zAcceleration = false }) {
    super(
      new THREE.BoxGeometry(width, height, depth),
      new THREE.MeshStandardMaterial({ color })
    );
    this.width = width;
    this.height = height;
    this.depth = depth;
    this.position.set(position.x, position.y, position.z);
    this.velocity = velocity;
    this.gravity = -0.002;
    this.zAcceleration = zAcceleration;
  }

  update(ground) {
    if (this.zAcceleration) this.velocity.z += 0.0003;
    this.position.x += this.velocity.x;
    this.position.z += this.velocity.z;
    this.applyGravity(ground);
  }

  applyGravity(ground) {
    this.velocity.y += this.gravity;
    if (this.position.y <= ground.position.y + this.height / 2) {
      this.velocity.y = -this.velocity.y * 0.5;
    } else {
      this.position.y += this.velocity.y;
    }
  }
}
