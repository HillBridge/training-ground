// add(1)(2, 3)(4).value();
// 函数柯里化 也称部分求值,每次传递参数后, 部分应用参数, 然后返回一个新的函数来处理剩余的参数的过程
// 函数柯里化 是函数式编程的基础之一, 另一个是组合函数

function add(...args1) {
  // args1是函数内的形参作用域, 其变量会一直存储在函数中
  const _add = function (...args2) {
    // ...args1, ...args2将所有参数传递给add add会将所有参数收集到...args1中
    return add(...args1, ...args2);
  };

  _add.value = function () {
    // reduce求和 第二个参数默认为传递数组的第一项
    return args1.reduce((a, b) => {
      console.log("kkk", a, b);
      return a + b;
    });
  };

  return _add;
}
console.log(add(1)(2, 3)(4).value());
