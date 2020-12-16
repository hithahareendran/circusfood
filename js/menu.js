
//https://www.w3schools.com/tags/tag_template.asp
//gets the menu template and modify value,  and add to the tab with the same group name
function addItemsToMenu() {
  items.forEach(item => {
    let tab = document.getElementById(item.group);
    const template = document.getElementById('template-menu-item');
    const instance = document.importNode(template.content, true)
    instance.getElementById('name').innerHTML = item.title;
    instance.getElementById('price').innerHTML = item.price + 'Kr';
    instance.getElementById('info').innerHTML = item.info;
    instance.getElementById('content').innerHTML = item.content;
    instance.getElementById('itemImage').setAttribute('src', 'img/' + item.image);
    instance.getElementById("order").addEventListener('click', () => order(item.id, item.title, item.image, item.price));
    for (let i = 0; i < 5; i++) {
      if (i < item.rating)
        instance.getElementById("stars").innerHTML += ' <a href="#"><i class="fas fa-star"></i></a>';
      else
        instance.getElementById("stars").innerHTML += ' <a href="#"><i class="far fa-star"></i></a>';
    }

    tab.appendChild(instance);
  })
}

//save item to local storage when order button press
function order(itemId, itemName, itemImage, itemPrice) {
  //get or intialize cart from local storage
  var selected = JSON.parse(localStorage.getItem("menu-cart-items"));

  //check if item exist, increase count or add item
  let existingItem = selected.find(item => item.itemId === itemId);
  if (existingItem) {
    existingItem.count++;
  }
  else {
    selected.push({ itemId: itemId, itemName: itemName, itemImage: itemImage, itemPrice: itemPrice, count: 1 });
  }
  //reset the selected item on local storage
  localStorage.setItem("menu-cart-items", JSON.stringify(selected));

  fillCart();
  return false;
}

// get the items from local storage and add to cart
function fillCart() {
  //get or intialize cart from local storage
  var selected = JSON.parse(localStorage.getItem("menu-cart-items"));
  if (selected === null) {
    selected = [];
    localStorage.setItem("menu-cart-items", JSON.stringify(selected));
  }

  //clean the cart
  document.getElementById('itemList').innerHTML = "";
  // document.getElementById("checkout-button").className = 'btn btn-primary invisible button';
 
  let total=0, totalcount=0;
  //add each menu item to cart
  selected.forEach(item => {
    const template = document.getElementById('template-cart-item');
    const instance = document.importNode(template.content, true)
    instance.getElementById('itemName').innerHTML = item.itemName;
    instance.getElementById('itemCount').innerHTML = item.count;
    instance.getElementById('itemPrice').innerHTML = item.itemPrice + 'kr';
    instance.getElementById('itemImage').setAttribute('src', 'img/' + item.itemImage);
    instance.getElementById("itemAdd").addEventListener('click', (event) => addCount(item.itemId));
    instance.getElementById("itemRemove").addEventListener('click', (event) => removeCount(item.itemId));
    document.getElementById('itemList').appendChild(instance);
    document.getElementById("checkout-button").className = 'btn btn-primary visible button';
    total += (Number(item.itemPrice) * item.count);
    totalcount += item.count;
  })

  if (!selected || !selected.length)
  {
    document.getElementById('itemList').innerHTML = '<li class="list-group-item"><div>Empty</div></li>';
  }
  else{
    const template = document.getElementById('template-cart-item');
    const instance = document.importNode(template.content, true)
    instance.getElementById('itemName').innerHTML = "<b>Total</b>";
    instance.getElementById('itemCount').innerHTML = totalcount;
    instance.getElementById('itemPrice').innerHTML = total + 'kr';
    instance.getElementById('itemImage').style.display = "none";
    instance.getElementById('itemAdd').style.display = "none";
    instance.getElementById('itemRemove').style.display = "none";
    document.getElementById('itemList').appendChild(instance);
  }
  

}

//increase the count of the item on local storage
function addCount(itemId) {
  var selected = JSON.parse(localStorage.getItem("menu-cart-items"));
  let existingItem = selected.find(item => item.itemId === itemId);
  existingItem.count++;
  localStorage.setItem("menu-cart-items", JSON.stringify(selected));
  fillCart();
}

//remove or reduce the item count on local storage
function removeCount(itemId) {
  var selected = JSON.parse(localStorage.getItem("menu-cart-items"));
  let existingItem = selected.find(item => item.itemId === itemId);
  if (existingItem.count === 1) {
    selected = selected.filter(item => item.itemId !== itemId);
  }
  else {
    existingItem.count--;
  }
  localStorage.setItem("menu-cart-items", JSON.stringify(selected));
  fillCart();
}

//filter by checking if card content includes the value, and if not hide.
function filterIngrediants(event) {
  let input = event.target.value.toUpperCase();
  var i, cards = document.getElementsByClassName("menu-item");

  for (i = 0; i < cards.length; i++) {
    cards[i].style.display = "block";
  }
  for (i = 0; i < cards.length; i++) {
    if (!cards[i].innerText.toUpperCase().includes(input))
      cards[i].style.display = "none";
  }
}

function doCheckout() {
  window.location.assign("/payment.html");
}

//add image to carousel
function addItemToCarousel()
{
  items.forEach(item=>{
    const template = document.getElementById('template-carousel-image');
    const instance = document.importNode(template.content, true)
    instance.getElementById('carousel-image').setAttribute('src', 'img/' + item.image);
    instance.getElementById('carousel-header').innerHTML = item.title;
    // instance.getElementById("hover-container").addEventListener('click', () => orderFavouriteItem(item.id));
    document.getElementById('carousel-'+item.group).appendChild(instance);
  });
}

//calling the initital methods
window.onload = () => {
  createNav();
  // adding menu items to tab content
  addItemsToMenu();
  // calling first tab item as clicked
  document.getElementById("main").click();
  //fill cart from localstorage
  fillCart();
  //add images to carousel with overlay
  addItemToCarousel();
}
