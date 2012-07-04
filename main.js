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

var matStack = new MatrixStack();

function init() 
{
	scene = new THREE.Scene();

	camera = new THREE.PerspectiveCamera( 75, 
			window.innerWidth / window.innerHeight, 1, 10000 );
	camera.position.z = 1000;
	scene.add( camera );

	var coords = [
		// Layer one
		[0, 0, 0],
		[0, 0, 1],
		[0, 0, -1],
		[0, 1, 0],
		[0, 1, 1],
		[0, 1, -1],
		[0, -1, 0],
		[0, -1, 1],
		[0, -1, -1],
		// Layer two 
		[1, 0, 0],
		[1, 0, 1],
		[1, 0, -1],
		[1, 1, 0],
		[1, 1, 1],
		[1, 1, -1],
		[1, -1, 0],
		[1, -1, 1],
		[1, -1, -1],
		// Layer three 
		[-1, 0, 0],
		[-1, 0, 1],
		[-1, 0, -1],
		[-1, 1, 0],
		[-1, 1, 1],
		[-1, 1, -1],
		[-1, -1, 0],
		[-1, -1, 1],
		[-1, -1, -1],
	]

	// Create the nine Rubik blocks of a single dimension. 
	// TODO: Colors, data structure, etc.
	for(var i = 0; i < 27; i++) {

		// XXX/TEMP: Set color of layers so it's easier to debug
		var color = 0;
		if(i < 9) {
			color = COLORS.black;
		}
		else if(i < 18) {
			color = COLORS.white;
		}
		else {
			color = COLORS.red;
		}

		var block = new Block(color);
		block.add(scene);
		block.object.updateMatrix();
		blocks.push(block);

		block.position.x = coords[i][0];
		block.position.y = coords[i][1];
		block.position.z = coords[i][2];
	}

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
		move();
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
		move();
	});
}

// XXX/NOTE : Will get out of alignment if called again before 
// animation finishes
var oldAngle = {x: 0, y:0, z:0};
var lock = false;
function move() 
{
	if(lock) {
		return;
	}

	lock = true;

	var block = blocks[0];

	//var oldAngle = {x: 0, y:0, z:0};
	var newAngle = {
		x: oldAngle.x + Math.PI/2, 
		y: oldAngle.y + Math.PI/2, 
		z: oldAngle.z + Math.PI/2
	};

	//matStack.pushNew();
	var mat = matStack.top();

	new TWEEN.Tween(oldAngle)
		.to(newAngle, 600)
		.easing(TWEEN.Easing.Elastic.Out)
		.onUpdate(function() {

			var mat2 = new THREE.Matrix4();

			for(var i = 0; i < blocks.length; i++) {
				blocks[i].object.updateMatrix();
			}

			//mat2.rotateX(oldAngle.x);
			mat2.rotateY(oldAngle.y);
			//mat2.rotateZ(oldAngle.z);

			matStack.push(mat2);

			for(var i = 0; i < blocks.length; i++) {
				blocks[i].object.updateMatrix();
			}
		})
		.onComplete(function() {
			// Lock to prevent two tweens at once. 
			lock = false;

			// Mark all blocks as non-animated.
			for(var i = 0; i < blocks.length; i++) {
				blocks[i].isRotating = false;
			}

			setTimeout(function() {
				move();
			}, 1000);
		})
		.start();
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
		var coords = {
			x: 210 * block.position.x,
			y: 210 * block.position.y,
			z: 210 * block.position.z
		}

		// Rotating blocks require matrix stack operations. 
		if (block.isRotating) {
			matStack.pushNew();
			var mat = matStack.top().translate(coords);
			block.object.matrix.multiplySelf(mat);
			matStack.pop();
			//matStack.pushNew();
		}
		else {
			var mat = new THREE.Matrix4();
			mat.translate(coords);
			block.object.matrix.multiplySelf(mat);
		}

		//var mat = new THREE.Matrix4();
		//mat.translate(coords);
		//block.object.matrix.multiplySelf(mat);
		//matStack.pop();

		/*if(i < 9) {
			matStack.push(tweenMat);
		}*/
	}

/*
	// First dimension, middle row, center
	block = blocks[0];
	matStack.pushNew();
	var mat = matStack.top();
	block.object.matrix.multiplySelf(mat);

	// First dimension, middle row, right
	block = blocks[1];
	matStack.pushNew();
	var mat = matStack.top().translate({x: 210, y: 0, z: 0});
	block.object.matrix.multiplySelf(mat);
	matStack.pop();
*/

	camera.position.x += (mouseX - camera.position.x) * 0.01;
	camera.position.y += (-mouseY - camera.position.y) * 0.05;

	renderer.render(scene, camera);
}
