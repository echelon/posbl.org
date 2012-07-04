
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
		/*if(i < 9) {
			color = COLORS.black;
		}
		else if(i < 18) {
			color = COLORS.white;
		}
		else {
			color = COLORS.red;
		}*/

		var block = new Block(color);
		block.add(scene);
		block.object.updateMatrix();

		block.position.x = OLDcoords[i][0];
		block.position.y = OLDcoords[i][1];
		block.position.z = OLDcoords[i][2];
		
		this.blocks.push(block);
	}

	this.init = function() 
	{
		var i = 0;
		for(var x = 0; x < 3; x++) {
			for(var y = 0; y < 3; y++) {
				for(var z = 0; z < 3; z++) {
					// Place in data structure
					this.rubik[x][y][z] = this.blocks[i];
					i++;
				}
			}
		}
	}

	this.init();

	/**
	 * Position blocks in the 'rubik' 3D vector. 
	 */	
	this.position = function()
	{
		var i = 0;
		for(var x = 0; x < 3; x++) {
			for(var y = 0; y < 3; y++) {
				for(var z = 0; z < 3; z++) {
					// Give initial OpenGL position
					block = this.rubik[x][y][z];
					var coords = {
						x: 210 * (x-1),
						y: 210 * (y-1),
						z: 210 * (z-1)
					}
					
					// Reset root stack matrix to identity, then
					// translate. 
					block.matrixStack[0]
						.identity()
						.translate(coords);

					// XXX: Probably a good thing to do for added
					// certainty. This will remove any 'tweening' 
					// stacks.
					// XXX: OR actually, bad... once rotation of cube 
					// faces becomes important. 
					while(block.matrixStack.length >= 2) {
						block.matrixStack.pop();
					}
				}
			}
		}
	}

	this.position();
}
