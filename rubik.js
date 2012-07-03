/**
 * Block class.
 */
var Block = function(color, size)
{
	var randColor = function() {
		var colors = [
			0x000000, 
			0x550000, 0x990000, 0xcc0000, 0xff0000, // reds
			0x005500, 0x009900, 0x00cc00, 0x00ff00, // greens
			0x000055, 0x000099, 0x0000cc, 0x0000ff, // blues
			0x555500, 0x999900, 0xcccc00, 0xffff00, // yellows
			0x550055, 0x990099, 0xcc00cc, 0xff00ff, // fushias 
			0x005555, 0x009999, 0x00cccc, 0x00ffff, // cyans
			0x555555, 0x999999, 0xcccccc, 0xffffff  // greys
		]
		return colors[Math.floor(rand(0, colors.length))];
	}

	var sz = size || 200;
	var c = color || randColor();

	this.mat = new THREE.MeshBasicMaterial({
		color: c,
		//overdraw: true,
		//wireframe: true
		//transparent: false,
		//blending: THREE.AdditiveBlending,
		//blending: THREE.NormalBlending,
		//blending: THREE.SubtractiveBlending,
		//blending: THREE.AdditiveAlphaBlending,
		//opacity: 1.0
	});

	this.object = new THREE.Mesh(
		new THREE.CubeGeometry(sz, sz, sz),
		this.mat
	);

	this.add = function(scene) {
		scene.add(this.object);
	}
}

