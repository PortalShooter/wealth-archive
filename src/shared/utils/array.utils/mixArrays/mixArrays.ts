import { mix } from "../../math.utils";

export const mixArrays = (
    ar1: Array<number>,
    ar2: Array<number>,
    mixValue: number
): Array<number> => {
    if (ar1.length !== ar2.length) {
        throw new Error("arrays length must be equal");
    }

    return ar1.map((el1, i) => {
        const el2 = ar2[i];
        return mix(el1, el2, mixValue);
    });
};
