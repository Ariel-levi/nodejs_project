class JsonClass {
    constructor(_parent, _item) {
        this.parent = _parent;
        this.id = _item._id;
        this.name = _item.name;
        this.info = _item.info;
        this.category = _item.category;
        this.price = _item.price;
        this.img_url = _item.img_url;
        this.date_created = _item.date_created;
        this.user_id = _item.user_id;
        this.__v = _item.__v;

    }

    render(){
        let json = document.createElement("div");
        document.querySelector(this.parent).append(json);

        json.innerHTML = `
        <p class="space">{</p>
            <p class="space_data" >"_id": <span>"${this.id}"</span>,</p>
            <p class="space_data" >"name": <span>"${this.name}"</span>,</p>
            <p class="space_data" >"info": <span>"${this.info}"</span>,</p>
            <p class="space_data" >"category": <span>"${this.category}"</span>,</p>
            <p class="space_data" >"price": <span class="color_blue">${this.price}</span>,</p>
            <p class="space_data" >"img_url": <span>"${this.img_url}"</span>,</p>
            <p class="space_data" >"date_created": <span>"${this.date_created}"</span>,</p>
            <p class="space_data" >"user_id": <span>"${this.user_id}"</span>,</p>
            <p class="space_data" >"__v": <span class="color_blue">${this.__v}</span></p>
        <p class="space">},</p>
        `
    }
}

export default JsonClass;


// "_id": "61a8efefce144d516c467888",
// "name": "Mini Lego",
// "info": "50 pieces of mini Lego",
// "category": "Lego",
// "price": 60,
// "img_url": "https://images.pexels.com/photos/4887167/pexels-photo-4887167.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
// "date_created": "2021-12-02T16:10:19.341Z",
// "user_id": "61a607d58ba671ce4e875229",
// "__v": 0