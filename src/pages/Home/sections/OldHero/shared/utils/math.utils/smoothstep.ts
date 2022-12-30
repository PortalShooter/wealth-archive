import { clamp } from "./clamp";

export const smoothstep = (edge0:number, edge1:number, x:number):number => {
	x = clamp((x - edge0) / (edge1 - edge0), 0.0, 1.0); 
	return x * x * (3 - 2 * x);
}