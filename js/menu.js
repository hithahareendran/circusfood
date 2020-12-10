const items = [
  { id: "1", title: 'Chicken lingonberry', image: 'item1.jpg', rating: 5, price: '250',content:"chicken, lingonberry, pepper, mustard", info: 'Chicken thighs get a quick roast under a peppery glaze of lingonberry preserves. Whole grain mustard added at the end makes for a sweet and tangy pan sauce. Simple smashed red potatoes and sauteed garlicky spinach round out the colorful meal.', group: "main-cource-menu" },
  { id: "2", title: 'Meatballs', image: 'item2.jpg', rating: 4, price: '175', content:"pork, beef, potatoes, cream", info: 'Swedish meatballs! Meatballs truly are a classic Swedish dish to serve either as an everyday meal or as a more fancy dinner option.', group: "main-cource-menu" },
  { id: "3", title: 'Swedish Kalops', image: 'item3.jpg', rating: 5, price: '265', content:"beef, berries, peppercorns, garlic", info: 'Kalops is a traditional Swedish beef stew that is slowly cooked with vegetables and spices, most notably allspice berries which gives it its distinct flavor. ', group: "main-cource-menu" },
  { id: "4", title: 'Gravlax', image: 'item4.jpg', rating: 3, price: '130', content:"salmon, sugar, dill, pepper", info: 'Gravlax translates to “grave salmon” or “trench salmon” though I like the imagery of “grave salmon” because it gives you full permission to serve this for a Halloween party. Originally, it described salmon that was preserved by burying it in the sand and allowing it to ferment.', group: "main-cource-menu" },
  { id: "5", title: 'Chinese Noodles4', image: 'item1.jpeg', rating: 2, price: '100', content:"salmon, sugar, dill, pepper", info: 'Chinese noodles with chicken and green vegitables made with soya and tomato sause.', group: "main-cource-menu" },
  { id: "6", title: 'Chinese Noodles5', image: 'item1.jpeg', rating: 1, price: '99', content:"salmon, sugar, dill, pepper", info: 'Chinese noodles with chicken and green vegitables made with soya and tomato sause.', group: "main-cource-menu" },

  { id: "7", title: 'veg Noodles', image: 'item1.jpeg', rating: 5, price: '250', content:"salmon, sugar, dill, pepper", info: 'Chinese noodles with chicken and green vegitables made with soya and tomato sause.', group: "veg-cource-menu" },
  { id: "8", title: 'veg Noodles1', image: 'item1.jpeg', rating: 4, price: '175', content:"salmon, sugar, dill, pepper", info: 'Chinese noodles with chicken and green vegitables made with soya and tomato sause.', group: "veg-cource-menu" },
  { id: "9", title: 'veg Noodles2', image: 'item1.jpeg', rating: 5, price: '265', content:"salmon, sugar, dill, pepper", info: 'Chinese noodles with chicken and green vegitables made with soya and tomato sause.', group: "veg-cource-menu" },
  { id: "10", title: 'veg Noodles3', image: 'item1.jpeg', rating: 3, price: '130', content:"salmon, sugar, dill, pepper", info: 'Chinese noodles with chicken and green vegitables made with soya and tomato sause.', group: "veg-cource-menu" },
  { id: "11", title: 'veg Noodles4', image: 'item1.jpeg', rating: 2, price: '100', content:"salmon, sugar, dill, pepper", info: 'Chinese noodles with chicken and green vegitables made with soya and tomato sause.', group: "veg-cource-menu" },
  { id: "12", title: 'veg Noodles5', image: 'item1.jpeg', rating: 1, price: '99', content:"salmon, sugar, dill, pepper", info: 'Chinese noodles with chicken and green vegitables made with soya and tomato sause.', group: "veg-cource-menu" },

  { id: "13", title: 'drink Noodles', image: 'item1.jpeg', rating: 5, price: '250', content:"salmon, sugar, dill, pepper", info: 'Chinese noodles with chicken and green vegitables made with soya and tomato sause.', group: "drink-cource-menu" },
  { id: "14", title: 'drink Noodles1', image: 'item1.jpeg', rating: 4, price: '175', content:"salmon, sugar, dill, pepper", info: 'Chinese noodles with chicken and green vegitables made with soya and tomato sause.', group: "drink-cource-menu" },
  { id: "15", title: 'drink Noodles2', image: 'item1.jpeg', rating: 5, price: '265', content:"salmon, sugar, dill, pepper", info: 'Chinese noodles with chicken and green vegitables made with soya and tomato sause.', group: "drink-cource-menu" },
  { id: "16", title: 'drink Noodles3', image: 'item1.jpeg', rating: 3, price: '130', content:"salmon, sugar, dill, pepper", info: 'Chinese noodles with chicken and green vegitables made with soya and tomato sause.', group: "drink-cource-menu" },
  { id: "17", title: 'drink Noodles4', image: 'item1.jpeg', rating: 2, price: '100', content:"salmon, sugar, dill, pepper", info: 'Chinese noodles with chicken and green vegitables made with soya and tomato sause.', group: "drink-cource-menu" },
  { id: "18", title: 'drink Noodles5', image: 'item1.jpeg', rating: 1, price: '99', content:"salmon, sugar, dill, pepper", info: 'Chinese noodles with chicken and green vegitables made with soya and tomato sause.', group: "drink-cource-menu" },

  { id: "19", title: 'child Noodles', image: 'item1.jpeg', rating: 5, price: '250', content:"salmon, sugar, dill, pepper", info: 'Chinese noodles with chicken and green vegitables made with soya and tomato sause.', group: "child-cource-menu" },
  { id: "20", title: 'child Noodles1', image: 'item1.jpeg', rating: 4, price: '175', content:"salmon, sugar, dill, pepper", info: 'Chinese noodles with chicken and green vegitables made with soya and tomato sause.', group: "child-cource-menu" },
  { id: "21", title: 'child Noodles2', image: 'item1.jpeg', rating: 5, price: '265', content:"salmon, sugar, dill, pepper", info: 'Chinese noodles with chicken and green vegitables made with soya and tomato sause.', group: "child-cource-menu" },
  { id: "22", title: 'child Noodles3', image: 'item1.jpeg', rating: 3, price: '130', content:"salmon, sugar, dill, pepper", info: 'Chinese noodles with chicken and green vegitables made with soya and tomato sause.', group: "child-cource-menu" },
  { id: "23", title: 'child Noodles4', image: 'item1.jpeg', rating: 2, price: '100', content:"salmon, sugar, dill, pepper", info: 'Chinese noodles with chicken and green vegitables made with soya and tomato sause.', group: "child-cource-menu" },
  { id: "24", title: 'child Noodles5', image: 'item1.jpeg', rating: 1, price: '99', content:"salmon, sugar, dill, pepper", info: 'Chinese noodles with chicken and green vegitables made with soya and tomato sause.', group: "child-cource-menu" },
];


 
 //https://www.w3schools.com/tags/tag_template.asp
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
      instance.getElementById("order").addEventListener('click', (event) => order(item.id, item.title, item.image));
      for (let i = 0; i < item.rating; i++)
        instance.getElementById("stars").innerHTML += ' <a href="#"><i class="fa fa-star"></i></a>';
      tab.appendChild(instance);
    })
  }

  var selected = [];
  function order(itemId, itemName, itemImage)
  { 
    let existingItem = selected.find(item=> item.itemId === itemId);
    if(existingItem)
    {
      existingItem.count++;
    }
    else{
      selected.push({itemId: itemId, itemName:itemName, itemImage: itemImage, count:1});
    }

    //clean the cart
    document.getElementById('itemList').innerHTML="";
    //add each menu item to cart
    selected.forEach(item=>{
      const template = document.getElementById('template-cart-item');
      const instance = document.importNode(template.content, true)
      instance.getElementById('itemName').innerHTML = item.itemName;
      instance.getElementById('itemCount').innerHTML = item.count;
      instance.getElementById('itemImage').setAttribute('src', 'img/' + item.itemImage);
      document.getElementById('itemList').appendChild(instance);
    })
  }

  //https://www.w3schools.com/howto/howto_js_vertical_tabs.asp
  function openTab(event, tabname) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tab-content");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("nav-link");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(tabname).style.display = "block";
    event.currentTarget.className += " active";
    return false;
  }

  //filter by checking if card content includes the value, and if not hide.
  function filterIngrediants(event){
    let input = event.target.value;
    var i, cards=document.getElementsByClassName("menu-item");

    for (i = 0; i < cards.length; i++) {
      cards[i].style.display = "block";
    }
    for (i = 0; i < cards.length; i++) {
      if(!cards[i].innerText.includes(input))
        cards[i].style.display = "none";
    }
  }

//calling the initital methods
  window.onload = () => {
      //adding navigation bar
    createNav();
    // adding menu items to tab content
    addItemsToMenu();
    // calling first tab item as clicked
    document.getElementById("main").click();
  }