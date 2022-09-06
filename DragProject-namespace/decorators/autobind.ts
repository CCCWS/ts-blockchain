namespace App {
  // .bind()
  // 호출하는 함수에 객체를 bind해주지 않으면 전역 객체로부터 값을 받아오려고 하기 때문에
  // 원하는 값이아닌 다른값을 가지게됨
  function autobind(
    _: any,
    _2: string,
    descriptor: PropertyDescriptor
  ): PropertyDescriptor {
    const originalMethod = descriptor.value;
    const adjDescriptor: PropertyDescriptor = {
      configurable: true,
      get() {
        const boundFn = originalMethod.bind(this);
        return boundFn;
      },
    };
    return adjDescriptor;
  }
}
