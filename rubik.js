
// TODO: Deprecate and remove. 
var OLDcoords = [
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
];

var Rubik = function()
{
	/**
	 * All of the 27 blocks in the Rubik cube. 
	 */
	this.blocks = [];

	/**
	 * Pointers to all 27 blocks in the 3D Rubik cube.
	 * This maintains spatial organization. 
	 */
	this.rubik = [[[null, null, null],
					[null, null, null],
					[null, null, null]],
				 [[null, null, null],
					[null, 0, null], // '0' is center
					[null, null, null]],
				 [[null, null, null],
					[null, null, null],
					[null, null, null]]
	];

	// Create the blocks. 
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

		block.position.x = OLDcoords[i][0];
		block.position.y = OLDcoords[i][1];
		block.position.z = OLDcoords[i][2];
		
		this.blocks.push(block);
	}

	// INITIAL POSITIONING
	// TODO: Deprecate and remove
	for(var i = 0; i < this.blocks.length; i++) {

		block = this.blocks[i];
		var coords = {
			x: 210 * block.position.x,
			y: 210 * block.position.y,
			z: 210 * block.position.z
		}

		var mat = new THREE.Matrix4();
		mat.translate(coords);
		block.pushMat(mat);
		//block.object.matrix.multiplySelf(mat);
	}



}
