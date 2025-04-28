var arr = [1, 2, 3, 4, 5];

// var index = arr.findIndex(function (item, index, array) {
//   return item === 3;
// });

// console.log(index);

Array.prototype.myFindIndex = function (callback) {
  const arr = this;
  for (let i = 0; i < arr.length; i++) {
    const item = arr[i];
    if (callback(item, i, arr)) {
      return i;
    }
  }
  return -1;
};

var index = arr.myFindIndex(function (item, index, array) {
  return item === 3; // 返回true 则返回当前索引
});

console.log(index);
