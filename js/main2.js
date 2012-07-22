var camera, scene, renderer;
var ambientLight;

var lastX = 0;
var lastY = 0;
var mouseX = 0;
var mouseY = 0;

// Objects
var mol = null;

// TODO: DNA molecule should default to orientation straight upward.
// Simply rotate camera at start. This will also let us get rid of a matrix
function init() 
{
	scene = new THREE.Scene();

	var cDom = $(window);
	var aspect = cDom.innerWidth() / cDom.innerHeight();

	camera = new THREE.PerspectiveCamera(
		75,		// fov
		aspect, // aspect
		1,		// near clipping
		10000	// far clipping
	);

	var X_INIT = 700
	var Y_INIT = 0;
	var Z_INIT = 1000; 

	camera.position.x = X_INIT;
	camera.position.y = Y_INIT;
	camera.position.z = Z_INIT;

	scene.add(camera);

	mol = new Molecule();
	
	$(window).mousemove(function(event) {
		lastX = mouseX;
		lastY = mouseY;
		mouseX = event.pageX;
		mouseY = event.pageY;
	});

	// Already preloaded
	//$(window).load(function() {
		renderer = new THREE.CanvasRenderer();
		renderer.setSize(window.innerWidth, window.innerHeight);

		// FIXME: Does lighting not work on canvas? 
		var light = new THREE.DirectionalLight(0xffffff);
		light.position.set(1, 0, 0).normalize();
		light.castShadow = true; // TODO
		scene.add(light);

		//$("body").html(renderer.domElement); // XXX: No resize issues, but...
		$("#canvas").html(renderer.domElement);
		animate();	
	//});

	$(window).resize(function() {
		renderer.setSize($(window).width(), 
				$(window).height());

		//$('canvas').width($(window).innerWidth());
		//$('canvas').height($(window).innerHeight());
	});

	$(window).scroll(function(ev) {
		// FIXME: Something is broken about $(document).height
		var height = Math.max(
			$(document).height(),
			$('body').height(),
			$('#main').height(),
			$('#text').height());
		var TOP = 0;
		var BOTTOM = height - $(window).height();

		// Between 0 and 1. 
		var scrollPos = $(document).scrollTop() / BOTTOM;

		var x = X_INIT - Math.round(X_INIT*scrollPos);
		var y = Y_INIT //+ Math.round(100*scrollPos);
		var z = Z_INIT - Math.round(Z_INIT*scrollPos);
		var xRot = 0 - Math.PI/2 * scrollPos;
		var yRot = 0 - Math.PI/10 * scrollPos;
		var zRot = 0 - Math.PI/10 * scrollPos;

		camera.position.x = x;
		camera.position.y = y;
		camera.position.z = z;

		camera.rotation.x = xRot;
		camera.rotation.y = yRot;
		camera.rotation.z = zRot;
	});
}

function animate()
{
	requestAnimationFrame(animate);
	render();
}

var rotMat = new THREE.Matrix4();
var yAuto = -0.05;
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
