
var rotate_x1 = function()
{
	if(lock) { return; }
	lock = true;
	
	var newAngle = {
		x: oldAngle.x + Math.PI/2, 
		y: oldAngle.y + Math.PI/2, 
		z: oldAngle.z + Math.PI/2
	};

	rotateReset();

	// Mark x1 rotational group as rotating. 
	rubik.rubik[0][0][0].isRotating = true;
	rubik.rubik[0][0][1].isRotating = true;
	rubik.rubik[0][0][2].isRotating = true;
	rubik.rubik[0][1][0].isRotating = true;
	rubik.rubik[0][1][1].isRotating = true;
	rubik.rubik[0][1][2].isRotating = true;
	rubik.rubik[0][2][0].isRotating = true;
	rubik.rubik[0][2][1].isRotating = true;
	rubik.rubik[0][2][2].isRotating = true;

	installMatrices();

	installTween(newAngle, 'x');
}

var rotate_x2 = function()
{
	if(lock) { return; }
	lock = true;
	
	var newAngle = {
		x: oldAngle.x + Math.PI/2, 
		y: oldAngle.y + Math.PI/2, 
		z: oldAngle.z + Math.PI/2
	};

	rotateReset();

	// Mark x1 rotational group as rotating. 
	rubik.rubik[1][0][0].isRotating = true;
	rubik.rubik[1][0][1].isRotating = true;
	rubik.rubik[1][0][2].isRotating = true;
	rubik.rubik[1][1][0].isRotating = true;
	rubik.rubik[1][1][1].isRotating = true;
	rubik.rubik[1][1][2].isRotating = true;
	rubik.rubik[1][2][0].isRotating = true;
	rubik.rubik[1][2][1].isRotating = true;
	rubik.rubik[1][2][2].isRotating = true;

	installMatrices();

	installTween(newAngle, 'x');
}

var rotate_x3 = function()
{
	if(lock) { return; }
	lock = true;
	
	var newAngle = {
		x: oldAngle.x + Math.PI/2, 
		y: oldAngle.y + Math.PI/2, 
		z: oldAngle.z + Math.PI/2
	};

	rotateReset();

	// Mark x1 rotational group as rotating. 
	rubik.rubik[2][0][0].isRotating = true;
	rubik.rubik[2][0][1].isRotating = true;
	rubik.rubik[2][0][2].isRotating = true;
	rubik.rubik[2][1][0].isRotating = true;
	rubik.rubik[2][1][1].isRotating = true;
	rubik.rubik[2][1][2].isRotating = true;
	rubik.rubik[2][2][0].isRotating = true;
	rubik.rubik[2][2][1].isRotating = true;
	rubik.rubik[2][2][2].isRotating = true;

	installMatrices();

	installTween(newAngle, 'x');
}

var rotate_y1 = function()
{
	if(lock) { return; }
	lock = true;
	
	var newAngle = {
		x: oldAngle.x + Math.PI/2, 
		y: oldAngle.y + Math.PI/2, 
		z: oldAngle.z + Math.PI/2
	};

	rotateReset();

	// Mark x1 rotational group as rotating. 
	rubik.rubik[0][0][0].isRotating = true;
	rubik.rubik[0][0][1].isRotating = true;
	rubik.rubik[0][0][2].isRotating = true;
	rubik.rubik[1][0][0].isRotating = true;
	rubik.rubik[1][0][1].isRotating = true;
	rubik.rubik[1][0][2].isRotating = true;
	rubik.rubik[2][0][0].isRotating = true;
	rubik.rubik[2][0][1].isRotating = true;
	rubik.rubik[2][0][2].isRotating = true;

	installMatrices();

	installTween(newAngle, 'y');
}


