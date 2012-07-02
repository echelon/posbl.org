
var rand = function(a, b) {
	return a + (b - a) *Math.random();
}

var randomImage = function() {
	return IMAGES[Math.floor(Math.random()*IMAGES.length)];
}

RATE = 10;

/**
 * Particle class
 */
var Particle = function()
{
	this.particle = new THREE.Particle(new THREE.ParticleBasicMaterial({
		map: THREE.ImageUtils.loadTexture('./img/particle.png'),
		overdraw: true,
		transparent: true,
		color: 0xff0000,
		size: 20,
		blending: THREE.AdditiveBlending,
		//blending: THREE.NormalBlending,
		//blending: THREE.SubtractiveBlending,
		//blending: THREE.AdditiveAlphaBlending,
		opacity: 0.9
	}));

	this.particle.scale.x = 4.0;
	this.particle.scale.y = 4.0;

	this.xRate = 0.0;
	this.yRate = 0.0;
	this.zRate = 0.0;

	this.add = function(scene) {
		scene.add(this.particle);
	}

	this.scale = function(sz) {
		this.particle.scale.x = sz;
		this.particle.scale.y = sz;
	}

	this.spawn = function(x, y, z) {
		this.scale(rand(1.0, 4.0));
		this.particle.position.x = x || 0;
		this.particle.position.y = y || 0;
		this.particle.position.z = z || 0;

		this.xRate = rand(-RATE, RATE);
		this.yRate = rand(-RATE, RATE);
		this.zRate = rand(-RATE, RATE);
	}

	this.move = function() {
		this.particle.position.x += this.xRate;
		this.particle.position.y += this.yRate;
		this.particle.position.z += this.zRate;
	}

}

/**
 * Particle class.
 * These are no longer particles. The name is just a dummy for now.
 */
var Cube = function(img)
{
	this.mat = new THREE.MeshBasicMaterial({
		map: THREE.ImageUtils.loadTexture(img),
		overdraw: true,
		transparent: true,
		//blending: THREE.AdditiveBlending,
		//blending: THREE.NormalBlending,
		//blending: THREE.SubtractiveBlending,
		blending: THREE.AdditiveAlphaBlending,
		opacity: 0.9
	});

	this.particle= new THREE.Mesh(
		new THREE.CubeGeometry(100, 100, 100),
		this.mat
	);

	this.particle.scale.x = 2.0;
	this.particle.scale.y = 2.0;
	this.particle.scale.z = 2.0;

	this.add = function(scene) {
		scene.add(this.particle);
	}

	this.trigPos = 0;

	this.circlePos = function(i) {
		this.trigPos = i;
	}

	this.updateCirclePos = function(i) {
		i += this.trigPos;
		this.particle.rotation.x = i;
		this.particle.rotation.y = i;
		this.particle.rotation.z = i;
	}
}


var CubeCluster = function(x, y, z)
{
	this.x = x || 0;
	this.y = y || 0;
	this.z = z || 0;

	this.particles = [];

	var j = 0;
	var k = - window.innerWidth* 3;

	for(var i = 0; i < 6; i++) {
		var p = new Particle(randomImage());
		p.add(scene);

		PARTICLES_GLOBAL.push(p);
		this.particles.push(p);

		p.circlePos(k);
		k += STEP;

		p.particle.position.x = this.x + Math.random()*500 - 250;
		p.particle.position.y = this.y + Math.random()*500 - 250;
		p.particle.position.z = this.z + Math.random()*500 - 250;
	}
}

