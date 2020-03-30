//Non-IT Related

var nbReceivedMarch = 0;
var nbNewResolvedMarch = 0;
var nbResolvedMarch = 0;
var nbInProgressMarch = 0;

//IT Related

var nbReceivedMarchIT = 0;
var nbNewResolvedMarchIT = 0;
var nbResolvedMarchIT = 0;
var nbInProgressMarchIT = 0;

//AVG
var counter = 0;
var processingTime = 0;

var counterIT = 0;
var processingTimeIT = 0;

var dateReceived
var dateResolved

var dateReceivedIT
var dateResolvedIT

var differenceInTime
var differenceInDays

var differenceInTimeIT
var differenceInDaysIT

var averageTime
var averageTimeIT

var totalNew = 0;
var totalNewIT = 0;

var totalResolved = 0;
var totalResolvedIT = 0;

var totalInProgress = 0;
var totalInProgressIT = 0;

var json = (function () {
    var json = null;
    $.ajax({
        'async': false,
        'global': false,
        'url': "./json/all_requests.json",
        'dataType': "json",
        'success': function (data) {
            json = data;
            json.forEach(element => {

                //Non-IT Related
                switch (element["Category"]) {
                    case "Awareness":
                    case "Design and Development Advice on Accessible ICT":
                    case "Document review":
                    case "General Advice on accessible ICT":
                    case "Information and Awareness on Accessibility Topics":
                    case "Presentation":
                    case "Procurement Advice on Accessible ICT":
                    case "Training":
                        if (element["Date received"].includes("2020-03")) {
                            nbReceivedMarch++;
                        };
                        if (element["Date resolved"].includes("2020-03") && element["Date received"].includes("2020-03")) {
                            nbNewResolvedMarch++;
                        };
                        if (element["Date resolved"].includes("2020-03")) {
                            nbResolvedMarch++;
                            //AVG Non-IT
                            dateReceived = new Date(element["Date received"]);
                            dateResolved = new Date(element["Date resolved"]);
                            differenceInTime = dateResolved.getTime() - dateReceived.getTime();
                            differenceInDays = differenceInTime / (1000 * 3600 * 24);
                            counter++;
                            processingTime += differenceInDays;
                        };
                        switch (element["Status"]) {
                            case "In progress":
                            case "Assigned":
                            case "On Hold":
                                nbInProgressMarch++;
                                break;
                        };
                        break;
                    case "Accessibility":
                    case "Accessibility Compliance Assessments on ICT Solutions":
                    case "Accessibility Compliance Project Management Services":
                    case "Assessment":
                    case "Client’s Need Assessment":
                    case "End-User Support for Assistive Adaptive Technology (AT)":
                    case "General request":
                    case "General Requests for Adaptive Technology (AT)":
                    case "Hearing loss":
                    case "loan Bank Services":
                    case "Low vision":
                    case "Mobility":
                    case "Other":
                        if (element["Date received"].includes("2020-03")) {
                            nbReceivedMarchIT++;
                        };
                        if (element["Date resolved"].includes("2020-03") && element["Date received"].includes("2020-03")) {
                            nbNewResolvedMarchIT++
                        };
                        if (element["Date resolved"].includes("2020-03")) {
                            nbResolvedMarchIT++;
                            dateReceivedIT = new Date(element["Date received"]);
                            dateResolvedIT = new Date(element["Date resolved"]);
                            differenceInTimeIT = dateResolvedIT.getTime() - dateReceivedIT.getTime();
                            differenceInDaysIT = differenceInTimeIT / (1000 * 3600 * 24);
                            counterIT++;
                            processingTimeIT += differenceInDaysIT;
                        };
                        switch (element["Status"]) {
                            case "In progress":
                            case "Assigned":
                            case "On Hold":
                                nbInProgressMarchIT++;
                                break;
                        };
                        break;
                };
            }
            );
        }

    });
    averageTime = processingTime / counter;
    averageTimeIT = processingTimeIT / counterIT;
})
    ();

