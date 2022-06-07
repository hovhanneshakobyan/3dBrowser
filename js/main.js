 import * as THREE from './three.module.js';
// import {GLTFLoader} from "./GLTFLoader.js";
// import {OrbitControls} from "./OrbitControls.js";

// var scene = new THREE.Scene();
// var camera = new THREE.PerspectiveCamera(
// 	75,
// 	window.innerHeight/window.innerHeight,
// 	0.01,
// 	1000
// );  

// var renderer = new THREE.WebGLRenderer();
// renderer.setSize(window.innerWidth , window.innerHeight);
// document.body.appendChild(renderer.domElement)
// //var obj;
// const controls = new OrbitControls(camera,renderer.domElement);
// controls.update();
// controls.enableDamping = true;
// controls.minDistance = 40;

// scene.background = new THREE.Color(128,128,0)

// var loader = new GLTFLoader();
// loader.load("joji.glb",function(gltf){
// 	//obj = gltf.scene;
	
// 	scene.add(gltf.scene);
// });
// var light = new THREE.HemisphereLight(0xffffff, 0x000000 , 2);
// scene.add(light);
// camera.position.set(0,40,100);

// function animate(){
// 	requestAnimationFrame(animate);
// 	//obj.rotation.y += 0.01
// 	controls.update();
// 	renderer.render(scene,camera);
// }

// animate();


























//Настройки сцены
const scene = new THREE.Scene();
const spaceTexture = new THREE.TextureLoader().load('images/space.jpg');
scene.background = spaceTexture;

// Настройка камеры
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );

// Настройка renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setClearColor( 0xffffff, 0);
document.body.appendChild( renderer.domElement );

// Глобальное освещение
const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(ambientLight);

// Настройки куба
const cubeTexture = new THREE.TextureLoader().load('images/cube.jpg');
const cube = new THREE.Mesh(new THREE.BoxGeometry(), new THREE.MeshBasicMaterial({ map: cubeTexture }));
cube.position.z = -2;
cube.rotation.y = 10;
cube.rotation.x = 10;
scene.add(cube);

// Настройки земли
const earthTexture = new THREE.TextureLoader().load('images/01-3.jpg');
const earth = new THREE.Mesh(
	new THREE.SphereGeometry(1, 64, 64),
	new THREE.MeshStandardMaterial({
		map: earthTexture,
	})
);
earth.position.z = -5;
scene.add(earth);

// Добавление звезд на фоне
function addStar() {
	const geometry = new THREE.SphereGeometry(0.1, 16, 16);
	const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
	const star = new THREE.Mesh(geometry, material);

	const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(90));

	star.position.set(x, y, z);
	scene.add(star);
}
Array(200).fill().forEach(addStar);

// Анимация | каждый кадр
function animate() {
	requestAnimationFrame(animate);

	earth.rotation.y += 0.003;
	earth.rotation.x += 0.002;
	earth.rotation.z += 0.002;

	renderer.render(scene, camera);
}
// Запуск анимации
animate();

// Событие для прокрутки
document.body.onscroll = handlerScroll;
function handlerScroll() {
	const t = document.body.getBoundingClientRect().top;

	if(cube.rotation.y > 0 && cube.rotation.x > 0) {
		cube.rotation.y -= 0.01;
		cube.rotation.x -= 0.01;
	}


	if ( camera.position.z < -1.4 ) {
		cube.rotation.y = 0;
		cube.rotation.x = 0;
		if( earth.position.x > -0.8 ) {
			earth.position.x -= 0.02;
		}
	} else {
		earth.position.x = 0;
	}

	camera.position.z = t * 0.001;
}
