// 模版渲染 只处理一层
// var template = "{{ name }}很厉害，才{{ age }}岁";
// var context = { name: "bottle", age: "15" };

// function render(template, context) {
//   const reg = /{{(.*?)}}/g;
//   return template.replace(reg, (match, key) => {
//     return context[key.trim()];
//   });
// }

// const r = render(template, context);
// console.log(r);

// 模版渲染 处理多层
const template =
  "{{name}}很厉害，才{{age}}岁，他少年{{obj.a}}，独力支持，做了{{obj.b.c}}。";
const context = {
  name: "bottle",
  age: "15",
  obj: { a: "编程", b: { c: "赚钱" } },
};

function render(template, context) {
  // 1. 正则匹配
  const reg = /\{\{\s*(\w+(\.\w+)*)\s*\}\}/g;

  const getValue = (context, keys) => {
    if (keys.length === 0) {
      return context;
    }
    // 递归循环遍历多层嵌套的值
    return getValue(context[keys.shift()], keys);
  };
  return template.replace(reg, (match, key) => {
    return getValue(context, key.split("."));
  });
}

const r = render(template, context);
console.log(r);
