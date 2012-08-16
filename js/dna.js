// TODO: RandInt function. 
var rand = function(a, b) {
	return a + (b - a) *Math.random();
}

// TODO: Support maps. 
var randItem = function(list) {
	return list[Math.floor(rand(0, list.length))];
}


// XXX TEMP
// Based on THREE.js sprite example
function generateSprite(r, g, b, radius) {
	var canvas = document.createElement('canvas');
	canvas.width = radius;
	canvas.height = radius;

	var context = canvas.getContext('2d');
	var gradient = context.createRadialGradient(
			canvas.width / 2,
			canvas.height / 2,
			0,
			canvas.width / 2,
			canvas.height / 2,
			canvas.width / 2
	);

	var r2 = Math.min(Math.round(r+20), 255);
	var g2 = Math.min(Math.round(g+20), 255);
	var b2 = Math.min(Math.round(b+20), 255);

	gradient.addColorStop(0, 'rgba('+r2+','+ g2+','+ b2+',1)');
	gradient.addColorStop(0.4, 'rgba('+r+','+g+','+b+',1)');
	gradient.addColorStop(0.8, 'rgba(0,0,0,0)');

	context.fillStyle = gradient;
	context.fillRect( 0, 0, canvas.width, canvas.height );

	return canvas;
}

var sprites = {
	H: generateSprite(255, 255, 255, 40),
	C: generateSprite(99, 0, 0, 50),
	N: generateSprite(187, 187, 187, 55),
	O: generateSprite(204, 0, 0, 60), 
	P: generateSprite(55, 55, 55, 65)
};

var sprite = generateSprite(0, 0, 64);

var Molecule = function()
{

	// XXX XXX XXX 
	// XXX XXX XXX 
	// XXX XXX XXX 
	// XXX XXX XXX 
	// XXX XXX XXX 
	//
	var size = 30;
	var spread = 25;



	/**
	 * All of the atoms in the molecule
	 */
	this.atoms = [];

	/**
	 * Color constants
	 */
	var COLORS = [
		0xcc0000,
		0xbbbbbb,
		0xffffff,
		0x555555,
	]

	/**
	 * Atom class.
	 * TODO: Better parameterization: use object w/ named params. 
	 */
	var Atom = function(species, size)
	{
		/**
		 * CTOR
		 */

		var rad = size || 200;
		//var c = color || 0xffffff;

		/**
		 * Object Members
		 */
		this.object = new THREE.Particle(
			new THREE.ParticleBasicMaterial({
				map: new THREE.Texture(sprites[species]),
				blending: THREE.SubtractiveBlending,
		}));

		/*this.object = new THREE.Mesh(
			//new THREE.CubeGeometry(rad, rad, rad),
			new THREE.PlaneGeometry(rad, rad),
			this.mat
		);*/

		// TODO: Relative atom position in molecule. 
		// TODO: How to represent this? 
		this.position = {
			x: 0,
			y: 0,
			z: 0
		};

		// XXX: We're doing our own matrix ops
		this.object.matrixAutoUpdate = false;

		// XXX: Don't touch the matrix stack!
		this.matrixStack = [
			this.object.matrix.clone(), // Atom positions
			this.object.matrix.clone(), // Molecule rotation
			this.object.matrix.clone()  // Leaning angle
				.rotateZ(0.625)
		];

		// Add the atom to the scene
		this.add = function(scene) {
			scene.add(this.object);
		}

		/**
		 * Matrix stack operations.
		 */

		this.pushMat = function(mat) {
			this.matrixStack.push(mat);
		}

		this.popMat = function() {
			if(this.matrixStack.length <= 1) {
				return;
			}
			return this.matrixStack.pop();
		}

		this.topMat = function() {
			return this.matrixStack[this.matrixStack.length -1];
		}

		// Set the top matrix (but not root)
		this.setTopMat = function(mat) {
			if(this.matrixStack.length <= 1) {
				return;
			}
			this.matrixStack[this.matrixStack.length - 1] = mat;
		}

		// TODO: Don't multiply by self. Try this first.
		this.applyMats = function() {
			this.object.matrix = new THREE.Matrix4();
			for(var i = this.matrixStack.length - 1; i >= 0; i--) {
				var mat = this.matrixStack[i];
				this.object.matrix.multiplySelf(mat);
			}
		}
	}


	/********************** REST OF CTOR ****************/ 



	var atomColors = {
		'C': 0x555555,
		'H': 0xeeeeee,
		'O': 0x990000,
		'N': 0x000099,
		'P': 0x990099,
	};

	// Offsets to make origin dead center (by simple mean)
	var xAvg = -16.637427;
	var yAvg = 4.203991;
	var zAvg = -4.718040741;

	for(var i = 0; i < ATOMS.length/4; i++) 
	{
		if(i % 4 == 0) { // dropping every 4 or 5
			//continue;
		}
		if(i % 5 == 0) { // dropping every 4 or 5
			//continue;
		}
		var species = ATOMS[i*4+3];
		if(i < 700) {
			species = randItem(['O', 'C', 'P']);
		}
		else {
			species = randItem(['N', 'H']);
		}
		if(i > 1500) {
			break;
		}
		var atom = new Atom(species, size);
		atom.add(scene); // TODO: Remove global
		atom.object.updateMatrix();

		// Position and translate entire molecule center
		atom.position.x = ATOMS[i*4] - xAvg;
		atom.position.z = ATOMS[i*4+1] - zAvg;
		atom.position.y = ATOMS[i*4+2] - yAvg;
		this.atoms.push(atom);
	}

	this.init = function() 
	{
	}

	this.init();

	/**
	 * Position blocks in the 'rubik' 3D vector. 
	 */	
	this.position = function(scale)
	{
		var sc = scale || 50;

		for(var i = 0; i < this.atoms.length; i++) {
			var atom = this.atoms[i];
			var coords = {
				x: sc * atom.position.x,
				y: sc * atom.position.y,
				z: sc * atom.position.z
			}
			// Reset root stack matrix to identity, then
			// translate. 
			atom.matrixStack[0]
				.identity()
				.rotateZ(0.42) // XXX: Set the molecule upright
				.translate(coords)
		}
	}

	this.position(spread);

	this.setMat = function(matNo, mat) {
		for(var i = 0; i < this.atoms.length; i++) {
			this.atoms[i].matrixStack[matNo] = mat;
		}
	}

	this.pushMat = function(mat) {
		for(var i = 0; i < this.atoms.length; i++) {
			this.atoms[i].pushMat(mat);
		}
	}

	this.popMat = function() {
		for(var i = 0; i < this.atoms.length; i++) {
			this.atoms[i].popMat();
		}
	}

	/**
	 * Position Blocks
	 * XXX: MUST CALL IN RENDER LOOP. 
	 * TODO: Rename rotMat. 
	 * TODO: Better (documented) way to send translations to render loop
	 */ 
	this.render = function() {
		var atom;
		for(var i = 0; i < this.atoms.length; i++) {
			atom = this.atoms[i];
			atom.object.updateMatrix();
			atom.applyMats();
		}
	}

	/* =================== ANIMATION CODE ===================== */

	// Mark all as non-rotating. 
	this._rotateReset = function() 
	{
		for(var i = 0; i < this.blocks.length; i++) {
			this.blocks[i].isRotating = false;
		}
	}

	// Install new matrix in rotating blocks' stacks
	this._installMatrices = function()
	{
		// Push a new matrix. 
		// Must be popped?  OR NO?
		for(var i = 0; i < this.blocks.length; i++) {
			var block = this.blocks[i];
			if(!block.isRotating) {
				continue;
			}
			block.pushMat(new THREE.Matrix4());
		}
	}

	this._installTween = function(newAngle, oldAngle, axis, callback)
	{
		var self = this;

		new TWEEN.Tween(oldAngle)
			.to(newAngle, 900)
			.easing(TWEEN.Easing.Elastic.Out)
			.onUpdate(function() {
				for(var i = 0; i < self.blocks.length; i++) {
					var block = self.blocks[i];
					if(!block.isRotating) {
						continue;
					}
					var mat = new THREE.Matrix4();

					switch(axis) {
						case 'x':
							mat.rotateX(oldAngle.x);
							break;
						case 'y':
							mat.rotateY(oldAngle.y);
							break;
						case 'z':
							mat.rotateZ(oldAngle.z);
							break;
					}

					block.setTopMat(mat);
				}
			})
			.onComplete(function() {
				// Clear rotation statuses
				for(var i = 0; i < self.blocks.length; i++) {
					var block = self.blocks[i];
					if(!block.isRotating) {
						continue;
					}
					// XXX: Method 1
					// XXX: Consider keeping this. 
					// XXX: Pop the mat we pushed. 
					//block.popMat(); // XXX: Temp comment out
				}

				// XXX: Method 2
				// Reposition everything in OpenGL with respect to the new
				// Rubik 3D vector positions. (Literally rebuilds everything)
				callback();
				rubik.position();

				self._rotateLock = false;
			})
			.start();
	}


	/* =================== ROTATION GROUPS ==================== */

	/**
	 * XXX/NOTE: This is highly ammenable to automation 
	 * if I don't hardcode the indices. I want to wait until I have
	 * face textures and possibly reverse-direction rotation done before
	 * I reduce this down to an embarassingly smaller set of lines
	 */

	// Prevent simultaneous rotations 
	this._rotateLock = false;

	this.rotate_x1 = function()
	{
		var self = this;

		if(this._rotateLock) { return; }
		this._rotateLock = true;
		
		var oldAngle = {x: 0, y:0, z:0};
		var newAngle = {
			x: oldAngle.x + Math.PI/2, 
			y: oldAngle.y + Math.PI/2, 
			z: oldAngle.z + Math.PI/2
		};

		this._rotateReset();

		// Mark x1 rotational group as rotating. 
		this.rubik[0][0][0].isRotating = true;
		this.rubik[0][0][1].isRotating = true;
		this.rubik[0][0][2].isRotating = true;
		this.rubik[0][1][0].isRotating = true;
		this.rubik[0][1][1].isRotating = true;
		this.rubik[0][1][2].isRotating = true;
		this.rubik[0][2][0].isRotating = true;
		this.rubik[0][2][1].isRotating = true;
		this.rubik[0][2][2].isRotating = true;

		// Swap cube assignments on callback.
		var swapCubes = function() {
			var t;
			t = self.rubik[0][2][0];
			self.rubik[0][2][0] = self.rubik[0][0][0];
			self.rubik[0][0][0] = self.rubik[0][0][2];
			self.rubik[0][0][2] = self.rubik[0][2][2];
			self.rubik[0][2][2] = t;

			t = self.rubik[0][2][1];
			self.rubik[0][2][1] = self.rubik[0][1][0];
			self.rubik[0][1][0] = self.rubik[0][0][1];
			self.rubik[0][0][1] = self.rubik[0][1][2];
			self.rubik[0][1][2] = t;
		}

		this._installMatrices();
		this._installTween(newAngle, oldAngle, 'x', swapCubes);
	}

	this.rotate_x2 = function()
	{
		var self = this;

		if(this._rotateLock) { return; }
		this._rotateLock = true;
		
		var oldAngle = {x: 0, y:0, z:0};
		var newAngle = {
			x: oldAngle.x + Math.PI/2, 
			y: oldAngle.y + Math.PI/2, 
			z: oldAngle.z + Math.PI/2
		};

		this._rotateReset();

		// Mark x2 rotational group as rotating. 
		this.rubik[1][0][0].isRotating = true;
		this.rubik[1][0][1].isRotating = true;
		this.rubik[1][0][2].isRotating = true;
		this.rubik[1][1][0].isRotating = true;
		this.rubik[1][1][1].isRotating = true;
		this.rubik[1][1][2].isRotating = true;
		this.rubik[1][2][0].isRotating = true;
		this.rubik[1][2][1].isRotating = true;
		this.rubik[1][2][2].isRotating = true;

		// Swap cube assignments on callback.
		var swapCubes = function() {
			var t;
			t = self.rubik[1][2][2];
			self.rubik[1][2][2] = self.rubik[1][2][0];
			self.rubik[1][2][0] = self.rubik[1][0][0];
			self.rubik[1][0][0] = self.rubik[1][0][2];
			self.rubik[1][0][2] = t;

			t = self.rubik[1][1][2];
			self.rubik[1][1][2] = self.rubik[1][2][1];
			self.rubik[1][2][1] = self.rubik[1][1][0];
			self.rubik[1][1][0] = self.rubik[1][0][1];
			self.rubik[1][0][1] = t;
		}

		this._installMatrices();
		this._installTween(newAngle, oldAngle, 'x', swapCubes);
	}

	this.rotate_x3 = function()
	{
		var self = this;

		if(this._rotateLock) { return; }
		this._rotateLock = true;
		
		var oldAngle = {x: 0, y:0, z:0};
		var newAngle = {
			x: oldAngle.x + Math.PI/2, 
			y: oldAngle.y + Math.PI/2, 
			z: oldAngle.z + Math.PI/2
		};

		this._rotateReset();

		// Mark x3 rotational group as rotating. 
		self.rubik[2][0][0].isRotating = true;
		self.rubik[2][0][1].isRotating = true;
		self.rubik[2][0][2].isRotating = true;
		self.rubik[2][1][0].isRotating = true;
		self.rubik[2][1][1].isRotating = true;
		self.rubik[2][1][2].isRotating = true;
		self.rubik[2][2][0].isRotating = true;
		self.rubik[2][2][1].isRotating = true;
		self.rubik[2][2][2].isRotating = true;

		// Swap cube assignments on callback.
		var swapCubes = function() {
			var t;
			t = self.rubik[2][2][0];
			self.rubik[2][2][0] = self.rubik[2][0][0];
			self.rubik[2][0][0] = self.rubik[2][0][2];
			self.rubik[2][0][2] = self.rubik[2][2][2];
			self.rubik[2][2][2] = t;

			t = self.rubik[2][1][2];
			self.rubik[2][1][2] = self.rubik[2][2][1];
			self.rubik[2][2][1] = self.rubik[2][1][0];
			self.rubik[2][1][0] = self.rubik[2][0][1];
			self.rubik[2][0][1] = t;
		}

		this._installMatrices();
		this._installTween(newAngle, oldAngle, 'x', swapCubes);
	}

	this.rotate_y1 = function()
	{
		var self = this;

		if(this._rotateLock) { return; }
		this._rotateLock = true;
		
		var oldAngle = {x: 0, y:0, z:0};
		var newAngle = {
			x: oldAngle.x + Math.PI/2, 
			y: oldAngle.y + Math.PI/2, 
			z: oldAngle.z + Math.PI/2
		};

		this._rotateReset();

		// Mark y1 rotational group as rotating. 
		this.rubik[0][2][0].isRotating = true;
		this.rubik[0][2][1].isRotating = true;
		this.rubik[0][2][2].isRotating = true;
		this.rubik[1][2][0].isRotating = true;
		this.rubik[1][2][1].isRotating = true;
		this.rubik[1][2][2].isRotating = true;
		this.rubik[2][2][0].isRotating = true;
		this.rubik[2][2][1].isRotating = true;
		this.rubik[2][2][2].isRotating = true;

		// Swap cube assignments on callback.
		var swapCubes = function() {
			var t;
			t = self.rubik[0][2][0];
			self.rubik[0][2][0] = self.rubik[2][2][0];
			self.rubik[2][2][0] = self.rubik[2][2][2];
			self.rubik[2][2][2] = self.rubik[0][2][2];
			self.rubik[0][2][2] = t;

			t = self.rubik[0][2][1];
			self.rubik[0][2][1] = self.rubik[1][2][0];
			self.rubik[1][2][0] = self.rubik[2][2][1];
			self.rubik[2][2][1] = self.rubik[1][2][2];
			self.rubik[1][2][2] = t;
		}

		this._installMatrices();
		this._installTween(newAngle, oldAngle, 'y', swapCubes);
	}

	this.rotate_y2 = function()
	{
		var self = this;

		if(this._rotateLock) { return; }
		this._rotateLock = true;
		
		var oldAngle = {x: 0, y:0, z:0};
		var newAngle = {
			x: oldAngle.x + Math.PI/2, 
			y: oldAngle.y + Math.PI/2, 
			z: oldAngle.z + Math.PI/2
		};

		this._rotateReset();

		// Mark y2 rotational group as rotating. 
		this.rubik[0][1][0].isRotating = true;
		this.rubik[0][1][1].isRotating = true;
		this.rubik[0][1][2].isRotating = true;
		this.rubik[1][1][0].isRotating = true;
		this.rubik[1][1][1].isRotating = true;
		this.rubik[1][1][2].isRotating = true;
		this.rubik[2][1][0].isRotating = true;
		this.rubik[2][1][1].isRotating = true;
		this.rubik[2][1][2].isRotating = true;

		// Swap cube assignments on callback.
		var swapCubes = function() {
			var t;
			t = self.rubik[0][1][0];
			self.rubik[0][1][0] = self.rubik[2][1][0];
			self.rubik[2][1][0] = self.rubik[2][1][2];
			self.rubik[2][1][2] = self.rubik[0][1][2];
			self.rubik[0][1][2] = t;

			t = self.rubik[0][1][1];
			self.rubik[0][1][1] = self.rubik[1][1][0];
			self.rubik[1][1][0] = self.rubik[2][1][1];
			self.rubik[2][1][1] = self.rubik[1][1][2];
			self.rubik[1][1][2] = t;
		}

		this._installMatrices();
		this._installTween(newAngle, oldAngle, 'y', swapCubes);
	}

	this.rotate_y3 = function()
	{
		var self = this;

		if(this._rotateLock) { return; }
		this._rotateLock = true;
		
		var oldAngle = {x: 0, y:0, z:0};
		var newAngle = {
			x: oldAngle.x + Math.PI/2, 
			y: oldAngle.y + Math.PI/2, 
			z: oldAngle.z + Math.PI/2
		};

		this._rotateReset();

		// Mark y3 rotational group as rotating. 
		this.rubik[0][0][0].isRotating = true;
		this.rubik[0][0][1].isRotating = true;
		this.rubik[0][0][2].isRotating = true;
		this.rubik[1][0][0].isRotating = true;
		this.rubik[1][0][1].isRotating = true;
		this.rubik[1][0][2].isRotating = true;
		this.rubik[2][0][0].isRotating = true;
		this.rubik[2][0][1].isRotating = true;
		this.rubik[2][0][2].isRotating = true;

		// Swap cube assignments on callback.
		var swapCubes = function() {
			var t;
			t = self.rubik[0][0][0];
			self.rubik[0][0][0] = self.rubik[2][0][0];
			self.rubik[2][0][0] = self.rubik[2][0][2];
			self.rubik[2][0][2] = self.rubik[0][0][2];
			self.rubik[0][0][2] = t;

			t = self.rubik[0][0][1];
			self.rubik[0][0][1] = self.rubik[1][0][0];
			self.rubik[1][0][0] = self.rubik[2][0][1];
			self.rubik[2][0][1] = self.rubik[1][0][2];
			self.rubik[1][0][2] = t;
		}

		this._installMatrices();
		this._installTween(newAngle, oldAngle, 'y', swapCubes);
	}

	this.rotate_z1 = function()
	{
		var self = this;

		if(this._rotateLock) { return; }
		this._rotateLock = true;
		
		var oldAngle = {x: 0, y:0, z:0};
		var newAngle = {
			x: oldAngle.x + Math.PI/2, 
			y: oldAngle.y + Math.PI/2, 
			z: oldAngle.z + Math.PI/2
		};

		this._rotateReset();

		// Mark z1 rotational group as rotating. 
		this.rubik[0][0][2].isRotating = true;
		this.rubik[0][1][2].isRotating = true;
		this.rubik[0][2][2].isRotating = true;
		this.rubik[1][0][2].isRotating = true;
		this.rubik[1][1][2].isRotating = true;
		this.rubik[1][2][2].isRotating = true;
		this.rubik[2][0][2].isRotating = true;
		this.rubik[2][1][2].isRotating = true;
		this.rubik[2][2][2].isRotating = true;

		// Swap cube assignments on callback.
		var swapCubes = function() {
			var t;
			t = self.rubik[0][2][2];
			self.rubik[0][2][2] = self.rubik[2][2][2];
			self.rubik[2][2][2] = self.rubik[2][0][2];
			self.rubik[2][0][2] = self.rubik[0][0][2];
			self.rubik[0][0][2] = t;

			t = self.rubik[1][2][2];
			self.rubik[1][2][2] = self.rubik[2][1][2];
			self.rubik[2][1][2] = self.rubik[1][0][2];
			self.rubik[1][0][2] = self.rubik[0][1][2];
			self.rubik[0][1][2] = t;
		}

		this._installMatrices();
		this._installTween(newAngle, oldAngle, 'z', swapCubes);
	}

	this.rotate_z2 = function()
	{
		var self = this;

		if(this._rotateLock) { return; }
		this._rotateLock = true;
		
		var oldAngle = {x: 0, y:0, z:0};
		var newAngle = {
			x: oldAngle.x + Math.PI/2, 
			y: oldAngle.y + Math.PI/2, 
			z: oldAngle.z + Math.PI/2
		};

		this._rotateReset();

		// Mark z2 rotational group as rotating. 
		this.rubik[0][0][1].isRotating = true;
		this.rubik[0][1][1].isRotating = true;
		this.rubik[0][2][1].isRotating = true;
		this.rubik[1][0][1].isRotating = true;
		this.rubik[1][1][1].isRotating = true;
		this.rubik[1][2][1].isRotating = true;
		this.rubik[2][0][1].isRotating = true;
		this.rubik[2][1][1].isRotating = true;
		this.rubik[2][2][1].isRotating = true;

		// Swap cube assignments on callback.
		var swapCubes = function() {
			var t;
			t = self.rubik[0][2][1];
			self.rubik[0][2][1] = self.rubik[2][2][1];
			self.rubik[2][2][1] = self.rubik[2][0][1];
			self.rubik[2][0][1] = self.rubik[0][0][1];
			self.rubik[0][0][1] = t;

			t = self.rubik[1][2][1];
			self.rubik[1][2][1] = self.rubik[2][1][1];
			self.rubik[2][1][1] = self.rubik[1][0][1];
			self.rubik[1][0][1] = self.rubik[0][1][1];
			self.rubik[0][1][1] = t;
		}

		this._installMatrices();
		this._installTween(newAngle, oldAngle, 'z', swapCubes);
	}

	this.rotate_z3 = function()
	{
		var self = this; 

		if(this._rotateLock) { return; }
		this._rotateLock = true;
		
		var oldAngle = {x: 0, y:0, z:0};
		var newAngle = {
			x: oldAngle.x + Math.PI/2, 
			y: oldAngle.y + Math.PI/2, 
			z: oldAngle.z + Math.PI/2
		};

		this._rotateReset();

		// Mark z3 rotational group as rotating. 
		this.rubik[0][0][0].isRotating = true;
		this.rubik[0][1][0].isRotating = true;
		this.rubik[0][2][0].isRotating = true;
		this.rubik[1][0][0].isRotating = true;
		this.rubik[1][1][0].isRotating = true;
		this.rubik[1][2][0].isRotating = true;
		this.rubik[2][0][0].isRotating = true;
		this.rubik[2][1][0].isRotating = true;
		this.rubik[2][2][0].isRotating = true;

		// Swap cube assignments on callback.
		var swapCubes = function() {
			var t;
			t = self.rubik[0][2][0];
			self.rubik[0][2][0] = self.rubik[2][2][0];
			self.rubik[2][2][0] = self.rubik[2][0][0];
			self.rubik[2][0][0] = self.rubik[0][0][0];
			self.rubik[0][0][0] = t;

			t = self.rubik[1][2][0];
			self.rubik[1][2][0] = self.rubik[2][1][0];
			self.rubik[2][1][0] = self.rubik[1][0][0];
			self.rubik[1][0][0] = self.rubik[0][1][0];
			self.rubik[0][1][0] = t;
		}

		this._installMatrices();
		this._installTween(newAngle, oldAngle, 'z', swapCubes);
	}
}

var camera, scene, renderer;
var ambientLight;

var lastX = 0;
var lastY = 0;
var mouseX = 0;
var mouseY = 0;

// Objects
var mol = null;

// TODO: DNA molecule should default to orientation straight upward.
// Simply rotate camera at start. This will also let us get rid of a matrix
function init() 
{
	scene = new THREE.Scene();

	var cDom = $(window);
	var aspect = cDom.innerWidth() / cDom.innerHeight();

	camera = new THREE.PerspectiveCamera(
		75,		// fov
		aspect, // aspect
		1,		// near clipping
		10000	// far clipping
	);

	var X_INIT = 700
	var Y_INIT = 0;
	var Z_INIT = 1000; 

	camera.position.x = X_INIT;
	camera.position.y = Y_INIT;
	camera.position.z = Z_INIT;

	scene.add(camera);

	mol = new Molecule();
	
	$(window).mousemove(function(event) {
		lastX = mouseX;
		lastY = mouseY;
		mouseX = event.pageX;
		mouseY = event.pageY;
	});

	// Already preloaded
	//$(window).load(function() {
		renderer = new THREE.CanvasRenderer();
		renderer.setSize(window.innerWidth, window.innerHeight);

		// FIXME: Does lighting not work on canvas? 
		var light = new THREE.DirectionalLight(0xffffff);
		light.position.set(1, 0, 0).normalize();
		light.castShadow = true; // TODO
		scene.add(light);

		//$("body").html(renderer.domElement); // XXX: No resize issues, but...
		$("#canvas").html(renderer.domElement);
		animate();	
	//});

	/**
	 * Place the camera according to scroll position.
	 */
	var placeCamera = function() {
		// FIXME: Something is broken about $(document).height
		var height = Math.max(
			$(document).height(),
			$('body').height(),
			$('#main').height(),
			$('#text').height());
		var TOP = 0;
		var BOTTOM = height - $(window).height();

		// Between 0 and 1. 
		var scrollPos = $(document).scrollTop() / BOTTOM;

		var x = X_INIT - Math.round(X_INIT*scrollPos);
		var y = Y_INIT //+ Math.round(100*scrollPos);
		var z = Z_INIT - Math.round(Z_INIT*scrollPos);
		var xRot = 0 - Math.PI/2 * scrollPos;
		var yRot = 0 - Math.PI/10 * scrollPos;
		var zRot = 0 - Math.PI/10 * scrollPos;

		camera.position.x = x;
		camera.position.y = y;
		camera.position.z = z;

		camera.rotation.x = xRot;
		camera.rotation.y = yRot;
		camera.rotation.z = zRot;
	}

	$(window).resize(function() {
		renderer.setSize($(window).width(), 
				$(window).height());

		// FIXME: Best way to replace camera? 
		var aspect = cDom.innerWidth() / cDom.innerHeight();
		camera = new THREE.PerspectiveCamera(
			75,		// fov
			aspect, // aspect
			1,		// near clipping
			10000	// far clipping
		);
		scene.add(camera);
		placeCamera();
	});

	$(window).scroll(function(ev) { placeCamera(); });
}

function animate()
{
	requestAnimationFrame(animate);
	render();
}

var rotMat = new THREE.Matrix4();
var yAuto = -0.05;
var yAutoState = 0.0;

function render()
{
	// Molecule Auto Rotation
	rotMat.identity()
		.rotateY(yAutoState);

	yAutoState += yAuto;
	yAutoState %= Math.PI*2;

	mol.setMat(1, rotMat);
	mol.render();

	renderer.render(scene, camera);
}
