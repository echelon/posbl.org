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

	var cDom = $('body');
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

		$("body").html(renderer.domElement);
		animate();	
	});

	$(window).resize(function() {
		renderer.setSize($(window).width(), 
				$(window).height());

		//$('canvas').width($(window).innerWidth());
		//$('canvas').height($(window).innerHeight());
	});
}

function animate()
{
	requestAnimationFrame(animate);
	render();
}

var rotMat = new THREE.Matrix4();
var yAuto = 0.07;
var yAutoState = 0.0;

function render()
{
	// Molecule Auto Rotation
	rotMat.identity()
		.rotateY(yAutoState);

	yAutoState += yAuto;
	yAutoState %= Math.PI*2;

	mol.setMat(1, rotMat);
	mol.render();

	renderer.render(scene, camera);
}
