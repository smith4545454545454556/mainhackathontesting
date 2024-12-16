import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import gsap from 'gsap';

let camera, scene, renderer, model;
const loader = new GLTFLoader();
let lastRenderTime = 0;
const fpsLimit = 1000 / 60; // Aim for 60 FPS

export function init(container) {
    // Initialize the camera
    camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.01, 10);
    camera.position.z = 5;
    camera.rotation.z = 1;

    // Initialize the scene
    scene = new THREE.Scene();

    // Add lighting
    const light = new THREE.AmbientLight(0xffffff, 2);
    scene.add(light);

    // Load the 3D model
    loader.load("./models/scene.gltf", (gltf) => {
        if (model) {
            scene.remove(model); // Remove old model if it exists
        }

        model = gltf.scene;
        model.scale.set(0.45, 0.45, 0.45);
        model.position.set(0, -0.5, 0); // Move the model down slightly

        // Apply GSAP animations to the model
        gsap.to(camera.position, {
            z: 1,
            duration: 1,
            ease: "back.out(1.7)",
        });
        gsap.to(camera.rotation, {
            z: 0,
            duration: 1,
        });

        gsap.to(model.rotation, {
            x: 0.3,
            duration: 1,
            delay: 1,
        });
        gsap.to(model.rotation, {
            y: Math.PI * 1.69,
            duration: 2,
            delay: 1,
        });
        gsap.to(model.scale, {
            delay: 1,
            duration: 1,
            x: 0.40,
            y: 0.40,
            z: 0.30,
        });
        gsap.to(model.position, {
            delay: 1,
            duration: 1,
            x: 0.70,
            y: -0.4,
        });

        // Add the model to the scene
        scene.add(model);
    });

    // Initialize the renderer
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight); // Set size based on container
    renderer.setClearColor(0x000000, 0); // Transparent background
    renderer.domElement.style.position = "absolute"; // Ensure the canvas is positioned absolutely
    renderer.domElement.style.top = "0"; // Align it at the top
    renderer.domElement.style.left = "0"; // Align it at the left
    renderer.domElement.style.zIndex = "-1"; // Push canvas behind other elements

    container.appendChild(renderer.domElement); // Append the canvas to the provided container

    // Handle window resizing
    window.addEventListener('resize', () => {
        camera.aspect = container.clientWidth / container.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(container.clientWidth - 17, container.clientHeight);
    });

    // Start the animation loop
    renderer.setAnimationLoop(animation);
}

// Optimized animation function to limit frame rate
function animation(timestamp) {
    // Only render if enough time has passed (aiming for 60 FPS)
    if (timestamp - lastRenderTime >= fpsLimit) {
        renderer.render(scene, camera);
        lastRenderTime = timestamp;
    }

    // Request the next animation frame
    requestAnimationFrame(animation);
}
