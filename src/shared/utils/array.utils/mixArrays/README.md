# mixArrays

Считает промежуточное значение (в зависимости от 3-его параметра) между числами в массиве одинаковой длины.

Возвращает новый массив с числами.

### Пример

```ts
import { mixArrays } from "@/shared/utils/array.utils";

mixArrays([1, 1, 1], [0, 0, 0], 1) // return [0, 0, 0]
mixArrays([1, 1, 1], [0, 0, 0], 0) // return [1, 1, 1]
mixArrays([1, 1, 1], [0, 0, 0], 0.3) // return [0.7, 0.7, 0.7]
```

### API

```ts
mixArrays = (
    ar1: Array<number>,
    ar2: Array<number>,
    mixValue: number
): Array<number>
```