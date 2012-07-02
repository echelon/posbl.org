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
	'./img/old/box_gene.png',
	'./img/old/box_lightning.png',
	'./img/old/box_phage.png',
	'./img/old/box_reactor.png',
	'./img/old/box_sunspot.png',
	'./img/old/box_machinecode.png',
];

var DEFAULT_IMAGE = './img/juno.jpg';

var RADIUS = 300;
var STEP = 150;

var particles = [];



var Particle = function(img)
{
	/*this.particle = new THREE.Particle(new THREE.ParticleBasicMaterial({
			map: THREE.ImageUtils.loadTexture(img)
	}));*/

	this.mat = new THREE.MeshBasicMaterial({
		map: THREE.ImageUtils.loadTexture(img),
		overdraw: true
	});

	this.particle= new THREE.Mesh(
			new THREE.CubeGeometry(100, 100, 100),
			this.mat);

	this.particle.scale.x = 2.0;
	this.particle.scale.y = 2.0;
	this.particle.scale.z = 2.0;

	this.add = function(scene) {
		scene.add(this.particle);
	}

	this.circlePos = function(i) {
		this.trigPos = i;
		this.particle.position.y = Math.sin(i) * RADIUS;
		this.particle.position.z = Math.cos(i) * RADIUS;
	}

	this.updateCirclePos = function(i) {
		i += this.trigPos;
		//this.trigPos = i;
		this.particle.position.y = Math.sin(i) * RADIUS;
		this.particle.position.z = Math.cos(i) * RADIUS;

		this.particle.rotation.x = i;
		this.particle.rotation.y = i;
		this.particle.rotation.z = i;
	}
}

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

	var j = 0;
	var k = - window.innerWidth* 3;
	for(var i = 0; i < 50; i++) 
	{
		particle = new Particle(randomImage()),
		//particle.position.y = Math.sin(j) * RADIUS;
		//particle.position.z = Math.cos(j) * RADIUS;
		particle.particle.position.x = k;
		//
		particle.circlePos(k);

		j += 0.5;
		k += STEP;
		
		particle.add(scene);
		particles.push(particle);
	}




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

	//camera.position.z += Math.sin(u) * 10;
	//camera.position.y += Math.cos(u) * 10;

	for(var i = 0; i < particles.length; i++) {
		particles[i].updateCirclePos(u);
		//u += 0.001;
	}
	u += 0.005;


	renderer.render( scene, camera );

}
