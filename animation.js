// XXX/NOTE : Will get out of alignment if called again before 
// animation finishes
var oldAngle = {x: 0, y:0, z:0};
var lock = false;
function move() 
{
	if(lock) {
		return;
	}
	lock = true;

	var block = blocks[0];

	//var oldAngle = {x: 0, y:0, z:0};
	var newAngle = {
		x: oldAngle.x + Math.PI/2, 
		y: oldAngle.y + Math.PI/2, 
		z: oldAngle.z + Math.PI/2
	};

	//matStack.pushNew();
	//var mat = matStack.top();

	// Push a new matrix. 
	// Must be popped?  OR NO?
	for(var i = 0; i < blocks.length; i++) {
		var block = blocks[i];
		if(!block.isRotating) {
			continue;
		}
		block.pushMat(new THREE.Matrix4());
	}

	new TWEEN.Tween(oldAngle)
		.to(newAngle, 600)
		.easing(TWEEN.Easing.Elastic.Out)
		.onUpdate(function() {

			/*
			var mat2 = new THREE.Matrix4();

			for(var i = 0; i < blocks.length; i++) {
				blocks[i].object.updateMatrix();
			}

			//mat2.rotateX(oldAngle.x);
			mat2.rotateY(oldAngle.y);
			//mat2.rotateZ(oldAngle.z);

			matStack.push(mat2);

			for(var i = 0; i < blocks.length; i++) {
				blocks[i].object.updateMatrix();
			}*/

			for(var i = 0; i < blocks.length; i++) {
				var block = blocks[i];
				if(!block.isRotating) {
					continue;
				}
				var mat = new THREE.Matrix4();

				switch(ROTATE_TYPE) {
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
				//block.topMat().rotateY(oldAngle.y);
			}

		})
		.onComplete(function() {
			// Lock to prevent two tweens at once. 
			lock = false;

			// Mark all blocks as non-animated.
			for(var i = 0; i < blocks.length; i++) {
				blocks[i].isRotating = false;
			}
	

			// TODO -- cant' address like this anymore. 
			// Must dynamically update a map of the sides. 
			// TODO TODO TODO TODO -- time to give them names. 
			//blocks[9].isRotating = true;
			//blocks[10].isRotating = true;
			//blocks[11].isRotating = true;
			blocks[12].isRotating = true;
			blocks[13].isRotating = true;
			blocks[14].isRotating = true;
			blocks[15].isRotating = true;
			blocks[16].isRotating = true;
			blocks[17].isRotating = true;
			ROTATE_TYPE = 'x';

			/*switch(ROTATE_TYPE) {
				case 'x':
					ROTATE_TYPE = 'y';
					break;
				case 'y':
					ROTATE_TYPE = 'z';
					break;
				case 'z':
					ROTATE_TYPE = 'x';
					break;
			}*/

			/*setTimeout(function() {
				move();
			}, 1000);*/
		})
		.start();
}


