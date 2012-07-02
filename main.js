var camera, scene, renderer,
geometry, material, mesh;

var texture, material2;
var ambientLight;
var mat, cube, mat2;
var text2;
var sphere, mat3, object, plane;

var imgMat;

var DEFAULT_IMAGE = './img/crate.jpg';

/**
 * Model class.
 */
var Model = function(mat, texture, geo) {

	this.mat = mat || new THREE.MeshBasicMaterial({
		map: texture || THREE.ImageUtils.loadTexture(DEFAULT_IMAGE),
		overdraw: true
	});

	this.object = new THREE.Mesh(
			geo || new THREE.CubeGeometry(100, 100, 100),
			this.mat);

	this.addTo = function(scene) {
		scene.add(this.object);
	}

	this.offsetRotation = function(x, y, z) {
		this.object.rotation.x += x;
		this.object.rotation.y += y;
		this.object.rotation.z += z;
	}
}

function init() {

	scene = new THREE.Scene();

	camera = new THREE.PerspectiveCamera( 75, 
			window.innerWidth / window.innerHeight, 1, 10000 );
	camera.position.z = 1000;
	scene.add( camera );


    var img = new THREE.MeshBasicMaterial({
        map:THREE.ImageUtils.loadTexture('./img/crate.jpg'),
		overdraw: true
    });

	imgMat = img;

    object = new THREE.Mesh(
			//new THREE.SphereGeometry(10, 5, 5), 
			new THREE.CubeGeometry(500, 500, 500),
			//new THREE.PlaneGeometry(500, 500),
			img);
	object.overdraw = true;
	scene.add(object);

    plane = new THREE.Mesh(
			new THREE.CubeGeometry(500, 500, 500), 
			//new THREE.PlaneGeometry(200, 200), 
			img);
    plane.overdraw = true;
	plane.position.x = 800;
    scene.add(plane);


	test = new Model();
	test.addTo(scene);




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

	plane.rotation.x += 0.01;
	plane.rotation.y += 0.01;
	plane.rotation.z += 0.01;

	object.rotation.x += 0.01;
	object.rotation.y += 0.01;
	object.rotation.z += 0.01;

	renderer.render( scene, camera );

}
