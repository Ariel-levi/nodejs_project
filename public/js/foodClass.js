class Food{
  constructor(_parent,_item){
    this.parent = _parent;
    this.cal = _item.cal;
    this.img = _item.img;
    this.name = _item.name;
    this.price = _item.price;
  }

  render(){
    let div = document.createElement("div");
    div.className = "col-lg-4 border p-2";
    document.querySelector(this.parent).append(div);

    div.innerHTML = `
    <img src="${this.img}" class="float-start w-25 me-2" alt='${this.name}'>
    <h2>${this.name}</h2>
    <div>Price: ${this.price} nis , 
    Calorise:${this.cal}</div>
    `
  }
}

export default Food;

// cal: 600
// date_created: "2021-11-24T12:06:51.594Z"
// img: "https://images.pexels.com/photos/367915/pexels-photo-367915.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
// name: "Pizza"
// price: 50