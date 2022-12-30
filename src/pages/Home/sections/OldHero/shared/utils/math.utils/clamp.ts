export const clamp = (x:number, lowerlimit:number, upperlimit:number):number => {
	if (x < lowerlimit) x = lowerlimit;
	if (x > upperlimit) x = upperlimit;
	return x;
}