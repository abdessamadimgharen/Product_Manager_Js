let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let submit = document.getElementById("submit");

let mood = "create";
let tmp;
price.addEventListener("keyup", getTotal);
taxes.addEventListener("keyup", getTotal);
ads.addEventListener("keyup", getTotal);
discount.addEventListener("keyup", getTotal);

// get getTotal
function getTotal() {
  if (price.value != "") {
    let result = +price.value + +taxes.value + +ads.value - +discount.value;
    total.innerHTML = result;
  } else {
    total.innerHTML = 0;
  }
}
getTotal();

// save localstorage & create product
let dataProducts = localStorage.getItem("products")
  ? JSON.parse(localStorage.getItem("products"))
  : [];

submit.addEventListener("click", () => {
    let product = {
      title: title.value.toLowerCase(),
      price: price.value,
      taxes: taxes.value,
      ads: ads.value,
      discount: discount.value,
      total: total.innerHTML,
      count: count.value,
      category: category.value.toLowerCase(),
    };
    // count
    if (title.value != "" && price.value != ""  && count.value < 100) {
      if (mood === "create") {
        if (product.count > 1) {
          for (let i = 0; i < count.value; i++) {
            dataProducts.push(product);
          }
        } else {
          dataProducts.push(product);
        }
      } else {
        dataProducts[tmp] = product;
        mood = "create";
        submit.innerHTML = "Create";
        count.style.display = "block";
      }
      localStorage.setItem("products", JSON.stringify(dataProducts));
      clearData();
    }
  drawProducts();
});

// clear inputs
function clearData() {
  title.value = "";
  price.value = "";
  taxes.value = "";
  ads.value = "";
  discount.value = "";
  total.innerHTML = "";
  count.value = "";
  category.value = "";
}

// read
let tbody = document.getElementById("tbody");

function drawProducts() {
  getTotal();
  let table = "";
  for (let i = 0; i < dataProducts.length; i++) {
    table += `
            <tr>
                <td>${i+1}</td>
                <td>${dataProducts[i].title}</td>
                <td>${dataProducts[i].price}</td>
                <td>${dataProducts[i].taxes}</td>
                <td>${dataProducts[i].ads}</td>
                <td>${dataProducts[i].discount}</td>
                <td>${dataProducts[i].category}</td>
                <td>${dataProducts[i].total}</td>
                <td><button id="updates" onclick="updateProduct(${i})">update</button></td>
                <td><button id="delete" onclick="deleteProduct(${i})">delete</button></td>
            </tr>
    `;
  }
  tbody.innerHTML = table;
  let btnDelete = document.getElementById("deleteAll");
  if (dataProducts.length > 0) {
    btnDelete.innerHTML = `
            <button onclick="removeProducts()">Delete All (${dataProducts.length})</button>
        `;
  } else {
    btnDelete.innerHTML = "";
  }
}
drawProducts();

// delete
function deleteProduct(id) {
  dataProducts.splice(id, 1);
  localStorage.products = JSON.stringify(dataProducts);
  drawProducts();
}

function removeProducts() {
  localStorage.clear();
  dataProducts.splice(0);
  drawProducts();
}

// update
function updateProduct(i) {
  let choosenPro = dataProducts[i];
  title.value = choosenPro.title;
  price.value = choosenPro.price;
  taxes.value = choosenPro.taxes;
  ads.value = choosenPro.ads;
  discount.value = choosenPro.discount;
  getTotal();
  count.style.display = "none";
  category.value = choosenPro.category;
  submit.innerHTML = "Update";
  mood = "update";
  tmp = i;
  scroll({
    top: 0,
    behavior: "smooth",
  });
}

// search
let searchMood = "title";

function getSearchMood(id) {
  let inputSearch = document.getElementById("search");
  if (id === "searchTitle") {
    searchMood = "title";
  } else {
    searchMood = "category";
  }
  inputSearch.placeholder = `Search by ${searchMood}`;
  inputSearch.focus();
  inputSearch.value = "";
  drawProducts();
}

function searchProducts(value) {
  let table = "";
  for (let i = 0; i < dataProducts.length; i++) {
    if (searchMood === "title") {
      if (dataProducts[i].title.includes(value.toLowerCase())) {
        table += `
                  <tr>
                      <td>${i+1}</td>
                      <td>${dataProducts[i].title}</td>
                      <td>${dataProducts[i].price}</td>
                      <td>${dataProducts[i].taxes}</td>
                      <td>${dataProducts[i].ads}</td>
                      <td>${dataProducts[i].discount}</td>
                      <td>${dataProducts[i].category}</td>
                      <td>${dataProducts[i].total}</td>
                      <td><button id="updates" onclick="updateProduct(${i})">update</button></td>
                      <td><button id="delete" onclick="deleteProduct(${i})">delete</button></td>
                  </tr>
              `;
      }
    } else {
      if (dataProducts[i].category.includes(value.toLowerCase())) {
        table += `
              <tr>
                  <td>${i+1}</td>
                  <td>${dataProducts[i].title}</td>
                  <td>${dataProducts[i].price}</td>
                  <td>${dataProducts[i].taxes}</td>
                  <td>${dataProducts[i].ads}</td>
                  <td>${dataProducts[i].discount}</td>
                  <td>${dataProducts[i].category}</td>
                  <td>${dataProducts[i].total}</td>
                  <td><button id="updates" onclick="updateProduct(${i})">update</button></td>
                  <td><button id="delete" onclick="deleteProduct(${i})">delete</button></td>
              </tr>
          `;
      }
    }
  }
  tbody.innerHTML = table;
}


// clean data
