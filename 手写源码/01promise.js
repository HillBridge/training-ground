// promise解决的是callback回调的问题

// 将状态抽离成常量
const PENDING_STATUS = "pending";
const FULFILLED_STATUS = "fulfilled";
const REJECTED_STATUS = "rejected";

// 抽离封装公共的代码
function excuFnWithCatchError(fn, value, resolve, reject) {
  try {
    const result = fn(value);
    resolve(result);
  } catch (error) {
    reject(error);
  }
}
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
    // 1.then的链式调用问题 必须返回一个新的promise
    return new MyPromise((resolve, reject) => {
      // 2.如果调用then的时候状态已经确定下来了, 比如then放在setTimeout中, 此时状态已经确定下来了, 那么就直接调用then中的回调函数
      if (this.status === FULFILLED_STATUS) {
        // 4.try catch捕获错误
        excuFnWithCatchError(onFulfilled, this.value, resolve, reject);
      }
      if (this.status === REJECTED_STATUS) {
        // 4.try catch捕获错误
        excuFnWithCatchError(onRejected, this.reason, resolve, reject);
      }
      if (this.status === PENDING_STATUS) {
        // 5. then中的参数未传递时默认值的设置
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

        // 3.pending状态then的链式调用, 需要往数组中添加一个函数的方式, 这样可以在函数中拿到执行结果并进行处理
        this.onFulfilledCallbacks.push(() => {
          excuFnWithCatchError(defaultOnFulfilled, this.value, resolve, reject);
        });
        this.onRejectedCallbacks.push(() => {
          excuFnWithCatchError(defaultOnRejected, this.reason, resolve, reject);
        });
      }
    });
  }

  catch(onRejected) {
    return this.then(null, onRejected);
  }

  finally(onFinally) {
    if (this.status === FULFILLED_STATUS) {
      onFinally();
    }
    if (this.status === REJECTED_STATUS) {
      onFinally();
    }
  }
}

const p1 = new MyPromise((resolve, reject) => {
  // 同步执行 但是此时then方法还没有执行 无法拿到回调函数 需要异步执行 queueMicrotask()
  // reject("reject");
  resolve("resolve");
});

p1.then((res) => {
  console.log("res1", res);
  throw new Error("error1111");
})
  .catch((err) => {
    console.log("err", err);
  })
  .finally(() => {
    console.log("finally");
  });

//   (err) => {
//     console.log("err", err);
//   }
// ).then(
//   (res) => {
//     console.log("res2", res);
//   },
//   (err) => {
//     console.log("err2", err.message);
//   }
// );

// p1.then(
//   (res) => {
//     console.log("res2", res);
//   },
//   (err) => {
//     console.log("err2", err);
//   }
// );

// setTimeout(() => {
//   p1.then(
//     (res) => {
//       console.log("res3", res);
//     },
//     (err) => {
//       console.log("err3", err);
//     }
//   );
// }, 1000);
