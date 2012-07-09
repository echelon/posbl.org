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

		$("#canvas").html(renderer.domElement);

		// Random rubik movement.
		setInterval(function() {
			switch(Math.round(rand(0, 10))) {
				case 0:
					rubik.rotate_x1();
					break;
				case 1:
					rubik.rotate_x2();
					break;
				case 2:
					rubik.rotate_x3();
					break;
				case 3:
					rubik.rotate_y1();
					break;
				case 4:
					rubik.rotate_y2();
					break;
				case 5:
					rubik.rotate_y3();
					break;
				case 6:
					rubik.rotate_z1();
					break;
				case 7:
					rubik.rotate_z2();
					break;
				case 8:
					rubik.rotate_z3();
					break;
			}
		}, 1000);

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

	var rotMat = new THREE.Matrix4();
	var tVec = new THREE.Vector3(0, X, 0);
	rotMat.translate(tVec);
	rotMat.rotateY(y);
	rotMat.rotateZ(y);

	y+= 0.005;

	/**
	 * Position Blocks
	 */ 
	for(var i = 0; i < blocks.length; i++) {
		block = blocks[i];

		block.pushMat(rotMat)

		block.object.updateMatrix();
		block.applyMats();

		block.popMat();
	}

	//camera.position.x += (mouseX - camera.position.x) * 0.3;
	//camera.position.y += (-mouseY - camera.position.y) * 0.3;

	//camera.rotation.y += 0.01;

	renderer.render(scene, camera);
}
