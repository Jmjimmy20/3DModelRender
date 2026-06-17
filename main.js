import * as THREE from 'three';
import {OrbitControls} from 'three/addons/controls/OrbitControls.js';
import {GLTFLoader} from 'three/addons/loaders/GLTFLoader.js';

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
cube.position.set(-1.5, 0, 0);
scene.add(cube);

//Load 3D model
const loader = new GLTFLoader();

loader.load(
    'models/pokeball.glb',

    //onLoad: Run when the 3D model has been downloaded and is ready
    (gltf) => {
        const model = gltf.scene;

        //Box3 calcualtes its actual size so it can be adjusted 
        const box = new THREE.Box3().setFromObject(model);
        const size = box.getSize(new THREE.Vector3());

        //Set high on 1.5
        const maxDim = Math.max(size.x, size.y, size.z);
        const scale = 2.5 / maxDim;
        model.scale.setScalar(scale);

        model.position.set(1.5, 0, 0);
        scene.add(model);
    },

    // onProgress: optional, useful for viewing the download progress
    undefined,

    // onError: if something goes wrong (misspelled name, corrupted file, etc.)
     (error) => {
        console.error('Error cargando el modelo:', error);
    }
);

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