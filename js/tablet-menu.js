function addItemsToMenu() {
  //get or intialize cart from local storage
  var selected = JSON.parse(localStorage.getItem("tab-menu-cart-items"));
  if (selected === null) {
    selected = [];
    localStorage.setItem("tab-menu-cart-items", JSON.stringify(selected));
  }

  items.forEach(item => {
    let tab = document.getElementById(item.group);
    tab.innerHTML="";
  });

  items.forEach(item => {
    let tab = document.getElementById(item.group);
    const template = document.getElementById('template-menu-item');
    const instance = document.importNode(template.content, true)
    instance.getElementById('itemImage').setAttribute('src', 'img/' + item.image);
    if (Number(item.rating) > 3) {
      instance.getElementById('discount').innerHTML = "";
    }
    for (let i = 0; i < 5; i++) {
      if (i < item.rating)
        instance.getElementById("stars").innerHTML += ' <a href="#"><i class="fas fa-star"></i></a>';
      else
        instance.getElementById("stars").innerHTML += ' <a href="#"><i class="far fa-star"></i></a>';
    }
    instance.getElementById('name').innerHTML = item.title;
    let finalPrice = 0;
    if (Number(item.rating) > 3) {
      instance.getElementById('price').innerHTML = item.price + 'Kr';
      finalPrice = item.price;
    }
    else {
      let discountPrice = Math.round(0.67 * Number(item.price));
      instance.getElementById('price').innerHTML = "<span>" + item.price + 'Kr' + "</span> " + discountPrice + 'Kr' + "";
      finalPrice = discountPrice;
    }
    let existingItem = selected.find(element => element.itemId === item.id);
    let count = existingItem ? existingItem.count : 0;
    instance.getElementById("item-count-div").innerHTML = "<label id='" + item.id + "' > " + count + " </label>";
    instance.getElementById("add-to-cart").addEventListener('click', () => addItem(item.id, item.title, item.image, finalPrice));
    instance.getElementById("remove-from-cart").addEventListener('click', () => removeItem(item.id, item.title, item.image, finalPrice));
    instance.getElementById("modal-link").addEventListener('click', () => openItemOnModal(item,finalPrice));
    tab.appendChild(instance);
  })
}


function openItemOnModal(item, price)
{
  var myModal = new bootstrap.Modal(document.getElementById('show-item'), {
  })
  myModal.show();

  document.getElementById('modal-name').innerHTML = item.title;
  document.getElementById('modal-price').innerHTML = price + 'Kr';
  document.getElementById('modal-info').innerHTML = item.info;
  document.getElementById('modal-content').innerHTML = item.content;
  document.getElementById('modal-itemImage').setAttribute('src', 'img/' + item.image);
  document.getElementById("modal-stars").innerHTML = "";
     for (let i = 0; i < 5; i++) {
      if (i < item.rating)
      document.getElementById("modal-stars").innerHTML += ' <a href="#"><i class="fas fa-star"></i></a>';
      else
      document.getElementById("modal-stars").innerHTML += ' <a href="#"><i class="far fa-star"></i></a>';
    }
}

function removeItem(itemId, itemName, itemImage, itemPrice) {
  var selected = JSON.parse(localStorage.getItem("tab-menu-cart-items"));
  let existingItem = selected.find(item => item.itemId === itemId);
  if (existingItem.count > 0) {
    existingItem.count--;
    document.getElementById(itemId).innerHTML = existingItem.count;
  }
  localStorage.setItem("tab-menu-cart-items", JSON.stringify(selected));
  calculateTotalPrice();
  fillCart();
}

function addItem(itemId, itemName, itemImage, itemPrice) {
  var selected = JSON.parse(localStorage.getItem("tab-menu-cart-items"));
  let existingItem = selected.find(item => item.itemId === itemId);
  if (existingItem) {
    existingItem.count++;
    document.getElementById(itemId).innerHTML = existingItem.count;
  }
  else {
    selected.push({ itemId: itemId, itemName: itemName, itemImage: itemImage, itemPrice: itemPrice, count: 1 });
    document.getElementById(itemId).innerHTML = 1;
  }
  localStorage.setItem("tab-menu-cart-items", JSON.stringify(selected));
  calculateTotalPrice();
  fillCart();
}

function calculateTotalPrice() {
  let total = 0, totalCount = 0;
  var selected = JSON.parse(localStorage.getItem("tab-menu-cart-items"));
  selected.forEach(item => {
      total += (Number(item.itemPrice) * Number(item.count));
      totalCount += item.count;
    });
    document.getElementById("item-total").innerHTML="items("+totalCount+")";
    document.getElementById("item-price").innerHTML="price "+total+" kr";
}

// get the items from local storage and add to cart
function fillCart() {
  //get or intialize cart from local storage
  var selected = JSON.parse(localStorage.getItem("tab-menu-cart-items"));
  if (selected === null) {
    selected = [];
    localStorage.setItem("tab-menu-cart-items", JSON.stringify(selected));
  }

  //clean the cart
  document.getElementById('itemList').innerHTML = "";
  document.getElementById("checkout-button").className = 'btn btn-primary invisible button';
    
  let total=0, totalcount=0;
  //add each menu item to cart
  selected.forEach(item => {
    const template = document.getElementById('template-cart-item');
    const instance = document.importNode(template.content, true)
    instance.getElementById('itemName').innerHTML = item.itemName;
    instance.getElementById('itemCount').innerHTML = item.count;
    instance.getElementById('itemPrice').innerHTML = item.itemPrice + 'kr';
    instance.getElementById('itemImage').setAttribute('src', 'img/' + item.itemImage);
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
    document.getElementById('itemList').appendChild(instance);
  }


}

function doCheckout()
{
  alert('Thank you for ordering, your order successfullty placed');
  var selected = JSON.parse(localStorage.getItem("tab-menu-cart-items"));
  selected.forEach(item => document.getElementById(item.itemId).innerHTML = 0);
  localStorage.clear();
  addItemsToMenu();
  calculateTotalPrice();
  fillCart();
}


window.onload = () => {
  addItemsToMenu();
  calculateTotalPrice();
  fillCart();
}