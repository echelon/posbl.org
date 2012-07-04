
// Prevent simultaneous rotations 
var ROTATE_LOCK = false;
var lock = false; // TODO: Replace with other variable 

var oldAngle = {x: 0, y:0, z:0};

/* ========================================================== */

// Swap rubik spots
var swapPlaces = function(r1, r2)
{
	var b1 = rubik.rubik[r1.x][r1.y][r1.z];
	var b2 = rubik.rubik[r2.x][r2.y][r2.z];

	rubik.rubik[r1.x][r1.y][r1.z] = b1;
	rubik.rubik[r2.x][r2.y][r2.z] = b2;
}

// Mark all as non-rotating. 
var rotateReset = function() 
{
	for(var i = 0; i < blocks.length; i++) {
		blocks[i].isRotating = false;
	}
}

// Install new matrix in rotating blocks' stacks
var installMatrices = function()
{
	// Push a new matrix. 
	// Must be popped?  OR NO?
	for(var i = 0; i < blocks.length; i++) {
		var block = blocks[i];
		if(!block.isRotating) {
			continue;
		}
		block.pushMat(new THREE.Matrix4());
	}
}

var installTween = function(newAngle, oldAngle, axis, callback)
{
	new TWEEN.Tween(oldAngle)
		.to(newAngle, 1600)
		//.easing(TWEEN.Easing.Elastic.Out)
		.onUpdate(function() {
			for(var i = 0; i < blocks.length; i++) {
				var block = blocks[i];
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
			// Lock to prevent two tweens at once. 
			lock = false;

			// TODO: Do this immediately from now on. 
			setTimeout(function() {
				for(var i = 0; i < blocks.length; i++) {
					var block = blocks[i];
					if(!block.isRotating) {
						continue;
					}
					// XXX: Method 1
					// XXX: Pop the mat we pushed. 
					//block.popMat(); // XXX: Temp comment out
				}
				// XXX: Method 2
				// Reposition everything. 
				rubik.position(); // XXX COMMENTED OUT COMMENTED OUT TEMP
			}, 600);

			callback();
		})
		.start();
}

