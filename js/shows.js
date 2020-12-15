import { shows, categories } from './components/shows.js';
import { calendar } from './components/calendar.js';



function addShows() {
    shows.forEach(show => {
        const list = $('#showList');
        const template = document.getElementById('template-show-item');
        const instance = document.importNode(template.content, true);
        $(instance).find('#title').text(show.title);
        //$(instance).find('#price').text(show.price + 'Kr');
        $(instance).find('#description').text(show.description);
        $(instance).find('#date').text(show.date);
        //$(instance).find('content').text(show.content);
        $(instance).find('#thumb').attr('src', 'img/' + show.thumb);
        $(instance).find('#modal-button').attr('data-bs-id', show.id);
        /* $(instance).find('#modal-button').click(() => {
            console.log('clicker');
            openModal();
        }); */
        list.append(instance);
    });
}
$(".quantity-button").click(() => {
    //console.log('button clicked ', event.target);
    $("#seating-quantity").text(event.target.innerText);
    $(".seatings").removeClass('d-none');
});
$("#more-seatings-button").click(() => {
    console.log('clicked asd')
    $("#add-seatings").removeClass('d-none');
});

$("#quantity").change(() => {
    console.log($(this).val())
    booking.seatings = $("#seating-quantity").text(event.target.value);
    
});

$("#go-to-payment").click(() => {
    let orderId = '#' + Math.random().toString(36).substring(5).toUpperCase(); 
    let seatings = $("#seating-quantity").text();
    booking.orderId = orderId;
    booking.seatings = seatings;
    localStorage.setItem('order', JSON.stringify(booking));

});


let showModal = document.getElementById('showModal');
showModal.addEventListener('show.bs.modal', function (event) {
    // Button that triggered the modal
    
    let button = event.relatedTarget
    // Extract info from data-bs-* attributes
    let showId = button.getAttribute('data-bs-id');
    let show = shows.find(show => show.id == showId);
    console.log('show ', show);
    console.log('showId', showId);
    // If necessary, you could initiate an AJAX request here
    // and then do the updating in a callback.
    //
    // Update the modal's content.
    let modalTitle = showModal.querySelector('.modal-title')
    let alert = showModal.querySelector('.alert')
    alert.innerHTML = `<h5>${show.title}</h5><p>${show.description}</p>`;
    $('.show-card').removeClass("bg-success");
    
    //$('.booking-button').removeAttr('data-id');
    //$('.booking-button').attr('data-id', showId);
    //$('.booking-button').click(() => console.log(showId));
    
    $(".booking-button").click((e) => {
        const button = $(e.target);
        let seatings = $("#seating-quantity").text();
        let category = button.data('category');
        booking.category = category;
        booking.image = show.thumb;
        booking.price = show[category];
        console.log('show ', show)
        booking.showId = show.id;
        booking.time = show.time
        
        $('.show-card').removeClass("bg-success");
        $("#"+category).addClass("bg-success");
        
        
        
    });
    
    modalTitle.textContent = 'Seating booking for ' + show.date + ' ' + show.time
});
showModal.addEventListener('hide.bs.modal', function(event) {
    console.log('closing modal');
    
    document.querySelectorAll(".booking-button").forEach(btn => removeEventListener('click', function(){}));

});
//const categories = [...new Set(shows.map(show => show.category))];
console.log('categories ', categories);
function categoriesAsTabs(categories) {
    let ul = $('<ul class="nav nav-pills flex-column">');
    let li = $('<li class="nav-item">');
    li.append(`<a href="#" id="main" class="nav-link bg-info mb-3 p-3 shadow active" aria-current="page" onclick="openTab(event, 'main-content')">All shows</a>`);
    ul.append(li);
    categories.forEach(c => {
        let li = $('<li class="nav-item">');
        let link = $(`<a href="#" class="d-flex justify-content-between nav-link mb-3 p-3 shadow" id="${c.name}" onclick="openTab(event, '${c.name}-content')">`);
        const icon = $(c.icon).addClass("rounded-pill");
        icon.attr("width", "60");
        console.log('name ', c.name);
        const span = $('<p>'+c.name+'</p>');
        
        icon.appendTo(link);
        span.appendTo(link);
        console.log('category ', c);
        console.log('link text: ', link.text());
        link.appendTo(li);
        li.appendTo(ul)
    });
    $("#categories").append(ul);

}

function openTab(event, tabName) {
    $(".show-item").attr("style", "");
    var tabContent, tablinks;
    tabContent = $(".tab-content");
    console.log(tabContent);

    tabContent.each((index, tab) => $(tab).css("display", "none"));
    
    tablinks = $(".nav-link");
    tablinks.each((index, link) => $(link).removeClass("active"))
    document.getElementById(tabName).style.display = "block";
    event.currentTarget.className += " active";
    console.log('target ', event.currentTarget);
    return false;
}
// using modules
window.openTab = openTab;

var booking = {orderId:'', showId: '', name: '', time: '', image: '', category: '', seatings: '', price:''};

$(document).ready(function() {
    console.log('document loaded');
    addShows();
    categoriesAsTabs(categories)
    $("#calendar").html(calendar());
    //$("#main").click();
}); 
    