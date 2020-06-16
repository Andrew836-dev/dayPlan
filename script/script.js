$("document").ready(function () {
    var formatDay = 'dddd Do MMMM YYYY';
    var calendarText = [];

    function addHour(timeIn) {
        var rowEl = $("<div>").addClass("row time-block");
        var timeEl = $("<div>").addClass("hour col-sm-1").text(moment(timeIn, "HH").format("h A"));
        var taskEl = $("<textarea>").addClass("col-sm-10").data("index", timeIn - 9);
        var buttonEl = $("<button>").addClass("saveBtn col-sm-1");
        buttonEl.html('<i class="fas fa-save"></i>');
        // set class for past/present/future blocks
        if (moment().format("HH") == timeIn) {
            rowEl.addClass("present");
        }
        else if (moment().format("HH") > timeIn) {
            rowEl.addClass("past");
        }
        else {
            rowEl.addClass("future");
        }
        taskEl.val(calendarText[timeIn - 9]);
        $(".container").append(rowEl);
        rowEl.append(timeEl, taskEl, buttonEl);
    }

    function updateTime() {
        //sets the date at the top and fills the hour list
        $("#currentDay").text(moment().format(formatDay));
    }

    function clearCalendar() {
        $(".container").empty();
    }

    function drawCalendar() {
        clearCalendar();
        updateTime();
        for (var i = 9; i < 18; i++) {
            addHour(i);
        }
    }

    function saveCalendar() {
        localStorage.setItem("dayPlanAndrew", JSON.stringify(calendarText));
    }

    function loadCalendar() {
        calendarText = JSON.parse(localStorage.getItem("dayPlanAndrew"));
        if (!calendarText) {
            calendarText = ["", "", "", "", "", "", "", "", "", ""]
            saveCalendar();
        }
        drawCalendar();
    }

    loadCalendar();
    $("button").on("click", function () {
        var textElement = $(this).prev();
        calendarText[textElement.data("index")] = textElement.val();
        saveCalendar();
    });
});