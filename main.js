var camera, scene, renderer,
geometry, material, mesh;

var texture, material2;
var ambientLight;
var mat, cube, mat2;

var lastX = 0;
var lastY = 0;
var mouseX = 0;
var mouseY = 0;

var block;
var blocks = [];
var rubik = null;

var matStack = new MatrixStack();

var ROTATE_TYPE = 'y';

function init() 
{
	scene = new THREE.Scene();

	camera = new THREE.PerspectiveCamera( 75, 
			window.innerWidth / window.innerHeight, 1, 10000 );
	camera.position.z = 1000;
	camera.position.x = 0;
	camera.position.y = 0;
	scene.add( camera );

	rubik = new Rubik();
	blocks = rubik.blocks;

	blocks[0].isRotating = 1;
	blocks[1].isRotating = 1;
	blocks[2].isRotating = 1;
	blocks[9].isRotating = 1;
	blocks[10].isRotating = 1;
	blocks[11].isRotating = 1;
	blocks[18].isRotating = 1;
	blocks[19].isRotating = 1;
	blocks[20].isRotating = 1;


	// XXX: This is only because I use Vrome and it captures all
	// keyboard input by default. 
	$('input').focus();
	$('body').click(function(event) {
		$('input').focus();
	});
	$('input').keypress(function(event) {
		switch(event.charCode) {
			case 49: // Keyboard '1'
				rotate_x1();
				break;
			case 50: // '2'
				rotate_x2();
				break;
			case 51: // '3'
				rotate_x3();
				break;
			case 52: // '4'
				rotate_y1();
				break;
			case 53: // '5'
				rotate_y2();
				break;
			case 54: // '6'
				rotate_y3();
				break;
			case 55: // '7'
				rotate_z1();
				break;
			case 56: // '8'
				rotate_z2();
				break;
			case 57: // '9'
				rotate_z3();
				break;
		}
	});
	
	$(window).mousemove(function(event) {
		lastX = mouseX;
		lastY = mouseY;
		mouseX = event.pageX;
		mouseY = event.pageY;
	});
	
	$(window).load(function() {

		renderer = new THREE.CanvasRenderer();
		renderer.setSize( window.innerWidth, 
			window.innerHeight );

		// FIXME: Does lighting not work on canvas? 
		var light = new THREE.DirectionalLight(0xffffff);
		light.position.set(1, 0, 0).normalize();
		light.castShadow = true; // TODO
		scene.add(light);

		document.body.appendChild(renderer.domElement);

		var help = new THREE.AxisHelper();
		help.position.x = -500;
		help.position.y = -500;
		scene.add(help);

		var camHelp = new THREE.CameraHelper(camera);
		scene.add(camHelp);

		animate();	
	});
}

function animate()
{
	requestAnimationFrame(animate);
	render();
}

function render()
{
	TWEEN.update();

	/**
	 * Position Blocks
	 */ 
	for(var i = 0; i < blocks.length; i++) {
		block = blocks[i];
		block.object.updateMatrix();
		block.applyMats();
	}

	//camera.position.x += (mouseX - camera.position.x) * 0.9;
	//camera.position.y += (-mouseY - camera.position.y-200) * 0.9;

	renderer.render(scene, camera);
}
