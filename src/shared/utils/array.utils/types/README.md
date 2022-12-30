# types

## isNumbersArray
Проверяет, являются ли значения массива числами.

Возвращает true/false.

### Пример
```ts
import { isNumbersArray } from "@/shared/utils/array.utils";

isNumbersArray([4, 2, 0, 1]) // true
isNumbersArray([4, "ok", 0, true]) // false 
```