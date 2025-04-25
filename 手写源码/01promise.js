// promise解决的是callback回调的问题

class MyPromise {
  constructor(fn) {
    this.status = "pending";
    this.value = null;
  }
}

const p1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("success");
  }, 1000);
});

p1.then(
  (res) => {
    console.log(res);
  },
  (err) => {
    console.log(err);
  }
);
