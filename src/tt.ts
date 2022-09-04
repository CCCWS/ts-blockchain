var obj = {
  prop: "Hello",
  sayHello: function () {
    console.log(this.prop);
  },
};

var reference = obj.sayHello.bind(obj);
reference(); // undefined
