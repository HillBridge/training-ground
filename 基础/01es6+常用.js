// const let 常量和块级变量的声明
const a = "a";
let b = "b";

// 对象和数组的扩展运算符

const arr1 = [1, 2, 3];
const arr2 = [...arr1, 4, 5];

const obj1 = { a: "a" };
const obj2 = { ...obj1, b: "b" };

// 模版字符串``
const template = `a is ${a} b is ${b}`;

// 可选链 && || ?.
const num = a || "aa";
const age = num && "18";
const obj = {
  age: 12,
};

console.log(obj?.age);

// 对象中属性和方法的简写

const o1 = {
  name: "bridge",
  getAge() {
    console.log(12);
  },
};

// 箭头函数 () => {}

// try catch 保证程序正常进行

// promise.then catch finally  Promise.resolve()   Promise.reject()

// async await

// import export 模块化

// Object.keys  Object.values Object.entries

// Array.includes

// Set 数组去重

//flat flatMap

const r = [1, 2, 3, [4, 5, [6]]].flat(4);
console.log(r);
const r2 = r.flatMap((t) => [t * t]);
console.log(r2);

// Object.fromEntries  // 二维数组转Map再转对象
const m = new Map([["a", "a"]]);
console.log(Object.fromEntries(m));

// 对象的解构赋值

// 函数的默认参数

function getName(n = 12) {}
