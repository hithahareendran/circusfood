import { shows } from './shows.js';
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

export function calendar(year = null, month = null) {
    console.log('year: ', year);
    const dates = shows.map(show => show.date);
    console.log('dates ', dates); 
    let date = year === null ? new Date() : new Date(year, month);
    let daysInMonth = getDaysInMonth(date.getFullYear(), date.getMonth() + 1);
    //console.log('days in month ', daysInMonth);
    let fragment = document.createDocumentFragment();
    let table = $("<table>").addClass("table table-sm table-responsive");
    let caption = $("<caption class='caption-top'>");
    let dateYear = ` ${months[date.getMonth()]} ${date.getFullYear()} `;
    let prevMonth = $('<button class="btn btn-outline-info change-month"><i class="fas fa-arrow-circle-left"></i>');
    let nextMonth = $('<button class="btn btn-outline-info change-month"><i class="fas fa-arrow-circle-right"></i>');
    nextMonth.click(function() {
        console.log('change month');
        $("#calendar").empty();
        $("#calendar").html(calendar(date.getFullYear(), date.getMonth() + 1)); 
    })
    prevMonth.click(function () {
        console.log('change month');
        $("#calendar").empty();
        $("#calendar").html(calendar(date.getFullYear(), date.getMonth() - 1));
    })
    caption.prepend(prevMonth);
    caption.append(dateYear);
    caption.append(nextMonth);
    table.append(caption);
    let heading = $("<thead>");
    heading.append("<tr>").addClass("font-monospace");
    weekDays.forEach(day => heading.append(`<th>${day}</th>`));
    
    heading.appendTo(table)
    table.appendTo("#calendar");
    
    // Set Sunday to last day in week (7)
    let dayInWeek = date.getDay() == 0 ? 7 : date.getDay();
    console.log("day in week ", dayInWeek);
    for (let i = 1; i < daysInMonth + dayInWeek; i++) {
        
        if (i % 7 == 1 || i == 1) {
            $("<tr class='text-center'>").appendTo(table);            
            if (i < dayInWeek )
                $("<td>").appendTo($('tr').last());
            else 
                $("<td>" + (i + 1 - dayInWeek) + "</td>").appendTo($('tr').last());
        } else {
            if (i < dayInWeek )
                $("<td>").appendTo($('tr').last());
            else 
                $("<td>" + (i + 1 - dayInWeek) + "</td>").appendTo($('tr').last());
        }
        if (dates.includes( getDateString(date, i) )) {
            console.log('date string: ', getDateString(date, i));
            $("td").last().addClass("bg-info text-white border-2 show-date");
            $("td").last().click(function() {
                filterShowsByDate(getDateString(date, i));
            });
        } 
        
    }
    
    //$("#calendar").append(fragment);
}
function filterShowsByDate(date) {
    $(".show-item").map((index, card) => {
        //console.log('show ', card);
        card.innerText.includes(date) ? card.style.display = "block" : card.style.display = "none";
    })
    console.log('filter date: ', date);
}
const getDaysInMonth = function (year, month) {
    console.log(year, month);
    return new Date(year, month, 0).getDate();
};
const getDateString = function(d, i) {
    return `${d.getFullYear()}-${d.getMonth() < 10 
        ? '0' + (d.getMonth() + 1) 
        : d.getMonth() + 1}-${i + 1 < 10 ? '0' + i : i}`;
};