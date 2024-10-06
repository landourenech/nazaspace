import * as THREE from 'three';
import { Box } from '../systems/Box.js';

export class Track extends Box {
  constructor() {
    super({
      width: 10,
      height: 0.5,
      depth: 50,
      color: '#0369a1',
      position: { x: 0, y: -2, z: 0 }
    });
    this.receiveShadow = true;
  }
}
