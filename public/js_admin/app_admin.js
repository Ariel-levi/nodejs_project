import TdFood from "./tdFood.js";

window.onload = () => {
  init();
}

const init = () => {
  doApi();
}

const doApi = async() => {
  let url = "http://localhost:3000/foods";
  let resp = await fetch(url);
  let data = await resp.json();
  console.log(data);
  createTable(data);
}

const createTable = (_arJson) => {
  _arJson.forEach((item,i) => {
    let tr = new TdFood("#id_tbody",item,i);
    tr.render()
  })
}