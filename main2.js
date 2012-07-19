var camera, scene, renderer;
var ambientLight;

var lastX = 0;
var lastY = 0;
var mouseX = 0;
var mouseY = 0;

var mol = null;
var axis = null;
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

		dnaParams = new DnaParams();
		installGui(dnaParams);

		animate();	
	});
}

var DnaParams = function() 
{
	this.xTransInit = 0;
	this.yTransInit = 0;
	this.zTransInit = -500;

	this.xRotAbs = 0;
	this.yRotAbs = 0;
	this.zRotAbs = 0.625;

	this.xTrans = 0;
	this.yTrans = 0;
	this.zTrans = 0;

	this.xRotAbs2 = 0;
	this.yRotAbs2 = 0;
	this.zRotAbs2 = 0;// 0.42;

	this.yAutoTop = 0.0;
	this.yAutoTopState = 0;
	this.yAutoBottom = 0.1;
	this.yAutoBottomState = 0;
}

/**
 * Install Dat.gui
 */
var installGui = function(dna) {
	var gui = new dat.GUI();
	var init = gui.addFolder('Init Translate');
	init.add(dna, 'xTransInit', -1000, 1000);
	init.add(dna, 'yTransInit', -1000, 1000);
	init.add(dna, 'zTransInit', -1500, 1500);
	var rot1 = gui.addFolder('Rotate 1');
	rot1.add(dna, 'xRotAbs', 0, Math.PI*2);
	rot1.add(dna, 'yRotAbs', 0, Math.PI*2);
	rot1.add(dna, 'zRotAbs', 0, Math.PI*2);
	var trans = gui.addFolder('Translate 2');
	trans.add(dna, 'xTrans', -1000, 1000);
	trans.add(dna, 'yTrans', -1000, 1000);
	trans.add(dna, 'zTrans', -1500, 1500);
	var rot2 = gui.addFolder('Rotate 2');
	rot2.add(dna, 'xRotAbs2', 0, Math.PI*2);
	rot2.add(dna, 'yRotAbs2', 0, Math.PI*2);
	rot2.add(dna, 'zRotAbs2', 0, Math.PI*2);
	var auto = gui.addFolder('Auto Rotate');
	auto.add(dna, 'yAutoTop', 0, 0.5).step(0.01);
	auto.add(dna, 'yAutoTopState', 0, Math.PI*2).listen();
	auto.add(dna, 'yAutoBottom', 0, 0.5).step(0.01);
	auto.add(dna, 'yAutoBottomState', 0, Math.PI*2).listen();

	mol.atoms[mol.atoms.length-1].object.visible = false;
	auto.add(mol.atoms[mol.atoms.length-1].object, 'visible'); 
}

function animate()
{
	requestAnimationFrame(animate);
	render();
}

function render()
{
	TWEEN.update();

	var rotMat = new THREE.Matrix4();
	var bMat = new THREE.Matrix4();
	var tVec = new THREE.Vector3(dnaParams.xTransInit, 
								 dnaParams.yTransInit, 
								 dnaParams.zTransInit);
	rotMat.translate(tVec);

	rotMat.rotateY(dnaParams.yAutoBottomState);
	dnaParams.yAutoBottomState += dnaParams.yAutoBottom;
	dnaParams.yAutoBottomState %= Math.PI*2;

	rotMat.rotateX(dnaParams.xRotAbs2);
	rotMat.rotateY(dnaParams.yRotAbs2);
	rotMat.rotateZ(dnaParams.zRotAbs2);

	// Auto rotate
	rotMat.rotateY(dnaParams.yAutoTopState);
	dnaParams.yAutoTopState += dnaParams.yAutoTop;
	dnaParams.yAutoTopState %= Math.PI*2;

	var tMat = new THREE.Matrix4();
	tVec = new THREE.Vector3(dnaParams.xTrans, 
							 dnaParams.yTrans, 
							 dnaParams.zTrans);
	tMat.identity()
		.translate(tVec);

	tMat.rotateX(dnaParams.xRotAbs);
	tMat.rotateY(dnaParams.yRotAbs);
	tMat.rotateZ(dnaParams.zRotAbs);
	
	mol.pushMat(rotMat);
	mol.pushMat(tMat);

	ident = new THREE.Matrix4();
	mol.render();

	mol.popMat();
	mol.popMat();

	renderer.render(scene, camera);
}
