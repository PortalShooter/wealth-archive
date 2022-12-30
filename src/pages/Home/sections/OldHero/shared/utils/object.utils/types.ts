export interface DefaultObject {
    [index: string]: unknown;
};

export interface NumbersObject {
    [index: string]: number;
};

export const isNumbersObject = (p: any): p is NumbersObject => {
    if (typeof p !== "object") return false;
    for (let key in p) {
        if (typeof p[key] !== "number") {
            return false;
        }
    }
    return true;
}

export interface ObjectMath<ObjectType extends NumbersObject> {
    (obj1: ObjectType, obj2: ObjectType): ObjectType
}

export interface ObjectMathMix<ObjectType extends NumbersObject> {
    (obj1: ObjectType, obj2: ObjectType, mixValue: number): ObjectType
}