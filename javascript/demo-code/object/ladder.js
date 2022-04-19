let ladder = {
    step: 0,
    up() {
      this.step++;
      return this;
    },
    down() {
      this.step--;
      return this;
    },
    showStep: function() { // 显示当前的 step
      console.log( this.step );
      return this;
    }
  };
ladder.up().up().down().showStep().down().showStep(); // 展示 1，然后 0
