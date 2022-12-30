export const arraysEqual = (
    firstArray: Array<string | number | boolean>,
    secondArray: Array<string | number | boolean>
): boolean => {
    if (firstArray === secondArray) return true;
    if (firstArray.length !== secondArray.length) return false;

    firstArray = firstArray.slice().sort();
    secondArray = secondArray.slice().sort();

    return firstArray.every(
        (item, index) => firstArray[index] === secondArray[index]
    );
};
