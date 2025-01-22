// khoi tao
var scene = new THREE.Scene()
var renderer = new THREE.WebGLRenderer()
var camera = new THREE.PerspectiveCamera(80, window.innerWidth / window.innerHeight, 0.1, 2000)

// Them object 
var geometry = new THREE.SphereGeometry(1, 10, 10)
var material = new THREE.MeshBasicMaterial({ color: 0xffff00, wireframe: true })

// phải tạo thêm Mesh để add object vào

var sphere = new THREE.Mesh(geometry, material)
scene.add(sphere)

// Camera position
camera.position.z = 3

const rotation = () => {
	sphere.rotation.x += 0.0001;
	sphere.rotation.y += 0.0001;
	sphere.rotation.z += 0.0001;
}


// Bước này sẽ tạo 1 canvas để chứa các object của chúng ta với kích thước như mình set là bằng luôn kích cỡ màn hình web.
renderer.setSize(window.innerWidth, window.innerHeight)

document.body.appendChild(renderer.domElement);
// tao xong canvas


// sử dụng renderer để render mọi thứ đã tạo
var render = () => {
	renderer.render(scene, camera)
}

const loop = () => {
	requestAnimationFrame(loop)
	rotation()
	render()
}

loop()