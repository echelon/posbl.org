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
	// TODO: All 27.
	for(var i = 0; i < 9; i++) {
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

function move() 
{
	var block = blocks[0];

	var oldAngle = {x: 0, y:0, z:0};
	var newAngle = {x: Math.PI, y: Math.PI/2, z: Math.PI /2};

	//matStack.pushNew();
	var mat = matStack.top();

	new TWEEN.Tween(oldAngle)
		.to(newAngle, 1000)
		.easing(TWEEN.Easing.Elastic.Out)
		.onUpdate(function() {

			var mat2 = new THREE.Matrix4(); // works ("A")

			for(var i = 0; i < blocks.length; i++) {
				blocks[i].object.updateMatrix();
			}

			mat2.rotateX(oldAngle.x);
			//mat2.rotateY(oldAngle.y);
			//mat2.rotateZ(oldAngle.z);

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







	//camera.position.x += (mouseX - camera.position.x) * 0.01;
	//camera.position.y += (-mouseY - camera.position.y) * 0.05;

	renderer.render(scene, camera);
}
