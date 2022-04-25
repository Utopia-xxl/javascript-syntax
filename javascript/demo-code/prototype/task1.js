let dictionary = Object.create(null);

// 你的添加 dictionary.toString 方法的代码

// 添加一些数据
dictionary.apple = "Apple";
dictionary.__proto__ = "test"; // 这里 __proto__ 是一个常规的属性键

// 在循环中只有 apple 和 __proto__
for(let key in dictionary) {
  console.log(key); // "apple", then "__proto__"
}

dictionary.toString = function(){
    let str=""
    for(let key in dictionary) {
        str = str+key+",";
        return str;
    }
}

// 你的 toString 方法在发挥作用
console.log(dictionary); // "apple,__proto__"