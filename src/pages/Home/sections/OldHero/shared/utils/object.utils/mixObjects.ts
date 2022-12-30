import { mix } from "../math.utils/mix";
import { NumbersObject, ObjectMathMix } from "./types";

export const mixObjects:ObjectMathMix<NumbersObject> = (
    obj1: NumbersObject,
    obj2: NumbersObject,
    mixValue: number
) => {
    const newObject: NumbersObject = {};

    Object.keys(obj1).forEach((key) => {
        newObject[key] = mix(
            obj1[key],
            obj2[key],
            mixValue
        );
    });

    return newObject;
};
