# 手写一个完成版promise
```js
function resolvePromise (promise2, x, resolve, reject) {
  if (promise2 === x) { // 如果
    return reject(new TypeError('循环引用了'))
  }
  let called// 表示当前有没有被调用过
  if ((x != null && typeof x === 'object') || typeof x === 'function') { // 判断x是否有可能是一个promise
    try {
      const then = x.then // 获取x的then方法
      if (typeof then === 'function') { // 已经非常确定x是一个Promise了
        then.call(x, (y) => { // y有可能还是一个promise
          if (called) return
          called = true

          resolvePromise(promise2, y, resolve, reject) // 递归调用
        }, (r) => {
          if (called) return
          called = true
          reject(r)
        })
      } else { // 普通对象
        resolve(x)
      }
    } catch (error) {
      if (called) return
      called = true
      reject(error)
    }
  } else { // 说明是一个普通值
    resolve(x) // 直接调resolve方法
  }
}
class Promise {
  constructor (executor) {
    this.value = '' // 保存resolve的结果实参
    this.reason = '' // 保存reject失败的原因
    this.status = 'pending' // 初始化promise的时候的初始状态为pending
    this.fulfiledCbs = [] // 当executor存在异步操作时,保存成功的回调
    this.rejectedCbs = [] // 当executor存在异步操作时,保存失败的回调
    const resolve = (val) => { // new Promise((reslove)=>{ ...todo })
      if (val instanceof Promise) { // 解决Promise.resolve(一个新的promise)
        return val.then(resolve, reject)
      }
      if (this.status === 'pending') { // 如果当前promise的状态是pending
        this.value = val // 保存reslove的值
        this.status = 'fulfilled' // 将promise的状态置成fulfilled
        this.fulfiledCbs.forEach(fn => fn()) // 遍历成功回调,依次执行
      }
    }
    const reject = (reason) => { // new Promise((reject)=>{ ...todo })
      if (this.status === 'pending') { // 如果当前promise的状态是pending
        this.reason = reason // 保存失败原因
        this.status = 'rejected'// 将promise的状态置成rejected
        this.rejectedCbs.forEach(fn => fn())// 遍历失败回调,依次执行
      }
    }
    try {
      executor(resolve, reject) // 执行传入的函数,传入resolve,reject
    } catch (err) {
      reject(err) // 报错直接调reject
    }
  }

  then (onFulfilled, onRejected) {
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : v => v
    /** 如果onFulfilled成功回调为空,给一个默认函数,实现透传的功能()
     * Promise.resolve(1)
     *    .then()
     *    .then()
     *    .then(val=>{
     *      console.log(val)//1
     * })
     */

    onRejected = typeof onRejected === 'function' ? onFulfilled : err => { throw err } // 同上
    /**
     * 由于promise需要支持链式调用,因此.then()方法的结果需要返回一个promise,
     * 为什么此处不返回this对象呢?
     * 是因为promise一旦状态改变就不可以再变化,因此只能返回一个新的promise2(状态在未来决定),这里是递归调用
     */
    const promise2 = new Promise((resolve, reject) => {
      if (this.status === 'fulfilled') {
        setTimeout(function () {
          /**
           *这里使用setTimeout的原因是,由于resolvePromise(promise2, x, resolve, reject)这个方法需要
           * promise2这个promise的实例,判断是否循环调用本身,而 promise2是在new操作完成之后才能使用,而我们在new的过程中就使用了
           * 所以需要将使用的方法放到异步队列中,保证我们使用时能获取到promise2的值
           *
           *
           * 循环调用的列子
           * const p1=new Promise((resolve,reject)=>{
           *      setTimeout(()=>{
           *        resolve()
           *      },100)
           * })
           * p1.then(val=>{
           *  return p1
           * })
           */
          try {
            const x = onFulfilled(this.value) // 获取then中成功回调的结果

            resolvePromise(promise2, x, resolve, reject)// 判断返回值是否为一个新的promise
          } catch (error) {
            reject(error)
          }
        }, 0)
      } else if (this.status === 'rejected') {
        setTimeout(function () {
          try {
            const x = onRejected(this.reason) // reject这一步可以省略,因为如果reject后,直接返回reason
            resolvePromise(promise2, x, resolve, reject)
          } catch (error) {
            reject(error)
          }
        }, 0)
      } else {
        this.fulfiledCbs.push(() => {
          setTimeout(function () {
            try {
              const x = onFulfilled(this.value)
              resolvePromise(promise2, x, resolve, reject)
            } catch (error) {
              reject(error)
            }
          }, 0)
        })
        this.fulfiledCbs.push(() => {
          setTimeout(function () {
            try {
              const x = onRejected(this.reason)
              resolvePromise(promise2, x, resolve, reject)
            } catch (error) {
              reject(error)
            }
          }, 0)
        })
      }
    })
  }

  catch (errorCb) {
    return this.then(null, errorCb) // 相当于调用.then()方法,没有传成功的回调
  }

  finally (callback) {
    // finally 会等待finally的callback执行完毕后才会输出原始promise的resolve的结果
    // finally 会等待finally的callback执行完毕后才会输出原始promise的reject的err
    /*
        new Promise((resolve, reject) => {
          setTimeout(() => {
            resolve('11')
          }, 1000)
        })
          .finally(() => {
            // throw new Error('22')
            return new Promise((resolve, reject) => {
              console.log(222)
              resolve(22)
            })
          })
          .then(data => {
            console.log(data)
          }, err => {
            console.log(err)
          })

         结果 :
            222
            11

        new Promise((resolve, reject) => {
            setTimeout(() => {
              throw new Error('11')
            }, 1000)
          })
            .finally(() => {
              throw new Error('22')
            })
            .then(data => {
              console.log(data)
            }, err => {
              console.log(err)
            })
          结果 :
             throw new Error('11')
         */
    return this.then(val => {
      return Promise.resolve(callback()).then(() => val)
    },
    err => {
      return Promise.resolve(callback()).then(() => { throw err })
    }
    )
  }

  static resolve (val) { // 具备等待异步结果的能力,因为resolve方法递归调用了
    return new Promise((resolve, reject) => {
      resolve(val)
    })
  }

  static reject (reason) { // 直接输出结果
    return new Promise((resolve, reject) => {
      reject(reason)
    })
  }

  static all (vals) {
    return new Promise((resolve, reject) => { // 由于.all支持.then()所以.all()返回的也是一个promise
      const resultArr = [] // 保存所有promise的结果
      let orderIndex = 0 // 判断所有的promise是否完成
      const processResultByKey = (val, index) => {
        resultArr[index] = val // 将promise的结果推入resultArr
        if (++orderIndex === vals.length) { // 如果orderIndex==vals的长度,说明所有的promise都完成了
          resolve(resultArr)
        }
      }
      for (let i = 0; i < vals.length; i++) { // 循环整个传入的promise数组
        const val = vals[i]
        if (val && typeof val.then === 'function') { // 判断当前值是否是promise
          val.then(value => {
            processResultByKey(value, i)
          }, reject) // 获取当前promise的结果
        } else {
          processResultByKey(val, i) // 普通值直接存入数组中
        }
      }
    })
  }
}
Promise.defer = Promise.deferred = function () {
  const dfd = {}
  dfd.promise = new Promise((resolve, reject) => {
    dfd.resolve = resolve
    dfd.reject = reject
  })
  return dfd
}

export default Promise
```