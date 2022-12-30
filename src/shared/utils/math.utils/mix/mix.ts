export const mix = (v1:number, v2:number, mix:number):number => {
	return v1 + (v2 - v1) * mix;
}