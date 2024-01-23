// The app's feat:

// * Display the current day at the top of the calender when a user opens the planner.
//   * Using a date utility library Day.js to work with date and time

$('#currentDay').text(dayjs().format('dddd, MMMM D'));

// * Present timeblocks for standard business hours when the user scrolls down.

function createTimeBlocks() {
    const container = $('.container');
    for (let hour = 8; hour <=23; hour++) {
        // Need to create time blocks
        const timeClass = getTimeClass (hour);
        const timeBlock = $ (`
        <div id="hour-${hour}" class="row time-block ${timeClass}">
        <div class="col-md-1 hour">
        ${formatHour(hour)}
        </div>
        <textarea class="col-md-10 description"></textarea>
        <button class="col-md-1 saveBtn">
        <i class="fas fa-save"></i>
        </button>
        </div>
        `);

        container.append(timeBlock);
    }
}

// Formatting the hour for display
function formatHour(hour) {
    return dayjs().hour(hour).minute(0).format('HH: mm');
}

// * Color-code each timeblock based on past, present, and future when the timeblock is viewed.

// Checking the hour status/past/present/future

function getTimeClass (hour){
    const currentHour = dayjs().hour();
    if (hour <currentHour) return 'past';
    if (hour === currentHour) return 'present';
    return 'future';
}
// * Allow a user to enter an event when they click a timeblock

$('.time-block').click(function(){
    $(this).find('textarea').focus();
});

// * Save the event in local storage when the save button is clicked in that timeblock.

$('.saveBtn').click(function(){
    const hour = $(this).parent().attr('id');
    const event = $(this).siblings('textarea').val();
    localStorage.setItem(hour, event);
});

// * Persist events between refreshes of a page

$(document).on('click', '.saveBtn', function(){
    const hour = $(this).parent().attr('id');
    const event = $(this).siblings('.description').val();
    localStorage.setItem(hour, event);
});

// loading events from the local storage

function loadEvents() {
    $('.time-block').each(function() {
        const id = $(this).attr('id');
        const event = localStorage.getItem(id);
        if (event) {
            $(this).find('.description').val(event);
        }
    });
}

$(document).ready(function(){
    createTimeBlocks();
    loadEvents();
});
