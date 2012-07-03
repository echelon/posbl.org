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
	blocks.push(block);

	block = new Block();
	block.add(scene);
	block.object.position.x = 212;
	blocks.push(block);

	block = new Block();
	block.add(scene);
	block.object.position.x = 424;
	blocks.push(block);

	$('input').focus();
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
	
		var light = new THREE.DirectionalLight(0xff0000);
		light.position.set(1, 1, 1).normalize();
		scene.add(light);

		document.body.appendChild(renderer.domElement);

		animate();	
	});
}

function move() {
	var actAngle = 0;
	var curAngle = { angle: 0 };
	var targetAngle = { angle: Math.PI / 2 };
	var tween = new TWEEN.Tween(curAngle)
		.to(targetAngle, 1000)
		.onUpdate(function() {
			var diff = Math.abs(curAngle.angle - actAngle);
			actAngle = curAngle.angle;

			for(var i = 0; i < blocks.length; i++) {
				var d = diff * (Math.PI/180);

				blocks[i].object.rotation.x += diff;
				blocks[i].object.rotation.y += diff;
				blocks[i].object.rotation.z += diff;
			}
			
		})
		.start();
}

function animate() {

	// note: three.js includes requestAnimationFrame shim
	requestAnimationFrame( animate );
	render();

}

function render() {
	//camera.position.x += (mouseX - camera.position.x) * 0.05;
	//camera.position.y += (-mouseY - camera.position.y) * 0.05;

	/*block.object.rotation.x += 0.001;
	block.object.rotation.y += 0.001;
	block.object.rotation.z += 0.001;*/

	renderer.render( scene, camera );

	TWEEN.update();
}
