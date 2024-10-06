import * as THREE from 'three';
import { Box } from '../systems/Box.js';

export class Player extends Box {
  constructor() {
    super({
      width: 1,
      height: 1,
      depth: 1,
      velocity: { x: 0, y: -0.01, z: 0 }
    });
    this.castShadow = true;
  }

  handleMovement(keys) {
    this.velocity.x = 0;
    this.velocity.z = 0;
    if (keys.a.pressed) this.velocity.x = -0.05;
    if (keys.d.pressed) this.velocity.x = 0.05;
    if (keys.s.pressed) this.velocity.z = 0.05;
    if (keys.w.pressed) this.velocity.z = -0.05;
  }

  jump() {
    this.velocity.y = 0.08;
  }
}
