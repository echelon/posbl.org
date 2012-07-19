var camera, scene, renderer;
var ambientLight;

var lastX = 0;
var lastY = 0;
var mouseX = 0;
var mouseY = 0;

var rubik = null;
var dnaParams = null;

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

	camera.position.z = 1000;
	camera.position.x = 0;
	camera.position.y = 0;

	scene.add(camera);

	rubik = new Molecule();
	
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

		dnaParams = new DnaParams();
		installGui(dnaParams);

		animate();	
	});
}

var DnaParams = function() {

	this.xRotInc = 0;
	this.yRotInc = 0;
	this.zRotInc = 0;

	this.xRotAbs = 0;
	this.yRotAbs = 0;
	this.zRotAbs = 0;

}

/**
 * Install Dat.gui
 */
var installGui = function(dna) {
	var gui = new dat.GUI();
	gui.add(dna, 'xRotInc', 0, 0.5);
	gui.add(dna, 'yRotInc', 0, 0.5);
	gui.add(dna, 'zRotInc', 0, 0.5);
	gui.add(dna, 'xRotAbs', 0, Math.PI*2);
	gui.add(dna, 'yRotAbs', 0, Math.PI*2);
	gui.add(dna, 'zRotAbs', 0, Math.PI*2);
}

function animate()
{
	requestAnimationFrame(animate);
	render();
}

var xRotNow = 0;
var yRotNow = 0;
var zRotNow = 0;
var r = Math.PI / 2;
function render()
{
	TWEEN.update();

	var rotMat = new THREE.Matrix4();
	var tVec = new THREE.Vector3(300, 0, -700);
	rotMat.translate(tVec);

	if(dnaParams.xRotAbs) {
		rotMat.rotateX(dnaParams.xRotAbs);
	}
	else {
		rotMat.rotateX(xRotNow);
		xRotNow += dnaParams.xRotInc;
	}

	if(dnaParams.yRotAbs) {
		rotMat.rotateX(dnaParams.yRotAbs);
	}
	else {
		rotMat.rotateX(yRotNow);
		yRotNow += dnaParams.yRotInc;
	}

	if(dnaParams.zRotAbs) {
		rotMat.rotateX(dnaParams.zRotAbs);
	}
	else {
		rotMat.rotateX(zRotNow);
		zRotNow += dnaParams.zRotInc;
	}

	rubik.render(rotMat, r);

	//camera.position.x += (mouseX - camera.position.x) * 0.3;
	//camera.position.y += (-mouseY - camera.position.y) * 0.3;

	//camera.rotation.y += 0.01;

	renderer.render(scene, camera);
}
