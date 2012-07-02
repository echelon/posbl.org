var camera, scene, renderer,
geometry, material, mesh;

var texture, material2;
var ambientLight;
var mat, cube, mat2;
var text2;
var sphere, mat3, object, plane;

var objects = [];

var imgMat;

var DEFAULT_IMAGE = './img/juno.jpg';

/**
 * Model class.
 */
var Model = function(mat, texture, geo) {

	this.mat = mat || new THREE.MeshBasicMaterial({
		map: texture || THREE.ImageUtils.loadTexture(DEFAULT_IMAGE),
		overdraw: true
	});

	this.object = new THREE.Mesh(
			geo || new THREE.CubeGeometry(200, 200, 200),
			this.mat);

	this.addTo = function(scene) {
		scene.add(this.object);
	}

	this.offsetRotation = function(x, y, z) {
		this.object.rotation.x += x;
		this.object.rotation.y += y;
		this.object.rotation.z += z;
	}

	this.setPosition = function(x, y, z) {
		this.object.position.x = x || 0;
		this.object.position.y = y || 0;
		this.object.position.z = z || 0;
	}
}

function init() {

	scene = new THREE.Scene();

	camera = new THREE.PerspectiveCamera( 75, 
			window.innerWidth / window.innerHeight, 1, 10000 );
	camera.position.z = 1000;
	scene.add( camera );

	var off = -500;
	for(var i = 0; i < 10; i++) {
		var mod = new Model();

		mod.setPosition(off, off, off);
		off += 100;

		mod.addTo(scene);
		objects.push(mod);
	}

	objects[objects.length-1].addTo(scene);




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

function render() {

	/*mesh.rotation.x += 0.01;
	mesh.rotation.y += 0.02;*/

	var x, y, z;
	x = 0.01;
	y = 0.01;
	z = 0.01;
	for(var i = 0; i < objects.length; i++) {
		objects[i].offsetRotation(x, y, z);
	}


	renderer.render( scene, camera );

}
