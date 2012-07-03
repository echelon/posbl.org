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

function init() {

	scene = new THREE.Scene();

	camera = new THREE.PerspectiveCamera( 75, 
			window.innerWidth / window.innerHeight, 1, 10000 );
	camera.position.z = 1000;
	scene.add( camera );

	block = new Block();
	block.add(scene);
	//block.object.updateMatrix();
	blocks.push(block);

	/*block = new Block();
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

	/*$(window).mousemove(function(event) {
		lastX = mouseX;
		lastY = mouseY;
		mouseX = event.pageX;
		mouseY = event.pageY;
	});*/
	
	$(window).load(function() {

		renderer = new THREE.CanvasRenderer();
		renderer.setSize( window.innerWidth, 
			window.innerHeight );
	
		var light = new THREE.DirectionalLight(0xffffff);
		light.position.set(1, 0, 0).normalize();
		light.castShadow = true; // TODO
		scene.add(light);

		document.body.appendChild(renderer.domElement);

		animate();	
	});
}

var y = 0.0;

function move() {



	// TODO: Tween with matrices

	var actAngle = 0;
	var curAngle = { angle: 0 };
	var targetAngle = { angle: Math.PI / 2 };

	/*var tween = new TWEEN.Tween(curAngle)
		.to(targetAngle, 1000)
		.onUpdate(function() {
			var diff = Math.abs(curAngle.angle - actAngle);
			actAngle = curAngle.angle;


			var d = diff * (Math.PI/180) * 10000;

			var block = blocks[0];
			block.object.updateMatrix();

			//var updateMatrix = block.object.matrix.clone();
			var updateMatrix = new THREE.Matrix4();
			updateMatrix.rotateZ(diff);

			block.object.matrix.multiplySelf(updateMatrix);
		
		})
		.start();*/

	var block = blocks[0];
	angleNew = Math.PI / 2;
	new TWEEN.Tween(block.object.rotation)
		.to({
			x: angleNew,
			y: angleNew,
			z: angleNew
		}, 2000)
		.easing(TWEEN.Easing.Elastic.Out)
		/*.onUpdate(function() {
			//block.object.updateMatrix();
		})*/
		.start();
}

function animate() {

	// note: three.js includes requestAnimationFrame shim
	requestAnimationFrame( animate );
	render();

}

function render() {
	
	TWEEN.update();

	//var block = blocks[0];
	//block.object.updateMatrix();

	//for(var i = 0; i < blocks[i].length; i++) {
	//	blocks[i].object.updateMatrix();
	//}
	//camera.position.x += (mouseX - camera.position.x) * 0.05;
	//camera.position.y += (-mouseY - camera.position.y) * 0.05;

	/*block.object.rotation.x += 0.001;
	block.object.rotation.y += 0.001;
	block.object.rotation.z += 0.001;*/
	
	renderer.render( scene, camera );

}
