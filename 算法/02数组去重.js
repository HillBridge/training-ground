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

// 数组去重 但是不创建新数组(类似于filter方法)

function unique4(arr) {
  for (let i = 0; i < arr.length; i++) {
    if (arr.indexOf(arr[i]) !== i) {
      // 删除这个元素
      arr.splice(i, 1);
      // 因为删除一个元素后, 数组长度会减小, 所以需要减小索引
      i--;
    }
  }
  return arr;
}
