# arraysEqual

Сравнивает два массива одинаковой длинны.

Типы: string | number | boolean

### Пример

```ts
import { arraysEqual } from "@/shared/utils/array.utils";

arraysEqual([1, 2], [3, 4]) // return false
arraysEqual([1, "hello", false], [1, "hello", false]) // return true
```