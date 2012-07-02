var camera, scene, renderer,
geometry, material, mesh;

var texture, material2;
var ambientLight;
var mat, cube, mat2;
var text2;
var sphere, mat3, object, plane;

var objects = [];

var imgMat;

var IMAGES = [
	'./img/old/box_cube.png',
	'./img/old/box_lightning.png',
	'./img/old/box_phage.png',
	'./img/old/box_reactor.png',
	'./img/old/box_sunspot.png',
];

var DEFAULT_IMAGE = './img/juno.jpg';

var RADIUS = 900;
var STEP = 100;

var PARTICLES = [];

var mouseX = 0;
var mouseY = 0;

function spawnParticles(x, y, z)
{
	for(var i = 0; i < 100; i++) {
		var p = new Particle();
		p.add(scene);
		p.spawn(
				x || 0,
				y || 0,
				z || 0
		);
		PARTICLES.push(p);
	}
}

function init() {

	scene = new THREE.Scene();

	camera = new THREE.PerspectiveCamera( 75, 
			window.innerWidth / window.innerHeight, 1, 10000 );
	camera.position.z = 1500;
	scene.add( camera );


	spawnParticles();

	$(window).mousemove(function(event) {
		mouseX = event.pageX;
		mouseY = event.pageY;
	});

	$(window).load(function() {

			renderer = new THREE.CanvasRenderer();
			renderer.setSize( window.innerWidth, window.innerHeight );
		
			var light = new THREE.DirectionalLight(0xff0000);
			light.position.set(1, 1, 1).normalize();
			scene.add(light);

			document.body.appendChild(renderer.domElement);

			animate();	
		});
}

function animate() {

	// note: three.js includes requestAnimationFrame shim
	requestAnimationFrame( animate );
	render();

}

var u = 0;
function render() {

	/*mesh.rotation.x += 0.01;
	mesh.rotation.y += 0.02;*/

	/*var x, y, z;
	x = 0.01;
	y = 0.01;
	z = 0.01;
	for(var i = 0; i < objects.length; i++) {
		objects[i].offsetRotation(x, y, z);
	}*/

	camera.position.x += (mouseX - camera.position.x) * 0.05;
	camera.position.y += (-mouseY - camera.position.y) * 0.05;

	for(var i = 0; i < PARTICLES.length; i++) {
		PARTICLES[i].move();
	}

	if(Math.floor(rand(0, 20)) == 0) {
		var x = rand(-500, 500);
		var y = rand(-500, 500);
		var z = rand(-500, 500);
		spawnParticles(x, y, z);
	}

	renderer.render( scene, camera );
}
