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

var particles = [];

var mouseX = 0;
var mouseY = 0;

function init() {

	scene = new THREE.Scene();

	camera = new THREE.PerspectiveCamera( 75, 
			window.innerWidth / window.innerHeight, 1, 10000 );
	camera.position.z = 1500;
	scene.add( camera );

	/*var off = -500;
	for(var i = 0; i < 10; i++) {
		var mod = new Model();

		mod.setPosition(off, off, off);
		off += 100;

		mod.addTo(scene);
		objects.push(mod);
	}

	objects[objects.length-1].addTo(scene);*/

	var randomImage = function() {
		return IMAGES[Math.floor(Math.random()*IMAGES.length)];
	}

	var clusterAX = -500;
	var clusterAY = -500;
	var clusterAZ = -500;

	var j = 0;
	var k = - window.innerWidth* 3;
	for(var i = 0; i < 6; i++) 
	{
		var p = new Particle(randomImage());
		p.add(scene);
		particles.push(p);

		p.circlePos(k);
		k += STEP;

		p.particle.position.x = clusterAX + Math.random()*500 - 250;
		p.particle.position.y = clusterAY + Math.random()*500 - 250;
		p.particle.position.z = clusterAZ + Math.random()*500 - 250;
	}


	var clusterAX = 500;
	var clusterAY = 200;
	var clusterAZ = 100;

	var j = 0;
	var k = - window.innerWidth* 3;
	for(var i = 0; i < 4; i++) 
	{
		var p = new Particle(randomImage());
		p.add(scene);
		particles.push(p);

		p.circlePos(k);
		k += STEP;

		p.particle.position.x = clusterAX + Math.random()*600 - 300;
		p.particle.position.y = clusterAY + Math.random()*600 - 300;
		p.particle.position.z = clusterAZ + Math.random()*600 - 300;
	}




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

	for(var i = 0; i < particles.length; i++) {
		particles[i].updateCirclePos(u);
		//u += 0.001;
	}
	u += 0.005;


	renderer.render( scene, camera );

}
