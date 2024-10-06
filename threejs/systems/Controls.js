export function handleControls(player) {
    document.addEventListener('keydown', (event) => {
      switch (event.key) {
        case 'ArrowLeft':
          if (player.position.x > -2) player.position.x -= 1;
          break;
        case 'ArrowRight':
          if (player.position.x < 2) player.position.x += 1;
          break;
        case 'Space':
          // Implémenter le saut
          break;
      }
    });
  }
  