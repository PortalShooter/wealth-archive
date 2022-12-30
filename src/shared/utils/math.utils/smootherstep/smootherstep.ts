import { clamp } from "../clamp/clamp";

export const smootherstep = (edge0:number, edge1:number, x:number):number => {
	x = clamp((x - edge0) / (edge1 - edge0), 0.0, 1.0);
	return x * x * x * (x * (x * 6 - 15) + 10);
}