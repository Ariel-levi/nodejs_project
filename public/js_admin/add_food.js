window.onload = () => {
  declareEvents();
}

const declareEvents = () => {
  let id_form = document.querySelector("#id_form");
  id_form.addEventListener("submit", (e) => {
    // אמנע ממנו לשגר את עצמו בברירת מחדל
    e.preventDefault();
    let body = {
      name:document.querySelector("#id_name").value,
      cal:document.querySelector("#id_cal").value,
      price:document.querySelector("#id_price").value
    }
    let url = "http://localhost:3000/foods";
    fetch(url, {
      method:"POST",
      body:JSON.stringify(body),
      headers: { 'content-type': "application/json"
     }
    }
    )
    .then(resp => resp.json())
    .then(data => {
      if(data._id){
        alert("success");
        // משגר לעמוד באותו טאב
        window.location.href = "admin.html"
      }

      console.log(data);
    })
    
    
    console.log(body)
    console.log("Work form")
  })
}