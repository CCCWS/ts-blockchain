interface Bird {
  type: "bird";
  flyingSpeed: number;
}

interface Dog {
  type: "dog";
  runningSpeed: number;
}

type Animal = Bird | Dog;

const animal = (animal: Animal) => {
  let speed: number;

  //구별된 유니온
  //타입에 해당 속성을 설명하는 속성을 추가함
  //switch문으로 어떤 타입의 속성을 사용할지 파악함
  switch (animal.type) {
    case "bird":
      speed = animal.flyingSpeed;
      break;

    case "dog":
      speed = animal.runningSpeed;
      break;
  }

  console.log(`${animal.type} ${speed}`);

  //타입이 많아지면 번거로워짐
  //   if ("flyingSpeed" in animal) {
  //     console.log(animal.flyingSpeed);
  //   }
};

animal({ type: "bird", flyingSpeed: 10 });
animal({ type: "dog", runningSpeed: 20 });
