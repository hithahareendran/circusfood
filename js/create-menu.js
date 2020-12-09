function createNavigation() {

    let fragment = document.createDocumentFragment();
    let nav = $("<nav>");
    nav.addClass("navbar navbar-dark bg-dark navbar-expand-md");
    let brand = $("<a>");
    brand.addClass("navbar-brand");
    brand.attr("href", "index.html");
    let brandImg = $("<img>");
    brandImg.addClass("d-inline-block align-top");
    brandImg.attr("src", "img/logo2.png");
    $('body').prepend(nav);
}