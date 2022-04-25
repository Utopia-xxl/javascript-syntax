class Animal {
    constructor(name) {
      this.speed = 0;
      this.name = name;
    }
    run(speed) {
      this.speed = speed;
      console.log(`${this.name} runs with speed ${this.speed}.`);
    }
    stop() {
      this.speed = 0;
      console.log(`${this.name} stands still.`);
    }
  }
  
  let animal = new Animal("My animal");
  class Rabbit extends Animal {
      // 如果没有constructor，会默认调用父类的constructir并传递所有的参数
      /**
       *constructor(...args) {
       *  super(...args);
       *}
       */
      // 如果继承类有constructor，则必须在使用this之前就调用super()
      
    hide() {
      console.log(`${this.name} hides!`);
    }
    stop() {
        super.stop(); // 调用父类的 stop
        this.hide(); // 然后 hide
    }
  }
  
  let rabbit = new Rabbit("White Rabbit");
  
  rabbit.run(5); // White Rabbit runs with speed 5.
  rabbit.hide(); // White Rabbit hides!