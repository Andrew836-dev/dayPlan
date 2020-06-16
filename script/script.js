$("document").ready(function () {
    var dateEl = $("#date");
    var formatDay = 'dddd Do MMMM YYYY';
    var calendarText = [];

    function updateTime() {
        //sets the date at the top and fills the hour list
        dateEl.text(`${moment().format(formatDay)}`);
    }

    function addHour(timeIn) {
        var rowEl = $("<div>");
        var timeEl = $("<div>");
        var taskEl = $("<textarea>");
        var buttonEl = $("<button>");
        rowEl.addClass("flex-row");
        timeEl.addClass("timeBox");
        timeEl.append(moment(timeIn, "HH").format("h A"));
        taskEl.addClass("taskBox");
        // set class for past/present/future blocks
        if (moment().format("HH") == timeIn) {
            taskEl.addClass("present");
        }
        else if (moment().format("HH") > timeIn) {
            taskEl.addClass("past");
        }
        else {
            taskEl.addClass("future");
        }
        taskEl.attr("data-index", (timeIn - 9))
        if (calendarText) {
            taskEl.val(calendarText[timeIn - 9]);
        }
        else {
            taskEl.val("");
        }
        buttonEl.text("Clear");
        $("section").append(rowEl);
        rowEl.append(timeEl);
        rowEl.append(taskEl);
        rowEl.append(buttonEl);

    }
    function clearCalendar() {
        $("section").empty();
    }

    function saveCalendar() {
        $("textarea").each(function (index) {
            calendarText[index] = $(this).val();
        });
        localStorage.setItem("dayPlanAndrew", JSON.stringify(calendarText));
    }

    function loadCalendar() {
        calendarText = JSON.parse(localStorage.getItem("dayPlanAndrew"));
        if (!calendarText) {
            calendarText = ["", "", "", "", "", "", "", "", "", ""]
        }
        fillCalendar();
    }

    function fillCalendar() {
        clearCalendar();
        updateTime();
        for (var i = 9; i < 18; i++) {
            addHour(i);
        }
    }

    loadCalendar();
    $("textarea").on("keyup", function () {
        calendarText[$(this).attr("data-index")] = $(this).val().trim();
        saveCalendar();
    });
    $("button").on("click", function () {
        $(this).prev().val("");
        saveCalendar();
    });
});