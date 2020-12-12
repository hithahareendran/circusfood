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
        "Contact Us":"contact-us.html"
    };
    const path = location.pathname;
    const navLink = path.substring(1).slice(path.lastIndexOf('/'))
    //navLink = navLink.charAt(0).toUpperCase() + navLink.slice(1); // URL without .html
    //console.log('type of path ', typeof(location.pathname));
    console.log('navLink ', navLink);
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
    };
    brandImg.appendTo(brand);
    brand.appendTo(nav);
    navbarToggler.appendTo(nav);
    ul.appendTo(navbarSupportedContent);
    navbarSupportedContent.appendTo(nav);
    $('body').prepend(nav);
}
