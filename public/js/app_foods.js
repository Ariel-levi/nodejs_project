import Food from "./foodClass.js"

window.onload = () => {
  init();
}

const init = () => {
  doApi();
}

const doApi = async() => {
  // מדברים עם יו אר אל של השרת נוד ג'יי אס שלנו
  let url = "http://localhost:3000/foods";
  let resp = await fetch(url);
  let data = await resp.json();
  console.log(data);
  createAllFoods(data);
}

const createAllFoods = (_arJson) => {
  _arJson.forEach(item => {
    let food = new Food("#id_row",item);
    food.render();
  })
}