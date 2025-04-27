const arr = [1, 2, 3, 1, 3, 5];

// 1. set 去重
function unique(arr) {
  return [...new Set(arr)];
}

// console.log(unique(arr));

// 2. filter 去重
function unique2(arr) {
  return arr.filter((element, index, array) => {
    return array.indexOf(element) === index;
  });
}

// console.log(unique2(arr));

// 3. forEach 去重
function unique3(arr) {
  const result = [];
  arr.forEach((item) => {
    if (!result.includes(item)) {
      result.push(item);
    }
  });
  return result;
}
