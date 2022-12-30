import { clamp } from "./clamp";

export const linearstep = (edge0:number, edge1:number, x:number):number => {
	return clamp((x - edge0) / (edge1 - edge0), 0.0, 1.0); 
}