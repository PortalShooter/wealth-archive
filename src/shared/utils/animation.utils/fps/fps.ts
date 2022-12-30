let fps = 60;
let previousPerformanceTime = 0;

const frameRates = [60, 120, 144, 160];
const fpsArray: Array<number> = [];

const loop = function() {
	if (typeof window === "undefined") return;
	
	const now = window.performance.now();

	if (previousPerformanceTime) {
		const performanceShift = now - previousPerformanceTime;
		fpsArray.push(1000 / performanceShift);
	}

	if (fpsArray.length > 0) {
		fps = fpsArray.reduce((pr, cur) => {
			return pr + cur / fpsArray.length;
		}, 0);

		fps = frameRates.reduce((pr, cur) => {
		    return Math.abs(cur - fps) < Math.abs(pr - fps) ? cur : pr;
		});
	}

	if (fpsArray.length > 300) {
		fpsArray.shift();
	}

	previousPerformanceTime = now;
	requestAnimationFrame(loop);
}

const getFps = function() {
	return fps;
}

loop();

const exports = {
	get: getFps
}

export default exports;