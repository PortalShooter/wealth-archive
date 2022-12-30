# smoothstep

Нелинейная вариация функции **clamp**  
Порт аналогичной функции из glsl. Обрезает значение числа заданными границами, интерполируя значение между граничными нелинейной сигмоиной функцией.

Изображение функций при minVal = 0; maxVal = 1; 

<img src="https://upload.wikimedia.org/wikipedia/commons/5/57/Smoothstep_and_Smootherstep.svg" alt="Smoothstep and Smootherstep" width="700"/>

Подробнее про **smoothstep** и **smootherstep** https://en.wikipedia.org/wiki/Smoothstep  

Синтаксис:
```javaScript
let newX = Math.smoothstep(minVal, maxVal, x);
```