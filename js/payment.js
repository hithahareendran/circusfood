const cartItems = [
];

//get items from storage, create cart table and add to cart and popup
function initializeCart() {
  //get shows
  let booking = JSON.parse(localStorage.getItem('order'));

  //get or intialize cart from local storage
  var selected = JSON.parse(localStorage.getItem("menu-cart-items"));
  if (selected === null) {
    localStorage.setItem("menu-cart-items", JSON.stringify(cartItems));
    selected = JSON.parse(localStorage.getItem("menu-cart-items"));
  }

  let total = 0;

  //outer template for the table
  const cartTableTemplate = document.getElementById('template-cart-table');
  const cartTable = document.importNode(cartTableTemplate.content, true)

  //reset checkout cart and popup cart
  document.getElementById('checkout-cart').innerHTML = "";
  document.getElementById('checkout-cart-popup').innerHTML = "";

  //if there is booking add it as the first item on the table
  if (booking !== null) {
    console.log(booking);
    const template = document.getElementById('template-cart-item');
    const instance = document.importNode(template.content, true)
    instance.getElementById('itemImage').setAttribute('src', 'img/' + booking.image);
    instance.getElementById('itemName').innerHTML = booking.name + '<br/>' + booking.date+"+"+booking.time;
    instance.getElementById('itemCount').innerHTML = '('+booking.category +')' + booking.seatings;
    instance.getElementById('itemPrice').innerHTML = booking.price + 'kr';
    let vat = (Number(booking.price) / (1 + (1 / 0.2))).toFixed(2);
    instance.getElementById('vat').innerHTML = vat + 'kr';
    total += Number(booking.price);
    instance.getElementById('total').innerHTML = Number(booking.price) + 'kr';
    instance.getElementById('adjust').innerHTML = "<span class='badge bg-secondary rounded-pill' onclick='removeBooking()'><i class='fas fa-trash-alt'></i></span>";
    cartTable.getElementById("cart-body").appendChild(instance);
  }

  // add all menu item to the template
  selected.forEach(item => {
    const template = document.getElementById('template-cart-item');
    const instance = document.importNode(template.content, true)
    instance.getElementById('itemImage').setAttribute('src', 'img/' + item.itemImage);
    instance.getElementById('itemName').innerHTML = item.itemName;
    instance.getElementById('itemCount').innerHTML = item.count;
    instance.getElementById('itemPrice').innerHTML = item.itemPrice + 'kr';
    let vat = (Number(item.itemPrice) / (1 + (1 / 0.2))).toFixed(2);
    instance.getElementById('vat').innerHTML = vat + 'kr';
    let totalPrice = Number(item.itemPrice) * Number(item.count)
    total += totalPrice;
    instance.getElementById('total').innerHTML = totalPrice + 'kr';
    instance.getElementById("itemAdd").addEventListener('click', (event) => addCount(item.itemId));
    instance.getElementById("itemRemove").addEventListener('click', (event) => removeCount(item.itemId));
    cartTable.getElementById("cart-body").appendChild(instance);

  });

  //if the cart has any item add the table to the html cart/popup
  if (selected.length > 0 || booking!==null) {
    document.getElementById('checkout-cart-popup').appendChild(cartTable.cloneNode(true));
    document.getElementById('checkout-cart').appendChild(cartTable);
    document.querySelectorAll('#grand-total').forEach(i => i.innerHTML = total + 'kr');
  }
  else {
    document.getElementById('checkout-cart').innerHTML = "<div>No item ordered</div>";
    document.getElementById('checkout-cart-popup').innerHTML = "<div>No item ordered</div>";
  }

}

function removeBooking()
{
  localStorage.removeItem('order');
  initializeCart();
}

//increase the count of the item on local storage
function addCount(itemId) {
  console.log("here");
  var selected = JSON.parse(localStorage.getItem("menu-cart-items"));
  let existingItem = selected.find(item => item.itemId === itemId);
  existingItem.count++;
  localStorage.setItem("menu-cart-items", JSON.stringify(selected));
  initializeCart();
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
  initializeCart();
}

//programatically adding tab content forms to avoid form validation on all (credit card and swish)
function addTab(tabName) {
  document.getElementById("pills-card").innerHTML = "";
  document.getElementById("pills-swish").innerHTML = "";
  if (tabName === "credit-card") {
    const template = document.getElementById('credit-card-template');
    const instance = document.importNode(template.content, true)
    document.getElementById("pills-card").appendChild(instance);
  }
  else if (tabName === "swish") {
    const template = document.getElementById('swish-template');
    const instance = document.importNode(template.content, true)
    document.getElementById("pills-swish").appendChild(instance);
  }

}

function createAndShowModelPopup() {
  //fix the popup template
  let referenceNo = Math.round(Math.random() * (999999 - 12345) + 12345);
  document.getElementById('checkout-header').innerHTML = 'Your booking reference number #' + referenceNo;
  document.getElementById('thanks-comment').innerHTML = "Thank you for your order "
    + document.getElementById('first-name').value + " " + document.getElementById('last-name').value;
  let comment = document.getElementById('comments').value;
  if (comment.trim() !== "") {
    document.getElementById('special-comments').innerHTML = "<p>special comments - " + comment + "</p>";
  }
  let email = document.getElementById('email').value;
  document.getElementById('email-comment').innerHTML = 'A reciept will be send to email ' + email +
    ' or an sms on number ' + document.getElementById('contact').value + " will be send to you.";


  //show popup
  var myModal = new bootstrap.Modal(document.getElementById('checkout-success'), {
    backdrop: 'static',
    role: 'dialog',
    keyboard: false
  });
  myModal.show();
}

function checkoutComplete() {
  document.getElementById("payment-form").reset();
  window.location.assign("/home.html");
}


window.onload = () => {
  initializeCart();
}


//https://getbootstrap.com/docs/4.0/components/forms/
// Example starter JavaScript for disabling form submissions if there are invalid fields
(function () {
  'use strict';
  window.addEventListener('load', function () {
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = document.getElementsByClassName('needs-validation');
    // Loop over them and prevent submission
    var validation = Array.prototype.filter.call(forms, function (form) {
      form.addEventListener('submit', function (event) {
        event.preventDefault();
        event.stopPropagation();
        if (form.checkValidity() === false) {
          console.log("invalid");
        }
        else {
          var selected = JSON.parse(localStorage.getItem("menu-cart-items"));
          let booking = JSON.parse(localStorage.getItem('order'));
          if (booking!=null || (selected != null && selected.length > 0)) {
            console.log("valid");
            localStorage.clear();
            //create popup and send email
            createAndShowModelPopup();
          }
          else {
            //nothing in cart so no popup and redirect
            window.location.assign("/home.html");
          }
        }

        form.classList.add('was-validated');
      }, false);
    });
  }, false);
})();