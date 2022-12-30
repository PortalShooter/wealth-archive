# clamp

Порт аналогичной функции из glsl. Обрезает значение числа заданными границами.

Синтаксис:
```javascript
var newX = Math.clamp(x, minVal, maxVal);
```

newX = {  
	**x** если **minVal < x < maxVal**,  
	**minVal** если **x <= minVal**,  
	**maxVal** если **x >= maxVal**  
}