import { isArray } from "util";

export let objectHelper = {};

objectHelper.deepCopy = obj => {
  if (typeof obj !== 'object' || obj === null) {
    return obj;
  }

  if (isArray(obj)) {
    let newArr = [];

    for (let item of obj) {
      newArr.push(objectHelper.deepCopy(item));
    }

    return newArr;
  } else {
    let newObj = {};

    for (let attr in obj) {
      newObj[attr] = objectHelper.deepCopy(obj[attr]);
    }

    return newObj;
  }
}

objectHelper.uniqueArrayObj = arr => {
    let tempArr = [];
    arr.forEach(item => {
        tempArr.push(JSON.stringify(item));
    });
    let tempArr2 = tempArr.reduce(function (prev, cur) {
        prev.indexOf(cur) === -1 && prev.push(cur);
        return prev;
    }, []);
    let tempArr3 = [];
    tempArr2.forEach(item => {
        tempArr3.push(JSON.parse(item));
    });

    return tempArr3;
};
