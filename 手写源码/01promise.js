// promise解决的是callback回调的问题

// 将状态抽离成常量
const PENDING_STATUS = "pending";
const FULFILLED_STATUS = "fulfilled";
const REJECTED_STATUS = "rejected";

class MyPromise {
  constructor(executor) {
    // Promise构造函数接收一个函数, 这个函数内部有两个参数, resolve和reject
    // executor函数在执行器中执行
    // 1. 状态的管理
    // 2. 传递的值的管理
    // 3. then传递的回调函数的调用时机
    // 4. then参数未传递时默认值的设置
    this.status = PENDING_STATUS;
    this.value = null;
    this.reason = null;
    this.onFulfilledCallbacks = [];
    this.onRejectedCallbacks = [];

    const resolve = (value) => {
      if (this.status === PENDING_STATUS) {
        // 异步执行 微任务
        this.status = FULFILLED_STATUS;
        this.value = value;
        queueMicrotask(() => {
          this.onFulfilledCallbacks.forEach((callback) => {
            callback(this.value);
          });
        });
      }
    };

    const reject = (reason) => {
      if (this.status === PENDING_STATUS) {
        this.status = REJECTED_STATUS;
        this.reason = reason;
        queueMicrotask(() => {
          this.onRejectedCallbacks.forEach((callback) => {
            callback(this.reason);
          });
        });
      }
    };

    executor(resolve, reject);
  }

  then(onFulfilled, onRejected) {
    const defaultOnFulfilled = !onFulfilled
      ? () => {
          throw new Error("没有传递onFulfilled");
        }
      : onFulfilled;
    const defaultOnRejected = !onRejected
      ? () => {
          throw new Error("没有传递onRejected");
        }
      : onRejected;

    this.onFulfilledCallbacks.push(defaultOnFulfilled);
    this.onRejectedCallbacks.push(defaultOnRejected);
  }
}

const p1 = new MyPromise((resolve, reject) => {
  // 同步执行 但是此时then方法还没有执行 无法拿到回调函数 需要异步执行 queueMicrotask()
  resolve("resolve");
});

p1.then(
  (res) => {
    console.log("res1", res);
  },
  (err) => {
    console.log("err", err);
  }
);

p1.then((res) => {
  console.log("res2", res);
});
