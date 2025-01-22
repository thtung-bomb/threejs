import * as THREE from 'https://cdn.skypack.dev/three@0.129.0/build/three.module.js'
import { DragControls } from 'https://cdn.skypack.dev/three@0.129.0/examples/jsm/controls/DragControls.js';
import { PointerLockControls } from 'https://cdn.skypack.dev/three@0.129.0/examples/jsm/controls/PointerLockControls.js';
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
var controls

var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// create the shape
var geometry = new THREE.SphereGeometry(1, 8, 5); // size of box
var geometry2 = new THREE.ConeGeometry(1, 1.5, 3); // add second box

//create material, color or image
var material = new THREE.MeshBasicMaterial({ color: 0xffffff, wireframe: true }); //wireframe false will not show wireframe
var sphere = new THREE.Mesh(geometry, material);
var cone = new THREE.Mesh(geometry2, material);

sphere.position.x = -2;
sphere.position.y = 1;
sphere.position.z = -2;

scene.add(sphere);
scene.add(cone);

camera.position.z = 3;

//game login
var update = function () {

};

// draw scene
var render = function () {
	renderer.render(scene, camera);
};

//run gameloop (update, render, repeat)
var GameLoop = function () {
	requestAnimationFrame(GameLoop)
	update();
	render();
};

GameLoop();
// Just for fun
scene.background = new THREE.Color('skyblue')

// drag control:
// const controls = new DragControls([sphere, cone], camera, renderer.domElement)
// controls.update()

// Đầu tiên thì khai báo controls 1 dòng
controls = new PointerLockControls(camera, renderer.domElement);

// Để có thể lock camera, cần 1 cú click
// Cuối cùng là lắng nghe sự kiện click để lock camera:
document.body.addEventListener('click', function () {
	controls.lock();
}, false);
