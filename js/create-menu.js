function createNav() {
    //console.log("createing nav");
    let fragment = document.createDocumentFragment();
    let nav = $("<nav>");
    nav.addClass("navbar navbar-dark bg-dark navbar-expand-md");
    let brand = $("<a>");
    brand.addClass("navbar-brand");
    brand.attr("href", "index.html");
    let brandImg = $("<img>");
    brandImg.addClass("d-inline-block align-top");
    brandImg.attr({ "src": "img/logo2.jpeg", "width":"80"});

    let navbarToggler = $("<button>").addClass("navbar-toggler");
    
    navbarToggler.attr({
        "type": "button", 
        "data-bs-toggle": "collapse", 
        "data-bs-target":"#navbarSupportedContent",
        "aria-controls":"navbarSupportedContent",
        "aria-expanded":"false",
        "aria-label":"Toggle navigation"
    });
    navbarToggler.append('<span class="navbar-toggler-icon"></span>');
    let navbarSupportedContent = $("<div>").addClass("collapse navbar-collapse")
    navbarSupportedContent.attr("id", "navbarSupportedContent");
    let ul = $("<ul>").addClass("navbar-nav me-auto mb-2 mb-lg-0")
    const links = {
        "Home":"index.html", 
        "Shows":"performances.html", 
        "Menu":"menu.html", 
        "Gallery":"gallery.html", 
        "Contact Us":"contact-us.html",
        "About Us":"about-us.html"
    };
    const path = location.pathname;
    const navLink = path.substring(1).slice(path.lastIndexOf('/'))
    //navLink = navLink.charAt(0).toUpperCase() + navLink.slice(1); // URL without .html
    //console.log('type of path ', typeof(location.pathname));
    //return;
    $("nav-link").removeClass('active');
    for( const [key, value] of Object.entries(links) ) {
        let li = $('<li>').addClass("nav-item");
        let link = $('<a>').addClass("nav-link");
        
        link.attr({"href":value, "aria-current": "page"});
        link.text(key)
        if (navLink == value) {
            link.addClass("active");
            console.log('link ', link);
        } 
    
        link.appendTo(li);
        li.appendTo(ul);
    }

    // adding cart to nav bar
    let cart =  $('<div>').addClass("navbar-collapse collapse d-flex  justify-content-end")
    .append($('<ul>').addClass("navbar-nav ml-auto mb-2 mb-lg-0")
        .append($('<li>').addClass("nav-item")
            .append($('<a>').addClass("nav-link").attr('href','payment.html')
                .append($('<i class="fas fa-scroll"></i>'))
                .append('<span id="item-total"> items(0)</span>')
                .append('<br/>')
                .append('<span id="item-price">price 0kr</span>')
                )));

    brandImg.appendTo(brand);
    brand.appendTo(nav);
    navbarToggler.appendTo(nav);
    ul.appendTo(navbarSupportedContent);
    navbarSupportedContent.appendTo(nav);
    nav.append(cart);
    $('body').prepend(nav);

    refreshMenuCart();

}

function refreshMenuCart()
{
    let booking = JSON.parse(localStorage.getItem('bookings'));
    var selected = JSON.parse(localStorage.getItem("menu-cart-items"));
    let total=0, totalCount=0;
    if(booking!==null)
    {
        if(booking.bronze.seatings!=='')
        {
            total+=Number(booking.bronze.seatings)*Number(booking.bronze.price);
            totalCount+=Number(booking.bronze.seatings);
        }
        if(booking.gold.seatings!=='')
        {
            total+=Number(booking.gold.seatings)*Number(booking.gold.price);
            totalCount+=Number(booking.gold.seatings);
        }
        if(booking.silver.seatings!=='')
        {
            total+=Number(booking.silver.seatings)*Number(booking.silver.price);
            totalCount+=Number(booking.silver.seatings);
        }
    }
    if(selected!==null)
    {
        selected.forEach(item =>{
            total+= Number(item.itemPrice) * Number(item.count)
            totalCount+=Number(item.count);
        });
    }
    if(total!==0)
    {
        document.getElementById("item-total").innerHTML = " items("+totalCount+")";
        document.getElementById("item-price").innerHTML = "price "+total+"kr";
        
    }
   
}
