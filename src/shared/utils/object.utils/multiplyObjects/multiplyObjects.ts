import { NumbersObject, ObjectMath } from "../types/types";

export const multiplyObjects: ObjectMath<NumbersObject> = (obj1, obj2) => {
    const newObject: NumbersObject = {};

    Object.keys(obj1).forEach((key) => {
        newObject[key] = obj1[key] * obj2[key];
    });

    return newObject;
};
