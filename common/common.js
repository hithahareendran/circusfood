
// Loads the navbar and sets the active link for the page.
// Placement, add a div in your body: <div class= "nav_container"></div> 
$(".nav_container").load("./common/common.html #ourNavbar", function(){
    $('#navbarSupportedContent a[href="' + location.pathname.split("/").slice(-1)[0] + '"]').addClass("active");
});
//ToDo: set the footer