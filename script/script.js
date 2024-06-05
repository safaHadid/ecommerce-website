let productDiv = document.querySelector(".product");
let filterDiv = document.querySelector(".filter-btns");
// let checkCat = ["men's clothing" , "jewelery" , "electronics" , "women's clothing"]
// console.log(checkCat.includes("jewelery"));
let allCat = [];

let displayProducts = async (allCheckCat=[]) => {
  productDiv.innerHTML = "";
  
  let product = await fetch("https://fakestoreapi.com/products");
  let finalProduct = await product.json();
  finalProduct.forEach((element) => {

    // for category buttons
    if (!allCat.includes(element.category)) {
      allCat.push(element.category);
      filterDiv.innerHTML += `
        <label class = "m-3 d-block">
        <input type="checkbox" value="${element.category}" class = "mx-2" onclick = "categoryFilter()">${element.category}
        </label>
    `;
    } else {
      allCat.push(element.category);
    }

    if(allCheckCat.length==0){
      allCheckCat = allCat;
    }

    if(allCheckCat.includes(element.category)){
    // Products display
    productDiv.innerHTML += `
    <div class="col-md-6 col-lg-4 p-4">
            <div class="card productItems">
                <div class="card-body text-center">
                  <img src=${element.image} class="img-fluid item-img">
                  <p class="title mt-2 text-start">${element.category}</p>
                  <p class="price text-warning mt-4 text-start"> $${element.price}</p>
                  <p class="desc mt-2 text-start">${element.title}</p>
                </div>
                <div class="card-footer text-center">
                  <button class="btn px-5 add-to-cart-btn mx-2">Add to cart</button>
                </div>
            </div>
     </div>
    `;
  }


  });



  var quantityInputs = document.getElementsByClassName('cart-quantity-input')
    for (var i = 0; i < quantityInputs.length; i++) {
        var input = quantityInputs[i]
        input.addEventListener('change', quantityChanged)
    }


  var addToCartButtons = document.getElementsByClassName('add-to-cart-btn')
  for (var i = 0; i < addToCartButtons.length; i++) {
      var button = addToCartButtons[i]
      button.addEventListener('click', addToCartClicked)
  }

  var removeCartItemButtons = document.querySelectorAll('.remove-item');
    for (var i = 0; i < removeCartItemButtons.length; i++) {
      var button = removeCartItemButtons[i]
      button.addEventListener('click', function(){
      });
  }


  if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
  } else {
      ready()
  }




};

displayProducts();


console.log(productDiv);


if (document.readyState == 'loading') {
  document.addEventListener('DOMContentLoaded', ready)
} else {
  ready()
}

   document.getElementsByClassName('btn-purchase')[0].addEventListener('click', purchaseClicked)

  function ready() {

    var removeCartItemButtons = document.querySelectorAll('.remove-item');
    for (var i = 0; i < removeCartItemButtons.length; i++) {
      var button = removeCartItemButtons[i]
      button.addEventListener('click', removeCartItem);
  }
  
  
    var quantityInputs = document.getElementsByClassName('cart-quantity-input')
    for (var i = 0; i < quantityInputs.length; i++) {
        var input = quantityInputs[i]
        input.addEventListener('change', quantityChanged)
    }
  
    var addToCartButtons = document.getElementsByClassName('add-to-cart-btn')
    for (var i = 0; i < addToCartButtons.length; i++) {
        var button = addToCartButtons[i]
        button.addEventListener('click', addToCartClicked)
    }

  }


let categoryFilter = () => {
   let checkInputs = document.querySelectorAll('input[type="checkbox"]');
   let checkData = [] ;
   checkInputs.forEach((e) => {
    if(e.checked){
      checkData.push(e.value);
    }
   });
  displayProducts(checkData);
}


function updateCartTotal() {
  var cartItemContainer = document.getElementsByClassName('cart-items')[0]
  var cartRows = document.getElementsByClassName('item')
  // console.log(cartItemContainer , cartRows);
  var total = 0
  for (var i = 0; i < cartRows.length; i++) {
      var cartRow = cartRows[i]
      var priceElement = cartRow.getElementsByClassName('cart-price')[0]
      var quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0]
      var price = parseFloat(priceElement.innerText.replace('$', ''))
      var quantity = quantityElement.value
      total = total + (price * quantity)
  }
  total = Math.round(total * 100) / 100
  document.getElementsByClassName('cart-total-price')[0].innerText = '$' + total
}


function purchaseClicked() {
  alert('Thank you for your purchase')
  var cartItems = document.getElementsByClassName('list-cart')[0]
  while (cartItems.hasChildNodes()) {
      cartItems.removeChild(cartItems.firstChild)
  }
  updateCartTotal()
}


function removeCartItem(event) {
  var buttonClicked = event.target;
  buttonClicked.parentElement.remove();
  updateCartTotal();
}


function quantityChanged(event) {
  var input = event.target
  if (isNaN(input.value) || input.value <= 0) {
      input.value = 1
  }
  updateCartTotal()
}


function addToCartClicked(event) {
    var button = event.target
    var shopItem = button.parentElement.parentElement
    // console.log(shopItem);
    var title = shopItem.getElementsByClassName('desc')[0].innerText
    var price = shopItem.getElementsByClassName('price')[0].innerText
    var imageSrc = shopItem.getElementsByClassName('item-img')[0].src
    // console.log(title , price , imageSrc);
    addItemToCart(title, price, imageSrc)
    updateCartTotal();
}


function addItemToCart(title, price, imageSrc) {
  var cartRow = document.createElement('div')
  // cartRow.innerText = title
  cartRow.classList.add('item' , 'row')
  // console.log(cartRow);

  var cartItems = document.getElementsByClassName('list-cart')[0]
  var cartItemNames = document.getElementsByClassName('item-name')
   for (var i = 0; i < cartItemNames.length; i++) {
      if (cartItemNames[i].innerText == title) {
          alert('You added this item before')
          return
      }
  }
  
  // console.log(cartItemNames.value);
  var cartRowContents = `
    <div class="item-image col-3">
        <img src=${imageSrc} class="img-fluid text-start" alt="">
        
    </div>
    <div class="item-name text-start col-3 d-none d-sm-block">${title}</div>
    <div class="cart-price col">
        ${price}
    </div>
    <div class="quantity col mx-1">
        
        <input class="cart-quantity-input" type="number" value="1">
    </div>

    <div class="remove-item col-1 px-0">x</div>`
  cartRow.innerHTML += cartRowContents ;

  cartItems.append(cartRow)
  // console.log(cartItems);
  cartRow.getElementsByClassName('remove-item')[0].addEventListener('click', removeCartItem)
  cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChanged)
}










