$("document").ready(function () {
    var dayEl = $("#day");
    var formatHour = "HH";
    var formatDay = 'dddd Do MMMM YYYY';

    function updateTime() {
        //sets the date at the top and fills the hour list
        dayEl.text(`${moment().format(formatDay)}`);
    }

    function addHour(timeIn) {
        var rowEl = $("<div>");
        var timeEl = $("<div>");
        var taskEl = $("<div>");
        var buttonEl = $("<button>");
        timeEl.addClass("timeBox");
        taskEl.addClass("taskBox");
        rowEl.addClass("flex-row");
        // set class for past/present/future blocks
        if (moment().format(formatHour) == timeIn) {
            taskEl.addClass("present");
        }
        else if (moment().format(formatHour) > timeIn) {
            taskEl.addClass("past");
        }
        else {
            taskEl.addClass("future");
        }
        taskEl.attr("data-index", (timeIn - 9))
        if (timeIn < 12) {
            timeEl.append(timeIn + "AM");
        }
        else {
            if (timeIn > 12){
                timeIn -= 12;
            }
            timeEl.append(timeIn + "PM");
        }
        buttonEl.text("Save");
        $("section").append(rowEl);
        rowEl.append(timeEl);
        rowEl.append(taskEl);
        rowEl.append(buttonEl);

    }
    function clearCalendar() {
        $("section").empty();
    }

    function fillCalendar() {
        for (var i = 9; i < 18; i++) {
            addHour(i);
        }
    }

    fillCalendar();
    updateTime();
});