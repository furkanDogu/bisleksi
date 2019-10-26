import _random from 'lodash/random';

import permutator from '@utils/permutator';

export const addCustomValue = (
    value: number | number[],
    valueKey: string,
    data: any[],
    dataKey: string,
) => {
    if (typeof value === 'object') {
        if (value.length !== data.length)
            throw new Error('There should be same amount of value for data array');
        return data.map((each, index) => ({ [dataKey]: each, [valueKey]: data[index] }));
    }
    return data.map(each => ({ [dataKey]: each, [valueKey]: value }));
};

export const pickRandomFromArr = (array: any[], howMany: number) => {
    if (howMany > array.length)
        throw new Error('Item count to pick should be smaller than the array length');
    const res = [];
    for (let i = 0; i < howMany; i++) {
        const a = array[_random(array.length - 1)];
        res.push(a);
    }

    return res;
};

export const permutateAndPickRand = (array: any[], howMany: number) =>
    pickRandomFromArr(permutator(array), howMany);

//FIXME: Add a function to get score of given name in given level
