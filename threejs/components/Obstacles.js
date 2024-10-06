import * as THREE from 'three';
import { Box } from '../systems/Box.js';

export class Obstacle extends Box {
  constructor() {
    super({
      width: 1,
      height: 1,
      depth: 1,
      color: '#ff0000',
      velocity: { x: 0, y: 0, z: -0.03 },
      position: { x: (Math.random() - 0.5) * 10, y: 0, z: -15 },
      zAcceleration: true
    });
  }
}
