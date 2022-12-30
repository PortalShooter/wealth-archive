import { addObjects } from "./addObjects/addObjects";
import { mixObjects } from "./mixObjects/mixObjects";
import { multiplyObjects } from "./multiplyObjects/multiplyObjects";
import { subObjects } from "./subObjects/subObjects";
import { deepCopy } from "./deepCopy/deepCopy";
import { keysToCamel } from "./keysToCamel";
import { isNumbersObject, NumbersObject, DefaultObject } from "./types/types";

export {
    addObjects,
    mixObjects,
    multiplyObjects,
    subObjects,
    deepCopy,
    isNumbersObject,
    keysToCamel
}

export type { NumbersObject, DefaultObject }
