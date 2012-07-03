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

function move() 
{
	var block = blocks[0];

	var oldAngle = {x: 0, y:0, z:0};
	var newAngle = {x: Math.PI/2, y: Math.PI/2, z: Math.PI /2};

	new TWEEN.Tween(oldAngle)
		.to(newAngle, 2000)
		.easing(TWEEN.Easing.Elastic.Out)
		.onUpdate(function() {
			var mat = new THREE.Matrix4();
			block.object.updateMatrix();

			mat.rotateX(oldAngle.x);
			mat.rotateY(oldAngle.y);
			mat.rotateZ(oldAngle.z);

			block.object.matrix.multiplySelf(mat);
		})
		.start();
}

function animate()
{
	requestAnimationFrame(animate);
	render();
}

var y = 0.0;
function render()
{
	TWEEN.update();

	//for(var i = 0; i < blocks[i].length; i++) {
	//	blocks[i].object.updateMatrix();
	//}
	//camera.position.x += (mouseX - camera.position.x) * 0.05;
	//camera.position.y += (-mouseY - camera.position.y) * 0.05;

	/*block.object.rotation.x += 0.001;
	block.object.rotation.y += 0.001;
	block.object.rotation.z += 0.001;*/
	
	renderer.render(scene, camera);
}
