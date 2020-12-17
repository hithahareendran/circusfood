import { shows, categories } from './components/shows.js';
import { calendar } from './components/calendar.js';



function addShows() {
    shows.forEach(show => {
        const list = $('#showList');
        const template = document.getElementById('template-show-item');
        const instance = document.importNode(template.content, true);
        const category = categories.find(cat => cat.id == show.category);
        console.log('category ', category.name);
        $(instance).find('#title').text(show.title);
        $(instance).find('#category').text(category.name);
        //$(instance).find('#price').text(show.price + 'Kr');
        $(instance).find('#description').text(show.description);
        $(instance).find('#date').text(show.date + ' at ' + show.time);
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
    let category = $(event.target).parent().attr('id').split("-")[1];
    console.log('category ', category);
    $("#add-seatings-" + category).val(event.target.innerText);
    $("#seatings-"+category+"-data").text(event.target.innerText);
    let total = $("#price-"+category).text() * event.target.innerText;
    $("#total-"+category).text(total);  
});

$(".quantity").change(() => {
    let category = $(event.target).parent().parent().attr('id').split("-")[1];
    console.log('category ', category);
    $("#seatings-"+category+"-data").text(event.target.value);
    let total = $("#price-"+category).text() * event.target.value;
    $("#total-"+category).text(total);  
    //booking.seatings = $("#seating-quantity").text(event.target.value);
    
});

$(".booking-button").click((e) => {
    const button = $(e.target);
    const show = shows.find(show => show.id == button.attr('data-id'));
    e.stopPropagation();
    let category = button.data('category');
    $("#seatings-" + category).removeClass("d-none");
    $("#" + category).addClass('d-none');


    booking.price = show[category];

    let rows = $(`
        
            <tr>
                
                <th>Category</th>
                
                <th>Seatings</th>
                <th>Price</th>
                <th>Total</th>
            </tr>    
        
        
        
            <tr>
                
                <td>${category}</td>
                
                <td id="seatings-${category}-data"></td>
                <td id="price-${category}">${booking.price}</td>
                <td id="total-${category}"></td>
            </tr>
        
        `);
    rows.appendTo(`#${category}-seatings`);
    //$("#seatings-"+category).append(table);
    let removeCategoryButton = $('<button class="btn button rounded mt-2">Empty this category</button>').click((e) => {
        //$(e.target).siblings('table').remove();

        $(`#${category}-seatings`).empty();
        console.log('seatings ', $("#" + category + "-seatings").text());
        $(e.target).remove();
        console.log('empty btn ', $(e.target));
        $("#seatings-" + category).addClass('d-none');
        $("#" + category).removeClass('d-none');
        $("#add-seatings-" + category).val(7);

    })
    $("#seatings-" + category).append(removeCategoryButton);


});


let showModal = document.getElementById('showModal');

showModal.addEventListener('show.bs.modal', function (event) {
    
    event.stopPropagation();
    let button = event.relatedTarget
    
    let showId = button.getAttribute('data-bs-id');
    let show = shows.find(show => show.id == showId);
    $('.booking-button').attr('data-id', showId);
    console.log('show ', show);
    console.log('showId', showId);
    
    $("#gold-price").text(show.gold + " Kr");
    $("#silver-price").text(show.silver + " Kr");
    $("#bronze-price").text(show.bronze + " Kr");
    let alert = showModal.querySelector('.alert')
    alert.innerHTML = `
        <div class="d-flex justify-content-between">
            <h5>${show.title}</h5>
            <span class="fw-lighter text-end">${show.date} ${show.time}</span>
        </div>
        <article>${show.description}</article>
    `;
    
    $(".go-to-payment").click((e) => {
        //e.preventDefault();
        const orderId = '#' + Math.random().toString(36).substring(5).toUpperCase();
        booking.orderId = orderId;
        booking.image = show.thumb;
        booking.showId = show.id;
        booking.time = show.time;
        booking.date = show.date;
        booking.name = show.title;
        
        const gold = $("#gold-seatings").children().last().children();
        booking.gold.seatings = gold.eq(1).text();
        booking.gold.price = gold.eq(2).text();
        
        const silver = $("#silver-seatings").children().last().children();
        booking.silver.seatings = silver.eq(1).text();
        booking.silver.price = silver.eq(2).text();

        const bronze = $("#bronze-seatings").children().last().children();
        booking.bronze.seatings = bronze.eq(1).text();
        booking.bronze.price = bronze.eq(2).text();

        localStorage.setItem('bookings', JSON.stringify(booking));
    });

    

    
    
});
showModal.addEventListener('hide.bs.modal', function(event) {
    console.log('closing modal');
    
    document.querySelectorAll(".booking-button").forEach(btn => removeEventListener('click', function(){}));

});
//const categories = [...new Set(shows.map(show => show.category))];
console.log('categories ', categories);
function categoriesAsTabs(categories) {
    let ul = $('<ul class="nav nav-pills-custom flex-column">');
    let li = $('<li class="nav-item">');
    li.append(`
            <a href="#" id="main" class="nav-link mb-3 p-3 shadow active tab-item" aria-current="page" 
            onclick="openTab(event, 'all')">All shows</a>
    `);

    ul.append(li);
    categories.forEach(c => {
        let li = $('<li class="nav-item">');
        let link = $(`
                <a href="#" class="d-flex justify-content-between nav-link mb-3 p-3 shadow tab-item" id="${c.name}" 
                onclick="openTab(event, '${c.name}')">
        `);

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
    console.log('tab name ', tabName);
    $('.tab-item').removeClass('active')
    if (tabName == 'all') {
        $(".show-item").attr("style", "");

    } else {     
        $(".show-item").map((index, card) => card.innerText.includes(tabName) ? card.style.display = "block" : card.style.display = "none");
        
    }
    event.currentTarget.className += " active";
}
// using modules
window.openTab = openTab;

var booking = {
    orderId:'', 
    showId: '', 
    name: '', 
    date: '', 
    time: '', 
    image: '', 
    gold: {seatings: '', price: ''}, 
    silver: {seatings: '', price: ''}, 
    bronze: {seatings: '', price: ''}
};

$(document).ready(function() {
    console.log('document loaded');
    addShows();
    categoriesAsTabs(categories)
    $("#calendar").html(calendar());
    //$("#main").click();
}); 
    