import { init, exit } from "./myPackage";

init({
  url: "TEST",
  debug: true,
});

exit(1);

type Last = <G>(arr: G[]) => G;
const last: Last = (arr) => {
  return arr[arr.length - 1];
};

type Prepend = <G>(arr: G[], item: G) => G[];
const prepend: Prepend = (arr, item) => {
  arr.unshift(item);
  return arr;
};

console.log(last<number>([1, 2, 3, 4]));
console.log(prepend([2, 3, 4], 1));
