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

	var newBlock = function() {
		var block = new Block();
		block.add(scene);
		block.object.updateMatrix();
		blocks.push(block);
		return block;
	}

	// First block 
	block = newBlock();

	// Second block
	block = newBlock();
	//matStack.pushNew();
	//var mat = matStack.top().translate({x: 0, y: 210, z: 0});
	//block.object.matrix.multiplySelf(mat);

	// Third block
	block = newBlock();
	//matStack.pushNew();
	//var mat = matStack.top().translate({x: 0, y: 210, z: 0});
	//block.object.matrix.multiplySelf(mat);

	//matStack.pop();
	//matStack.pop();

	// Fourth block
	block = newBlock();
	//matStack.pushNew();
	//var mat = matStack.top().translate({x: 210, y: 0, z: 0});
	//block.object.matrix.multiplySelf(mat);

	//matStack.pop();


/*	block = new Block();
	block.add(scene);
	block.object.position.x = 212;
	block.object.updateMatrix();
	blocks.push(block);

	block = new Block();
	block.add(scene);
	block.object.position.x = 424;
	block.object.updateMatrix();
	blocks.push(block);*/

	$('input').focus();
	$('input').keypress(function(event) {
		move();
	});

	$('body').click(function(event) {
		$('input').focus();
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
	var newAngle = {x: Math.PI/2, y: Math.PI/2, z: Math.PI /2};

	new TWEEN.Tween(oldAngle)
		.to(newAngle, 2000)
		.easing(TWEEN.Easing.Elastic.Out)
		.onUpdate(function() {
			//var mat = new THREE.Matrix4(); // works ("A")
			block.object.updateMatrix();
			var mat = block.object.matrix; // XXX: Weird error. 

			mat.rotateX(oldAngle.x);
			mat.rotateY(oldAngle.y);
			mat.rotateZ(oldAngle.z);

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

	// First block 
	block = blocks[0];

	// Second block
	block = blocks[1];
	matStack.pushNew();
	var mat = matStack.top().translate({x: 0, y: 210, z: 0});
	block.object.matrix.multiplySelf(mat);

	// Third block
	block = blocks[2];
	matStack.pushNew();
	var mat = matStack.top().translate({x: 0, y: 210, z: 0});
	block.object.matrix.multiplySelf(mat);

	matStack.pop();
	matStack.pop();

	// Fourth block
	block = blocks[3];
	matStack.pushNew();
	var mat = matStack.top().translate({x: 210, y: 0, z: 0});
	block.object.matrix.multiplySelf(mat);

	matStack.pop();










	camera.position.x += (mouseX - camera.position.x) * 0.01;
	//camera.position.y += (-mouseY - camera.position.y) * 0.05;

	renderer.render(scene, camera);
}
