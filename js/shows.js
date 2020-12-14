/* const shows = [
    {id: "1", title: 'Amazing show', description: '', thumb: 'item1.jpeg', rating: 5, price: '900', category: "acrobatic", date: '', artist: '' },
    {id: "2", title: 'Fantastic show', description: '', thumb: 'item1.jpeg', rating: 5, price: '900', category: "acrobatic", date: '', artist: "" },
    {id: "3", title: 'Magic Evening', description: '', thumb: 'item1.jpeg', rating: 5, price: '900', category: "acrobatic", date: '', artist: "" },
    {id: "4", title: 'Show name', description: '', thumb: 'item1.jpeg', rating: 5, price: '900', category: "acrobatic", date: '', artist: "" },
    {id: "5", title: 'Show name', description: '', thumb: 'item1.jpeg', rating: 5, price: '900', category: "acrobatic", date: '', artist: "" },
    {id: "6", title: 'Show name', description: '', thumb: 'item1.jpeg', rating: 5, price: '900', category: "acrobatic", date: '', artist: "" },
    {id: "7", title: 'Shown name', description: '', thumb: 'item1.jpeg', rating: 5, price: '900', category: "acrobatic", date: '', artist: "" },
    {id: "8", title: 'Show name', description: '', thumb: 'item1.jpeg', rating: 5, price: '900', category: "acrobatic", date: '', artist: "" }
]; */
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
        let link = $(`<a href="#" class="nav-link mb-3 p-3 shadow" id="${c.name}" onclick="openTab(event, '${c.name}-content')">`);
        const icon = $(c.icon);
        console.log('name ', c.name);
        const span = $('<span>'+c.name+'</span>');
        
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
// using modules
window.openTab = openTab;


$(document).ready(function() {
    console.log('document loaded');
    
    addShows();
    categoriesAsTabs(categories)
    $("#calendar").html(calendar());
    //$("#main").click();
}); 
    