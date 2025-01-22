import * as THREE from 'https://cdn.skypack.dev/three@0.129.0/build/three.module.js';
import { GLTFLoader } from 'https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js';
import { gsap } from 'https://cdn.skypack.dev/gsap'

const camera = new THREE.PerspectiveCamera(
	10,
	window.innerWidth / window.innerHeight,
	0.1,
	1000
);

camera.position.z = 13;

const scene = new THREE.Scene();
let bee;
let mixer;

const loader = new GLTFLoader();
loader.load('/image/demon_bee_full_texture.glb',
	function (gltf) {
		bee = gltf.scene;

		bee.position.x = 1.5;
		bee.position.y = -1;
		bee.position.z = -5;

		bee.rotation.x = 0.5;
		bee.rotation.y = -0.5;
		mixer = new THREE.AnimationMixer(bee);
		if (gltf.animations && gltf.animations.length > 0) {
			mixer.clipAction(gltf.animations[0]).play();
		}
		scene.add(bee);
		console.log(gltf);
	},
	function (xhr) { },
	function (error) { },
)

const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('container3D').appendChild(renderer.domElement);

// light
const ambienLight = new THREE.AmbientLight(0xFFF, 1.3);
scene.add(ambienLight);

const topLight = new THREE.DirectionalLight(0xFFFFFF, 1);
topLight.position.set(500, 500, 500);
scene.add(topLight);

const reRender3D = () => {
	requestAnimationFrame(reRender3D);
	renderer.render(scene, camera);
	if (mixer) {
		mixer.update(0.01);
	}
};
reRender3D();


let arrPositionModel = [
	{
		id: 'banner',
		position: { x: -1.5, y: -1, z: 0 },
		rotation: { x: 0, y: 1.5, z: 0 },
	},
	{
		id: 'intro',
		position: { x: 1.5, y: 0, z: -2 },
		rotation: { x: 0.5, y: -0.5, z: 0 },
	},
	{
		id: 'description',
		position: { x: -1.5, y: 0, z: -5 },
		rotation: { x: 0, y: 0.5, z: 0 },
	},
	{
		id: 'contact',
		position: { x: 1.5, y: -0.9, z: 0 },
		rotation: { x: 0.3, y: -0.5, z: 0 },
	},
]

const modelMove = () => {
	const sections = document.querySelectorAll('.section');
	let currentSection;
	sections.forEach((section) => {
		const rect = section.getBoundingClientRect();
		if (rect.top <= window.innerHeight / 3) {
			currentSection = section.id;
		}
	})
	let position_active = arrPositionModel.findIndex(
		(item) => item.id === currentSection
	)

	if (position_active >= 0) {
		let new_Coordinates = arrPositionModel[position_active];
		gsap.to(bee.position, {
			x: new_Coordinates.position.x,
			y: new_Coordinates.position.y,
			z: new_Coordinates.position.z,
			duration: 2,
			ease: 'power1.out',
			overwrite: 'auto',
		})
		gsap.to(bee.rotation, {
			x: new_Coordinates.rotation.x,
			y: new_Coordinates.rotation.y,
			z: new_Coordinates.rotation.z,
			duration: 2,
			ease: 'power1.out',
			overwrite: 'auto',
		})
	}

}

window.addEventListener('scroll', () => {
	if (bee) {
		modelMove();
	}
})

window.addEventListener('resize', () => {
	renderer.setSize(window.innerWidth, window.innerHeight);
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
})