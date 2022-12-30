export const step = (edge:number, x:number):number => {
	if (x < edge) {
		return 0;
	} else {
		return 1;
	}
}