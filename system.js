
/**
 * Particle class.
 * These are no longer particles. The name is just a dummy for now.
 */
var Particle = function(img)
{
	/*this.particle = new THREE.Particle(new THREE.ParticleBasicMaterial({
			map: THREE.ImageUtils.loadTexture(img)
	}));*/

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
			this.mat);

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

