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
        list.append(instance);
    });
}

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

function openTab(event, tabname) {
    $(".show-item").attr("style", "");
    var i, tabcontent, tablinks;
    tabcontent = $(".tab-content");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].css("display", "none");
    }
    tablinks = $(".nav-link");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].removeClass("active");
    }
    document.getElementById(tabname).style.display = "block";
    event.currentTarget.className += " active";
    console.log('target ', event.currentTarget);
    return false;
}
// using modules
window.openTab = openTab;


$(document).ready(function() {
    console.log('document loaded');
    
    addShows();
    categoriesAsTabs(categories)
    $("#calendar").html(calendar());
    //$("#main").click();
}); 
    