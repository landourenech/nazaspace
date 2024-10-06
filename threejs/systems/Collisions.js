export function boxCollision(box1, box2) {
    const xCollision = box1.position.x + box1.width / 2 >= box2.position.x - box2.width / 2 &&
                       box1.position.x - box1.width / 2 <= box2.position.x + box2.width / 2;
    const yCollision = box1.position.y - box1.height / 2 <= box2.position.y + box2.height / 2;
    const zCollision = box1.position.z + box1.depth / 2 >= box2.position.z - box2.depth / 2 &&
                       box1.position.z - box1.depth / 2 <= box2.position.z + box2.depth / 2;
  
    return xCollision && yCollision && zCollision;
  }
  