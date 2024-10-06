
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer();
        renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(renderer.domElement);

        // Créer le sol avec une texture de nuage
        const cloudTextureLoader = new THREE.TextureLoader();
        const cloudTexture = cloudTextureLoader.load('images/cloud_texture.jpg');
        const ground = new THREE.BoxGeometry(10, 0.5, 50);
        const groundMaterial = new THREE.MeshBasicMaterial({ map: cloudTexture });
        const groundMesh = new THREE.Mesh(ground, groundMaterial);
        groundMesh.position.set(0, -2, 0);
        scene.add(groundMesh);

        // Ajouter le paysage avec une texture
        const landscapeTextureLoader = new THREE.TextureLoader();
        const landscapeTexture = landscapeTextureLoader.load('images/landscape_texture.jpg');
        const landscape = new THREE.BoxGeometry(10, 1, 10);
        const landscapeMaterial = new THREE.MeshBasicMaterial({ map: landscapeTexture });
        const landscapeMesh = new THREE.Mesh(landscape, landscapeMaterial);
        landscapeMesh.position.set(0, 0, -15);
        scene.add(landscapeMesh);

        camera.position.z = 5;

        // Setup pour le post-traitement
        const composer = new THREE.EffectComposer(renderer);
        const renderPass = new THREE.RenderPass(scene, camera);
        composer.addPass(renderPass);

        // Passer le flou (Bokeh)
        const bokehPass = new THREE.BokehPass(scene, camera, {
            focus: 1.0,
            aperture: 0.025,
            maxDepth: 2.0,
            minDepth: 0.0,
            width: window.innerWidth,
            height: window.innerHeight
        });
        composer.addPass(bokehPass);

        // Fonction d'animation
        function animate() {
            requestAnimationFrame(animate);
            composer.render(); // Rendre avec post-traitement
        }

        animate();