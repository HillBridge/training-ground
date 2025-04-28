const arr = [1, 2, 3, [4, 5, 6, [7, 8, 9]]];

// 通过栈实现 特点: 先进后出
// 从后往前遍历, 每次从栈顶拿一项判断是不是数组, 如果是数组, 那么将它展开并将展开项入栈, 如果不是数组, 那么将它添加到新创建的数组中
// 循环条件是当前栈不为空 长度大于0
// 最后返回新创建的数组
function myFlat(arr) {
  let stack = [...arr];
  let result = [];
  while (stack.length > 0) {
    const item = stack.pop();
    if (Array.isArray(item)) {
      stack.push(...item);
    } else {
      result.unshift(item);
    }
  }
  return result;
}

console.log(myFlat(arr));
