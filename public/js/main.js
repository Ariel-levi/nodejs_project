import JsonClass from "./jsonClass.js";

window.onload = () => {
    init();
}

const init = () => {
    createDate();
    doApi("toys");
    declareEvents();
}

function createDate() {
    let dt = new Date();
    document.querySelector("#id_year").innerHTML = dt.getFullYear();
}

  
const doApi = async(_urlLink) => {
    let url = `https://ariel-levi-toys-project.herokuapp.com/${_urlLink}`;
    let resp = await fetch(url);
    let data = await resp.json();
    console.log(data);
    createAllJsons(data);
}

  
const createAllJsons = (_arJson) => {
      document.querySelector("#id_parent").innerHTML = " ";
    _arJson.forEach(item => {
      let jsonCreate = new JsonClass("#id_parent",item);
      jsonCreate.render();
    })
}

const declareEvents = () => {
    let btn_all = document.querySelector("#id_all");
    btn_all.addEventListener("click", () => {
        doApi("toys");
    });

    let btn_sort = document.querySelector("#id_sort");
    btn_sort.addEventListener("click", () => {
        doApi("toys/?sort=price");
    });

    let btn_reverse = document.querySelector("#id_reverse");
    btn_reverse.addEventListener("click", () => {
        doApi("toys/?sort=price&r=yes");
    });
    
    let btn_page = document.querySelector("#id_page");
    btn_page.addEventListener("click", () => {
        doApi("toys/?page=1&perPage=5");
    });
    
    let btn_searc = document.querySelector("#id_searc");
    btn_searc.addEventListener("click", () => {
        doApi("toys/?s=lego");
    });

    let btn_cat = document.querySelector("#id_cat");
    btn_cat.addEventListener("click", () => {
        doApi("toys/cat/cars");
    });

    let btn_minMax = document.querySelector("#id_minMax");
    btn_minMax.addEventListener("click", () => {
        doApi("toys/prices/?min=25&max=50");
    });

    let btn_post = document.querySelector("#id_post");
    btn_post.addEventListener("click", () => {
        document.querySelector("#id_parent").innerHTML = `
        <p class="space">{</p>
            <p class="space_data" >"name": <span>"{NAME}"</span>,</p>
            <p class="space_data" >"info": <span>"{INFO}"</span>,</p>
            <p class="space_data" >"category": <span>"{CATEGORY}"</span>,</p>
            <p class="space_data" >"price": <span class="color_blue">{PRICE}</span>,</p>
            <p class="space_data" >"img_url": <span>"{IMG_URL_OPTIONAL}"</span>,</p>
        <p class="space">}</p>
        `;
    });

    let btn_put = document.querySelector("#id_put");
    btn_put.addEventListener("click", () => {
        document.querySelector("#id_parent").innerHTML = `
        <h4>url :: http://localhost:3000/toys/61a87984563d695f10416ae1</h4>
        <br />
        <p>Request Body:</p>
        <br />
        <p class="space">{</p>
            <p class="space_data" >"name": <span>"{NAME}"</span>,</p>
            <p class="space_data" >"info": <span>"{INFO}"</span>,</p>
            <p class="space_data" >"category": <span>"{CATEGORY}"</span>,</p>
            <p class="space_data" >"price": <span class="color_blue">{PRICE}</span>,</p>
            <p class="space_data" >"img_url": <span>"{IMG_URL_OPTIONAL}"</span>,</p>
        <p class="space">}</p>
        <br />
        <p>Response: 201</p>
        <br />
        <p>modifiedCount -> 1</p>

        `;
    });

    let btn_delete = document.querySelector("#id_delete");
    btn_delete.addEventListener("click", () => {
        document.querySelector("#id_parent").innerHTML = `
        <h4>url :: http://localhost:3000/toys/61a87984563d695f10416ae1</h4>
        <br />
        <p>Response:</p>
        <br />
        <p>deletedCount -> 1</p>
        
        `;
    });

    let btn_all_users = document.querySelector("#id_all_users");
    btn_all_users.addEventListener("click", () => {
        document.querySelector("#id_parent_users").innerHTML = `
        <p class="space">{</p>
            <p class="space_data" >"msg": <span>"Users work"</span></p>
        <p class="space">}</p>
        `;
    });

    let btn_info_users = document.querySelector("#id_info");
    btn_info_users.addEventListener("click", () => {
        document.querySelector("#id_parent_users").innerHTML = `
        <p class="space">{</p>
            <p class="space_data" >"_id": <span>"{USER ID}"</span></p>
            <p class="space_data" >"name": <span>"{USER NAME}"</span></p>
            <p class="space_data" >"email": <span>"{USER EMAIL}"</span></p>
            <p class="space_data" >"role": <span>"{USER ROLE}"</span></p>
            <p class="space_data" >"date_created": <span>"{DATE CREATED}"</span></p>
            <p class="space_data" >"__v": <span>"{__v}"</span></p>
        <p class="space">}</p>
        `;
    });

    let btn_registration_users = document.querySelector("#id_registration");
    btn_registration_users.addEventListener("click", () => {
        document.querySelector("#id_parent_users").innerHTML = `
        <br />
        <p>Request Body:</p>
        <br />
        <p class="space">{</p>
            <p class="space_data" >"name": <span>"{USER NAME}"</span></p>
            <p class="space_data" >"email": <span>"{USER EMAIL}"</span></p>
            <p class="space_data" >"password": <span>"{USER PASSWORD}"</span></p>
        <p class="space">}</p>
        <br />
        <p>Response: 201</p>
        <br />
        <p class="space">{</p>
            <p class="space_data" >"name": <span>"{USER NAME}"</span></p>
            <p class="space_data" >"email": <span>"{USER EMAIL}"</span></p>
            <p class="space_data" >"password": <span>"Hidden Pass ***"</span></p>
            <p class="space_data" >"role": <span>"{USER ROLE}"</span></p>
            <p class="space_data" >"date_created": <span>"{DATE CREATED}"</span></p>
            <p class="space_data" >"_id": <span>"{USER ID}"</span></p>
            <p class="space_data" >"__v": <span>"{__v}"</span></p>
        <p class="space">}</p>
        `;
    });

    let btn_login_users = document.querySelector("#id_login");
    btn_login_users.addEventListener("click", () => {
        document.querySelector("#id_parent_users").innerHTML = `
        <br />
        <p>Request Body:</p>
        <br />
        <p class="space">{</p>
            <p class="space_data" >"email": <span>"{USER EMAIL}"</span></p>
            <p class="space_data" >"password": <span>"{USER PASSWORD}"</span></p>
        <p class="space">}</p>
        <br />
        <p>Response: 201</p>
        <br />
        <p class="space">{</p>
            <p class="space_data" >"token": <span>"{USER TOKEN}"</span></p>
        <p class="space">}</p>
        `;
    });
}
