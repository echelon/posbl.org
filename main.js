var camera, scene, renderer;
var ambientLight;

var lastX = 0;
var lastY = 0;
var mouseX = 0;
var mouseY = 0;

var rubik = null;

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

	camera.position.z = 100;
	camera.position.x = 300;
	camera.position.y = 200;

	scene.add(camera);

	rubik = new Rubik();
	
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

		rubik.startPatternAnimation();

		animate();	
	});
}

function animate()
{
	requestAnimationFrame(animate);
	render();
}

var y = 0;
var z = 0;
function render()
{
	TWEEN.update();

	var X = Math.sin(y) * 100;
	var Y = Math.cos(y) * 100;

	var rotMat = new THREE.Matrix4();
	var tVec = new THREE.Vector3(0, 0, -400);
	rotMat.translate(tVec);
	rotMat.rotateY(y);
	rotMat.rotateZ(y);

	y+= 0.005;

	rubik.render(rotMat);

	//camera.position.x += (mouseX - camera.position.x) * 0.3;
	//camera.position.y += (-mouseY - camera.position.y) * 0.3;

	//camera.rotation.y += 0.01;

	renderer.render(scene, camera);
}
