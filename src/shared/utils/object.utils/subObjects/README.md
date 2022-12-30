# subObjects

Вычитает числа первого объекта из чисел второго. Объекты должны быть одинаковой длины, ключи значений также должны совпадать по индексу.

Возвращает новый массив с разницей.

### Пример

```ts
import { subObjects } from "@/shared/utils/object.utils";

const obj1 = {"key1": 1, "key2": 2};
const obj2 = {"key1": 3, "key2": 4};

const newObject = subObjects(obj1, obj2); // {"key1": -2, "key2": -2}
```