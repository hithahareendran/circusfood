function addItemsToMenu() {
    items.forEach(item => {
      let tab = document.getElementById(item.group);
      const template = document.getElementById('template-menu-item');
      const instance = document.importNode(template.content, true)
      instance.getElementById('itemImage').setAttribute('src', 'img/' + item.image);
      if(Number(item.rating) > 3)
      {
        instance.getElementById('discount').innerHTML = "";
      }
      for (let i = 0; i < 5; i++) {
        if (i < item.rating)
          instance.getElementById("stars").innerHTML += ' <a href="#"><i class="fas fa-star"></i></a>';
        else
          instance.getElementById("stars").innerHTML += ' <a href="#"><i class="far fa-star"></i></a>';
      }
      instance.getElementById('name').innerHTML = item.title;
      if(Number(item.rating) > 3)
      {
        instance.getElementById('price').innerHTML = item.price + 'Kr';
      }
      else
      {
          let discountPrice = Math.round(0.67 * Number(item.price));
          instance.getElementById('price').innerHTML = "<span>"+item.price + 'Kr'+"</span> "+discountPrice + 'Kr'+"";
      }
     instance.getElementById("add-to-cart").addEventListener('click', () => addItem(item.id, item.title, item.image, item.price));
     instance.getElementById("remove-from-cart").addEventListener('click', () => removeItem(item.id, item.title, item.image, item.price));
     tab.appendChild(instance);
    })
  }

function removeItem(itemId, itemName, itemImage, itemPrice) {
  var selected = JSON.parse(localStorage.getItem("tab-menu-cart-items"));
  let existingItem = selected.find(item => item.itemId === itemId);
  if (existingItem.count > 0) {
    existingItem.count--;
  }
  localStorage.setItem("tab-menu-cart-items", JSON.stringify(selected));
  refreshItems();
  }

  function addItem(itemId, itemName, itemImage, itemPrice) {
    var selected = JSON.parse(localStorage.getItem("tab-menu-cart-items"));
    let existingItem = selected.find(item => item.itemId === itemId);
    if (existingItem) {
       existingItem.count++;
     }
    else {
      selected.push({ itemId: itemId, itemName: itemName, itemImage: itemImage, itemPrice: itemPrice, count: 1 });
     }
     localStorage.setItem("tab-menu-cart-items", JSON.stringify(selected));
     refreshItems();
  }

  function refreshItems()
  {
    
  }


  window.onload = () => {
    addItemsToMenu();
  }