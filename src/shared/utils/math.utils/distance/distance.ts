type vector2 = {
	x: number,
	y: number
}

type vector3 = {
	x: number,
	y: number,
	z: number
}

export const distance = (p0: vector2 | vector3, p1: vector2 | vector3):number => {
	function isVector3(p: any): p is vector3 {
		return (p as vector3).z !== undefined;
	}

	if (isVector3(p0) && isVector3(p1)) {
		return Math.pow(Math.pow(p0.x - p1.x, 2) + Math.pow(p0.y - p1.y, 2) +  Math.pow(p0.z - p1.z, 2), 0.5);
	} else {
		return Math.pow(Math.pow(p0.x - p1.x, 2) + Math.pow(p0.y - p1.y, 2), 0.5);
	}
}