//! -------- Global Varaible ---------
var productNameInput = document.getElementById('productName'); //Input kolo
var productPriceInput = document.getElementById('productPrice'); //Input kolo
var productCategoryInput = document.getElementById('productCategory'); //Input kolo
var productDescriptionInput = document.getElementById('productDescription'); //Input kolo

var searchInput = document.getElementById('searchInput')

var updateBtn = document.getElementById("updateBtn");
var addBtn = document.getElementById('addBtn');
var indexUpdate = 0;
//!---------------------------------------------------

var productContainer = [];

if(localStorage.getItem('products') !=null   ){
    productContainer=JSON.parse(localStorage.getItem('products'));
    displayData();
}

function addProduct(){
    var product = {
        name:productNameInput.value,
        price:productPriceInput.value,
        Category:productCategoryInput.value,
        Desc:productDescriptionInput.value
    }
    productContainer.push(product);

    localStorage.setItem('products', JSON.stringify(productContainer))
    console.log(productContainer);
    displayData()
    clearForm();
}

function clearForm(){
productNameInput.value='';
productPriceInput.value='';
productCategoryInput.value='';
productDescriptionInput.value='';
}

function displayData(){
    var cartona = '';
    for(var i =  0 ; i < productContainer.length; i++){
        cartona += `
        <tr>
        <td>${productContainer[i].name}</td>
        <td>${productContainer[i].price}</td>
        <td>${productContainer[i].Category}</td>
        <td>${productContainer[i].Desc}</td>
        <td>
            <button class="btn btn-outline-warning btn-sm" onclick="setData(${i})" >Update</button>
            <button class="btn btn-outline-danger btn-sm" onclick="deleteProduct(${i})">Delete</button>
        </td>
    </tr>      
        `
    }
    document.getElementById('tableData').innerHTML=cartona;
}


function deleteProduct(elementNumber){
    productContainer.splice(elementNumber , 1)
    localStorage.setItem('products',JSON.stringify(productContainer));
    displayData();
}


function searchProduct(){
    var term = searchInput.value;
    var cartona = '';
    for(var i =  0 ; i < productContainer.length; i++){
        if(productContainer[i].name.toLowerCase().includes(term.toLowerCase())){
        cartona += `
        <tr>
        <td>${productContainer[i].name}</td>
        <td>${productContainer[i].price}</td>
        <td>${productContainer[i].Category}</td>
        <td>${productContainer[i].Desc}</td>
        <td>
            <button class="btn btn-outline-warning btn-sm">Update</button>
            <button class="btn btn-outline-danger btn-sm" onclick="deleteProduct(${i})">Delete</button>
        </td>
    </tr>      
        `
    }
    }
    document.getElementById('tableData').innerHTML=cartona;
}

function setData(index){
    indexUpdate = index; 
    var currentProduct = productContainer[index];
    productNameInput.value = currentProduct.name;
    productPriceInput.value = currentProduct.price;
    productCategoryInput.value=currentProduct.Category;
    productDescriptionInput.value = currentProduct.Desc;

    updateBtn.classList.remove('d-none');
    addBtn.classList.add('d-none')
}


function updateProduct(){
    var product = {
        name:productNameInput.value,
        price:productPriceInput.value,
        Category:productCategoryInput.value,
        Desc:productDescriptionInput.value
    };
    productContainer.splice(indexUpdate,1,product);
    localStorage.setItem('products', JSON.stringify(productContainer))
    displayData();

    updateBtn.classList.add('d-none');
    addBtn.classList.remove('d-none');
    clearForm();
}

