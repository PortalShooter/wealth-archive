export const subArrays = (ar1: Array<number>, ar2: Array<number>): Array<number> => {
    if (ar1.length !== ar2.length) {
        throw new Error("arrays length must be equal");
    }

    return ar1.map((el1, i) => {
        return el1 - ar2[i];
    });
};
