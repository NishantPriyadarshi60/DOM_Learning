let items = {
    table1: [],
    table2: [],
    table3: [],
}

displayItems("table1");
displayItems("table2");
displayItems("table3");


async function addOrderdetai() {


    let price = document.getElementById("price-input").value;
    let dish = document.getElementById("dish-name").value;
    let table = document.getElementById("chooseCategory").value;

    let orderDetail = {
        price: price,
        dish: dish,
        table: table
    }
    console.log(orderDetail)

    await axios.post(`https://crudcrud.com/api/28eabd31f31146feb2d5f92fd0842be7/${orderDetail.table}`, orderDetail)

   await displayItems(orderDetail.table);
}

document.getElementById("add-product").addEventListener("submit", function (e) {
    e.preventDefault();
    addOrderdetai();
    
})


async function displayItems(table){
    items[table] = [];
    let { data: orderItems } = await axios.get(`https://crudcrud.com/api/28eabd31f31146feb2d5f92fd0842be7/${table}`)
    console.log(orderItems)

    items[table] = [...orderItems];


    let container = document.getElementById(table)

    let content = document.createElement("div")

    orderItems.forEach(item=>{
        let el = document.createElement("div")
        el.innerHTML = `
        <p>
        Price : ${item.price} <br/>
        Dish : ${items.dish} </br>
        Table : ${item.table} </br>
        <button class="delete-btn" data-id="${item._id}" data-category="${table}" onclick="deleteOrder(event)">Delete</button>
        </p>
        `;
        content.appendChild(el)
    })
     container.innerHTML = content.innerHTML;   

}


// async function deleteOrder(e){
//     let btn = e.target;
//     let id = btn.getAttribute("data-id");
//     let category = btn.getAttribute("data-category");
//     console.log("delete event", id, table)
//     await axios.delete(`https://crudcrud.com/api/53bf176e2e89443e85b60095e89c891c/${table}/${id}`)
//     displayItems(table);
// }



async function deleteOrder(e) {
    let btn = e.target;
    let id = btn.getAttribute("data-id");
    let table = btn.getAttribute("data-category");

    try {
        await axios.delete(`https://crudcrud.com/api/28eabd31f31146feb2d5f92fd0842be7/${table}/${id}`);
        displayItems(table);
    } catch (error) {
        console.error("Error deleting order:", error);
    }
}












