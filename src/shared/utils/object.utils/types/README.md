# types

## isNumbersObject

Проверяет, являются ли значения объекта числами.

Возвращает true/false.

### Пример

```ts
import { isNumbersObject } from "@/shared/utils/object.utils";;

const obj1 = {"key1": 1, "key2": 2};
const obj2 = {"key1": 3, "key2": 4};

isNumbersObject({"key1": 1, "key2": 2) // true
isNumbersObject({"key1": "kek", "key2": 4}) // false 
```