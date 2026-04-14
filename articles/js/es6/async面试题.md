```javascript

async function test(){
  console.log(1);
  await f2()
  console.log(3);
}
async function f2(){
  console.log(2);
}
test()

// 1
// 2
// 3


async function async1(params) {
  console.log(111);
  await async2()
  console.log(222);
  await async3()
  console.log(333);
}

async function async2(params) {
  console.log(444);
}
async function async3(params) {
  console.log(555);
}
console.log(666);
async1()
console.log(777);

// 666
// 111
// 444
// 777
// 222
// 555
// 333

//上面的async的函数等价于地下的promise化之后的

console.log(666);
//async1()
new Promise((resolve,reject)=>{
  console.log(111);
  // await async2()
  new Promise((resolve, reject) => {
    console.log(444);
    resolve()
  }).then(()=>{
    console.log(222);
    //await async3()
    new Promise((resolve, reject) => {
      console.log(555);
      resolve()
    }).then(()=>{
      console.log(333);
    })
  })
})
console.log(777);

// 666
// 111
// 444
// 777
// 222
// 555
// 333

```

[codepen](https://codepen.io/itlixiaolong/embed/vYaXyjN)

