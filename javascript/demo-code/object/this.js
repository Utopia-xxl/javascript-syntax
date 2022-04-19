let user = {
    firstName: "Ilya",
    sayHi() {
      let arrow = () => {
        
        console.log(this.firstName);
      }
      arrow();
    }
};
let firstName = "xxl";

user.sayHi();
//箭头函数有些特别：它们没有自己的 this。如果我们在这样的函数中引用 this，this 值取决于外部“正常的”函数。