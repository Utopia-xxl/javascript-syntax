/**
 * 创建一个有三个方法的 calculator 对象：
 * read() 提示输入两个值，并将其保存为对象属性。
 * sum() 返回保存的值的和。
 * mul() 将保存的值相乘并返回计算结果。
 */


 let calculator = {
    num1: 0,
    num2: 0,
  };
calculator.read = function(){
    this.num1 = +prompt("a=");
    this.num2 = +prompt("b=");
},
calculator.sum = function(){
    console.log(typeof this.num1);
    return this.num1+this.num2;
}
calculator.mul = function(){
    return this.num1*this.num2;
}
  
  calculator.read();
  console.log( calculator.sum() );
  console.log( calculator.mul() );