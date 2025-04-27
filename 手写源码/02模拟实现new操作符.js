// 模拟实现new操作符
// new 操作符的执行过程

function myNew(fn, ...args) {
  // 1. 创建一个空对象
  var obj = {};

  // 2. 将空对象的原型指向构造函数的原型
  obj.__proto__ = fn.prototype;

  // 3.将构造函数的this指向新创建的对象
  var res = fn.apply(obj, args);

  // 4. 如果构造函数返回的是对象，则返回该对象，否则返回新创建的对象
  return res instanceof Object ? res : obj;
}

// function Person(name, age) {
//   this.name = name;
//   this.age = age;
// }

// var p = myNew(Person, "张三", 18);
// console.log(p);

// 优化后的方法

function goodNew(fn, ...args) {
  // 1.2合并Object.create创建一个新对象, 并把构造函数的原型绑定到新创建对象的原型上
  var obj = Object.create(fn.prototype);

  // 将构造函数的this指向新创建的对象, 以及参数传递
  var res = fn.apply(obj, args);

  return Object.prototype.toString.call(res) === "[object Object]" ? res : obj;
}

// 判断是不是一个对象的方法
// 1. value instanceof Object
// 2. Object.prototype.toString.call(value) === '[object Object'

console.log({}.toString());
console.log(Object.prototype.toString.call({}));
