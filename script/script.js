$("document").ready(function () {
    var formatDay = "dddd Do MMMM YYYY";
    var formatHour = "h A";
    // start and finish time in 24hour format
    var startTime = 9;
    var finishTime = 17;
    var calendarText;

    function addHour(timeIn) {
        var rowEl = $("<div>").addClass("row time-block");
        var timeEl = $("<div>").addClass("hour col-sm-1").text(moment(timeIn, "H").format(formatHour));
        var taskEl = $("<textarea>").addClass("col-sm-10").data("index", timeIn - startTime);
        var buttonEl = $("<button>").addClass("saveBtn col-sm-1").html(`<i class="fas fa-save"></i>`);
        // set class for past/present/future colors
        if (moment().format("H") == timeIn) {
            rowEl.addClass("present");
        }
        else if (moment().format("H") > timeIn) {
            rowEl.addClass("past");
        }
        else {
            rowEl.addClass("future");
        }
        // display saved data
        taskEl.val(calendarText[timeIn - startTime]);
        $(".container").append(rowEl);
        rowEl.append(timeEl, taskEl, buttonEl);
    }

    // sets the date at the top
    function updateTime() {
        $("#currentDay").text(moment().format(formatDay));
    }

    function drawCalendar() {
        $(".container").empty();
        updateTime();
        for (var i = startTime; i <= finishTime; i++) {
            addHour(i);
        }
    }

    function saveCalendar() {
        localStorage.setItem("dayPlanAndrew", JSON.stringify(calendarText));
    }

    function init() {
        calendarText = JSON.parse(localStorage.getItem("dayPlanAndrew"));
        if (!calendarText) {
            calendarText = [];
            for (var i = 0; i < finishTime - startTime; i++) {
                calendarText.push("");
            }
            saveCalendar();
        }
        drawCalendar();
    }

    init();
    $("button").on("click", function () {
        var textElement = $(this).prev();
        calendarText[textElement.data("index")] = textElement.val();
        saveCalendar();
    });
});