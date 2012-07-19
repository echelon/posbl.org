var camera, scene, renderer;
var ambientLight;

var lastX = 0;
var lastY = 0;
var mouseX = 0;
var mouseY = 0;

var mol = null;
var axis = null;

function init() 
{
	scene = new THREE.Scene();

	var cDom = $('#canvas');
	var aspect = cDom.innerWidth() / cDom.innerHeight();

	camera = new THREE.PerspectiveCamera(
		75,		// fov
		aspect, // aspect
		1,		// near clipping
		10000	// far clipping
	);

	camera.position.z = 1500;
	camera.position.x = 0;
	camera.position.y = 0;

	scene.add(camera);

	mol = new Molecule();
	
	$(window).mousemove(function(event) {
		lastX = mouseX;
		lastY = mouseY;
		mouseX = event.pageX;
		mouseY = event.pageY;
	});
	
	$(window).load(function() {
		renderer = new THREE.CanvasRenderer();
		renderer.setSize(window.innerWidth, window.innerHeight);

		// FIXME: Does lighting not work on canvas? 
		var light = new THREE.DirectionalLight(0xffffff);
		light.position.set(1, 0, 0).normalize();
		light.castShadow = true; // TODO
		scene.add(light);

		$("#canvas").html(renderer.domElement);

		mol.startPatternAnimation();
		animate();	
	});
}

function animate()
{
	requestAnimationFrame(animate);
	render();
}

var rotMat = new THREE.Matrix4();
var yAuto = 0.1;
var yAutoState = 0.0;

function render()
{
	// Molecule Auto Rotation
	rotMat.identity()
		.rotateY(yAutoState);

	yAutoState += yAuto;
	yAutoState %= Math.PI*2;

	mol.setMat(1, rotMat);

	ident = new THREE.Matrix4();
	mol.render();

	renderer.render(scene, camera);
}
