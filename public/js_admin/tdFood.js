class TdFood{
  constructor(_parent,_item , _index){
    this.parent = _parent;
    this.cal = _item.cal;
    this.img = _item.img;
    this.name = _item.name;
    this.price = _item.price;
    this.index = _index;
  }

  render(){
    let tr = document.createElement("tr");
    document.querySelector(this.parent).append(tr);

    tr.innerHTML = `
    <td>${this.index + 1}</td>
    <td>${this.name}</td>
    <td>${this.price} nis</td>
    <td>${this.cal}</td>
    <td>
      <button class="btn btn-danger">Del</button>
      <button class="btn btn-dark">Edit</button>
    </td>
    `
  }

}

export default TdFood;