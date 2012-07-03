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

function init() {

	scene = new THREE.Scene();

	camera = new THREE.PerspectiveCamera( 75, 
			window.innerWidth / window.innerHeight, 1, 10000 );
	camera.position.z = 1000;
	scene.add( camera );

	// Create the nine Rubik blocks of a single dimension. 
	// TODO: Colors, data structure, etc.
	for(var i = 0; i < 27; i++) {
		var block = new Block();
		block.add(scene);
		block.object.updateMatrix();
		blocks.push(block);
	}

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

// XXX/NOTE : Will get out of alignment if called again before 
// animation finishes
var oldAngle = {x: 0, y:0, z:0};
function move() 
{
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

			var mat2 = new THREE.Matrix4(); // works ("A")

			for(var i = 0; i < blocks.length; i++) {
				blocks[i].object.updateMatrix();
			}

			mat2.rotateX(oldAngle.x);
			mat2.rotateY(oldAngle.y);
			mat2.rotateZ(oldAngle.z);

			//matStack.top().rotateX(oldAngle.x);

			matStack.push(mat2);

			for(var i = 0; i < blocks.length; i++) {
				blocks[i].object.updateMatrix();
			}

			//block.object.matrix.multiplySelf(mat); // works with (A)
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
	 * FIRST DIMENSION
	 */ 

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

	// First dimension, middle row, left 
	block = blocks[2];
	matStack.pushNew();
	var mat = matStack.top().translate({x: -210, y: 0, z: 0});
	block.object.matrix.multiplySelf(mat);
	matStack.pop();

	// First dimension, top row, center 
	block = blocks[3];
	matStack.pushNew();
	var mat = matStack.top().translate({x: 0, y: 210, z: 0});
	block.object.matrix.multiplySelf(mat);
	// NO POP

	// First dimension, top row, right
	block = blocks[4];
	matStack.pushNew();
	var mat = matStack.top().translate({x: 210, y: 0, z: 0});
	block.object.matrix.multiplySelf(mat);
	matStack.pop();

	// First dimension, top row, left 
	block = blocks[5];
	matStack.pushNew();
	var mat = matStack.top().translate({x: -210, y: 0, z: 0});
	block.object.matrix.multiplySelf(mat);
	matStack.pop();

	matStack.pop(); // Pop row. 

	// First dimension, bottom row, center 
	block = blocks[6];
	matStack.pushNew();
	var mat = matStack.top().translate({x: 0, y: -210, z: 0});
	block.object.matrix.multiplySelf(mat);
	// NO POP

	// First dimension, bottom row, right
	block = blocks[7];
	matStack.pushNew();
	var mat = matStack.top().translate({x: 210, y: 0, z: 0});
	block.object.matrix.multiplySelf(mat);
	matStack.pop();

	// First dimension, bottom row, left 
	block = blocks[8];
	matStack.pushNew();
	var mat = matStack.top().translate({x: -210, y: 0, z: 0});
	block.object.matrix.multiplySelf(mat);
	matStack.pop();

	matStack.pop(); // Pop row. 


	/**
	 * SECOND DIMENSION
	 */ 

	// Second dimension, middle row, center
	block = blocks[9];
	matStack.pushNew();
	var mat = matStack.top().translate({x: 0, y: 0, z: 210});
	block.object.matrix.multiplySelf(mat);
	// NO POP DIMENSION. 

	// Second dimension, middle row, right
	block = blocks[10];
	matStack.pushNew();
	var mat = matStack.top().translate({x: 210, y: 0, z: 0});
	block.object.matrix.multiplySelf(mat);
	matStack.pop();

	// Second dimension, middle row, left 
	block = blocks[11];
	matStack.pushNew();
	var mat = matStack.top().translate({x: -210, y: 0, z: 0});
	block.object.matrix.multiplySelf(mat);
	matStack.pop();

	// Second dimension, top row, center 
	block = blocks[12];
	matStack.pushNew();
	var mat = matStack.top().translate({x: 0, y: 210, z: 0});
	block.object.matrix.multiplySelf(mat);
	// NO POP

	// Second dimension, top row, right
	block = blocks[13];
	matStack.pushNew();
	var mat = matStack.top().translate({x: 210, y: 0, z: 0});
	block.object.matrix.multiplySelf(mat);
	matStack.pop();

	// Second dimension, top row, left 
	block = blocks[14];
	matStack.pushNew();
	var mat = matStack.top().translate({x: -210, y: 0, z: 0});
	block.object.matrix.multiplySelf(mat);
	matStack.pop();

	matStack.pop(); // Pop row. 

	// Second dimension, bottom row, center 
	block = blocks[15];
	matStack.pushNew();
	var mat = matStack.top().translate({x: 0, y: -210, z: 0});
	block.object.matrix.multiplySelf(mat);
	// NO POP

	// Second dimension, bottom row, right
	block = blocks[16];
	matStack.pushNew();
	var mat = matStack.top().translate({x: 210, y: 0, z: 0});
	block.object.matrix.multiplySelf(mat);
	matStack.pop();

	// Second dimension, bottom row, left 
	block = blocks[17];
	matStack.pushNew();
	var mat = matStack.top().translate({x: -210, y: 0, z: 0});
	block.object.matrix.multiplySelf(mat);
	matStack.pop();

	matStack.pop(); // Pop row. 
	matStack.pop(); // Pop dimension.

	/**
	 * THIRD DIMENSION
	 */ 

	// Third dimension, middle row, center
	block = blocks[18];
	matStack.pushNew();
	var mat = matStack.top().translate({x: 0, y: 0, z: -210});
	block.object.matrix.multiplySelf(mat);
	// NO POP DIMENSION. 

	// Third dimension, middle row, right
	block = blocks[19];
	matStack.pushNew();
	var mat = matStack.top().translate({x: 210, y: 0, z: 0});
	block.object.matrix.multiplySelf(mat);
	matStack.pop();

	// Third dimension, middle row, left 
	block = blocks[20];
	matStack.pushNew();
	var mat = matStack.top().translate({x: -210, y: 0, z: 0});
	block.object.matrix.multiplySelf(mat);
	matStack.pop();

	// Third dimension, top row, center 
	block = blocks[21];
	matStack.pushNew();
	var mat = matStack.top().translate({x: 0, y: 210, z: 0});
	block.object.matrix.multiplySelf(mat);
	// NO POP

	// Third dimension, top row, right
	block = blocks[22];
	matStack.pushNew();
	var mat = matStack.top().translate({x: 210, y: 0, z: 0});
	block.object.matrix.multiplySelf(mat);
	matStack.pop();

	// Third dimension, top row, left 
	block = blocks[23];
	matStack.pushNew();
	var mat = matStack.top().translate({x: -210, y: 0, z: 0});
	block.object.matrix.multiplySelf(mat);
	matStack.pop();

	matStack.pop(); // Pop row. 

	// Third dimension, bottom row, center 
	block = blocks[24];
	matStack.pushNew();
	var mat = matStack.top().translate({x: 0, y: -210, z: 0});
	block.object.matrix.multiplySelf(mat);
	// NO POP

	// Third dimension, bottom row, right
	block = blocks[25];
	matStack.pushNew();
	var mat = matStack.top().translate({x: 210, y: 0, z: 0});
	block.object.matrix.multiplySelf(mat);
	matStack.pop();

	// Third dimension, bottom row, left 
	block = blocks[26];
	matStack.pushNew();
	var mat = matStack.top().translate({x: -210, y: 0, z: 0});
	block.object.matrix.multiplySelf(mat);
	matStack.pop();

	matStack.pop(); // Pop row. 
	matStack.pop(); // Pop dimension.












	//camera.position.x += (mouseX - camera.position.x) * 0.01;
	//camera.position.y += (-mouseY - camera.position.y) * 0.05;

	renderer.render(scene, camera);
}
