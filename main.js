import * as THREE from 'three';
import {OrbitControls} from 'three/addons/controls/OrbitControls.js';

/**
 * 1. RENDERER
 * Create a <canvas> and set it on body
 * antialias: soft borders
 */
const renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
//Add canvas to HTML
document.body.appendChild(renderer.domElement);

/**
 * 2. SCENE
 * Scene contain objects, lights, ... everything
 */
const scene = new THREE.Scene();
scene.background = new THREE.Color('#1a1a2e');

/**
 * 3. CAMERA
 * Parameters (fov, aspect, near, far)
 *  fov = field of view (75 is standard)
 *  aspect = screen width to height ratio
 *  near = how close an object can be
 *  far = how far an object can be
 */
const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / innerHeight,
    0.1,
    1000
);
camera.position.set(0, 1, 4);

/**
 * 4. ORBIT CONTROLS
 * Allow rotate with mpouse and zoom with scroll
 */
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;

/**
 * 5. LIGHTS
 * AmbienLight = Soft light that illiminates everything equally
 * DirectionalLight = As sun, have directon
 */

const ambientLight = new THREE.AmbientLight('#ffffff', 0.5);
scene.add(ambientLight);

const dirLight = new THREE.DirectionalLight('#ffffff', 1);
scene.add(dirLight);

/**
 * 6. OBJECT
 * Geometry = the shape
 * Material = visual appearance (color, brightness, texture)
 * Mesh = geometry + material combined
 */
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshStandardMaterial({ color: '#6c63ff'});
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

/**
 * 7. ANIMATION LOOP
 * requestAnimationFrame call this function 60 times per second
 * Mandatory to any 3D Scene on real time
 */
function animate(){
    requestAnimationFrame(animate);

    controls.update();

    //Render scene from camera pov
    renderer.render(scene, camera);
}
animate();

/**
 * 8. RESPONSIVE
 */
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});