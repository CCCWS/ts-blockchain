const value = document.querySelector("#test-title") as HTMLInputElement;
const btn = document.querySelector("#test-btn") as HTMLButtonElement;

btn.addEventListener("click", () => {
  const ul = document.querySelector("#test-ul") as HTMLUListElement;
  const newList = document.createElement("div");
  newList.innerHTML = value.value;
  ul.appendChild(newList);
});
