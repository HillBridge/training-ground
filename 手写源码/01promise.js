// promise解决的是callback回调的问题

class MyPromise {
  constructor(executor) {
    console.log("constructor");
    // Promise构造函数接收一个函数, 这个函数内部有两个参数, resolve和reject
    // executor函数在执行器中执行
    this.status = "pending";
    this.value = null;
    this.reason = null;
    this.onFulfilledCallback = null;
    this.onRejectedCallback = null;

    const resolve = (value) => {
      if (this.status === "pending") {
        // 异步执行 微任务
        this.status = "fulfilled";
        this.value = value;
        queueMicrotask(() => {
          this.onFulfilledCallback && this.onFulfilledCallback(value);
        });
      }
    };

    const reject = (reason) => {
      if (this.status === "pending") {
        this.status = "rejected";
        this.reason = reason;
        queueMicrotask(() => {
          this.onRejectedCallback && this.onRejectedCallback(reason);
        });
      }
    };

    executor(resolve, reject);
  }

  then(onFulfilled, onRejected) {
    this.onFulfilledCallback = onFulfilled;
    this.onRejectedCallback = onRejected;
  }
}

const p1 = new MyPromise((resolve, reject) => {
  // 同步执行 但是此时then方法还没有执行 无法拿到回调函数 需要异步执行 queueMicrotask()
  reject("error");
});

p1.then(
  (res) => {
    console.log("成功", res);
  },
  (err) => {
    console.log("失败", err);
  }
);
