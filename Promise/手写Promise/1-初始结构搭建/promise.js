// 声明构造函数
function Promise(executor){
    // 添加属性
    this.PromiseState = 'pending';
    this.PromiseResult = null;

    // 保存回调函数，在异步状态中
    // this.callback = {}
    // 由于p可以指定多个回调，避免回调函数被覆盖，改用数组保存
    this.callback = [];

    // 保存实例对象的this值
    const self = this; // self _this that 

    // resolve 函数
    function resolve(data){
        // 判断 状态，只有pending状态才能改变
        if(self.PromiseState !== 'pending') return;
        // 1. 修改对象的状态 (promiseState)
        self.PromiseState = 'fulfilled'; // resolved
        // 2. 设置对象结果值 (promiseRsult)
        self.PromiseResult = data;

        // 调用成功的回调函数---处理异步的情况
        // if(self.callback.onResolved){
        //     self.callback.onResolved(data);
        // }
        // 由于异步时，可能有多个回调，所以需要遍历数组获得所有的回调
        setTimeout(()=>{
            self.callback.forEach(item=>{
                item.onResolved(data);
            })
        })
        
    }

    // reject 函数
    function reject(data){
        // 判断 状态，只有pending状态才能改变
        if(self.PromiseState !== 'pending') return;
        // 1.修改对象的状态 (promiseState)
        self.PromiseState = 'rejected';
        // 2.设置对象结果值 (promiseResult)
        self.PromiseResult = data;

        // 调用失败的回调函数---处理异步的情况
        // if(self.callback.onRejected){
        //     self.callback.onRejected(data);
        // }
        // 由于异步时，可能有多个回调，所以需要遍历数组获得所有的回调
        setTimeout(()=>{
            self.callback.forEach(item=>{
                item.onRejected(data);
            });
        });
        
    }
    try{
        executor(resolve,reject);
    }catch(e){
        reject(e);
    }
}

//添加 then 方法
Promise.prototype.then = function(onResolved, onRejected){
    const self = this;

    // 判断回调函数参数
    if(typeof onRejected !== 'function'){
        onRejected = reason =>{
            throw reason;
        }
    }
    if(typeof onResolved !== 'function'){
        onResolved = value => value;
    }

    // then能使用链式法则，所以需要返回一个新的Promise对象
    return new Promise((resolve, reject) =>{
        // 封装函数
        function callback(type){
            try{
                const result = type(self.PromiseResult);
                // 判断 result的类型，如果是Promise，则我们返回的新的Promise的状态和值取决于收到的这个result的
                // 如果收到其他，则返回的Promise状态是fulfilled,值是接受的result
                if(result instanceof Promise){
                    // 因为我们收到的是一个Promise对象，所以可以调用它的then方法
                    // 根据result的状态，设置我们返回的新Promise对象的 state 和result；
                    result.then(value => {
                        resolve(value);
                    }, reason=>{
                        reject(reason);
                    })
                }else{
                    resolve(result);
                }
            }catch(e){
                reject(e);
            }
        }
        // 调用回调函数 PromiseState
        if(this.PromiseState === 'fulfilled'){
            setTimeout(()=>{
                callback(onResolved);
            })
        }
        if(this.PromiseState === 'rejected'){
            setTimeout(()=>{
                callback(onRejected);
            })
        }
        if(this.PromiseState === 'pending'){
            // 由于p可以指定多个回调，避免回调函数被覆盖，追加到数组中
            this.callback.push({
                onResolved:function(){
                    callback(onResolved);
                } ,
                onRejected:function(){
                    callback(onRejected);
                }
            })
        }
    }) 
}

// 添加catch方法
Promise.prototype.catch = function(onRejected){
    return this.then(undefined, onRejected);
}

// 添加 resolve方法
Promise.resolve = function(value){
    // 返回promise对象
    return new Promise((resolve,reject) =>{
        if(value instanceof Promise){
            value.then(v=>{
                resolve(v);
            }, r=>{
                reject(r);
            })
        }else{
            // 状态设置为成功
            resolve(value);
        }
    })
}

// 添加 reject 方法
Promise.reject = function(reason){
    return new Promise((resolve,reject)=>{
        reject(reason);
    })
}

// 添加 all 方法
Promise.all = function(promises){
    // 返回结果为promise对象
    return new Promise((resolve,reject) => {
        let count = 0;
        let arr = [];
        // 遍历
        for(let i=0;i<promises.length;i++){
            promises[i].then(v=>{
                // 得知对象的状态是成功
                // 每个promise对象都成功
                count++;
                // 将当前promise对象的结果存入到数组中
                arr[i] = v;
                // 判断
                if(count === promises.length){
                    // 修改状态
                    resolve(arr);
                }
            },r=>{
                reject(r);
            });
        }
    })  
}

// 添加 race 方法
Promise.race = function(promises){
    return new Promise((resolve,reject)=>{
        for(const promise of promises){
            promise.then(v=>{
                resolve(v); // 修改返回到对象的状态为 成功
            },r=>{
                reject(r);  // 修改返回到对象的状态为 失败
            })
        }
    })
}