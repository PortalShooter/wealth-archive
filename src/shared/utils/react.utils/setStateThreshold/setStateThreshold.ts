type ComperableValue = number;

type ComperableObject = {
    [index: string]: ComperableValue;
}

type ComperableArray = Array<ComperableValue>;

const isComperableValue = (v: any): v is ComperableValue => {
    if (typeof v === "number") {
        return true;
    } else if (typeof v === "object") {
        return isComperableObject(v);
    } else {
        return false;
    }
}

const isComperableObject = (v: any): v is ComperableObject => {
    if (typeof v !== "object") return false;

    return Object.keys(v).reduce((prev:boolean, cur) => (prev && isComperableValue(cur)), true);
}

/**
 * Finds maximum difference between values. Returns Infinity if any non-number values are different
 * @param v1 First value
 * @param v2 Second value
 * @returns difference between values
 */
const valueDifference = (v1: ComperableValue, v2: ComperableValue):number => {
    if (v1 === v2) {
        return 0;
    } else if (typeof v1 === "number" && typeof v2 === "number") {
        return Math.abs(v1 - v2);
    } else if(isComperableObject(v1) && isComperableObject(v2)) {
        return objectDifference(v1, v2);
    } else {
        return Infinity;
    }
}

/**
 * Finds maximum difference between values of array. Returns Infinity if any non-number values are different
 * @param a1 First array
 * @param a2 Second array
 * @returns Maximum difference
 */
const arrayDifference = (a1:ComperableArray, a2:ComperableArray):number => {
    let maxDifference:number = 0;

    if (a1.length !== a2.length) {
        return Infinity;
    }

    maxDifference = a1.reduce((prev:number, cur, index) => {
        let nextValue = a2[index];
        if (isComperableObject(cur) && isComperableObject(nextValue)) {
            return Math.max(prev, objectDifference(cur, nextValue));
        } else if (isComperableValue(cur) && isComperableValue(nextValue)) {
            return Math.max(prev, valueDifference(cur, nextValue));
        } else {
            return Infinity;
        }
    }, 0);

    return maxDifference;
}

/**
 * Finds maximum difference between values of objects. Returns Infinity if any non-number values are different
 * @param a1 First array
 * @param a2 Second array
 * @returns Maximum difference
 */
const objectDifference = (o1:ComperableObject, o2:ComperableObject):number => {
    let maxDifference:number = 0;

    if (Object.keys(o1).length !== Object.keys(o2).length) {
        return Infinity;
    }

    maxDifference = Object.keys(o1).reduce((prev:number, key) => {
        return Math.max(prev, valueDifference(o1[key], o2[key]))
    }, 0);

    return maxDifference;
}

/**
 * Sets state only if the difference between new value and old value is bigger then threshold
 * @param setState StetState function from useState hook
 * @param getNewState Function, that recieves old state and returns new state
 * @param threshold Threshold
 */
export const setStateThreshold = <State extends object | Array<any> | number | string | boolean | undefined | null>(
  setState: React.Dispatch<React.SetStateAction<State>>,
  getNewState: (prevState:State) => State,
  threshold: number = 0
): void => {
  setState((prevState) => {
    const newState = getNewState(prevState);

    let difference = 0;
    if (Array.isArray(newState) && Array.isArray(prevState)) {
        difference = arrayDifference(newState, prevState);
    } else if (isComperableObject(newState) && isComperableObject(prevState)) {
        difference = objectDifference(newState, prevState);
    } else if (isComperableValue(newState) && isComperableValue(prevState)) {
        difference = valueDifference(newState, prevState);
    } else {
        difference = Infinity;
    }

    if (difference > threshold) {
        return newState;
    } else {
        return prevState;
    }
  });
};
