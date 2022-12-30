# addObjects

Складывает числа двух объектов с одинаковыми ключами.

### Пример

```ts
import {addObject} from "@/shared/utils/object.utils";

const obj1 = {"key1": 1, "key2": 2};
const obj2 = {"key1": 3, "key2": 4};

const newObject = addObjects(obj1, obj2); // {"key1": 4, "key2": 6}
```