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

var dateReceived;
var dateResolved;

var dateReceivedIT;
var dateResolvedIT;

var differenceInTime;
var differenceInDays;

var differenceInTimeIT;
var differenceInDaysIT;

var averageTime;
var averageTimeIT;

//Total

var october = new Date(2019, 10, 01);
var march = new Date(2020, 03, 31);
var totalDateReceived;
var totalDateReceivedIT;
var totalNew = 0;
var totalNewIT = 0;

var totalDateResolved;
var totalDateResolvedIT;
var totalResolved = 0;
var totalResolvedIT = 0;
var inProgress1 = 0;
var inProgress2 = 0;
var inProgress1IT = 0;
var inProgress2IT = 0;
var totalInProgress;
var totalInProgressIT;

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
                            switch (element["Status"]) {
                                case "In progress":
                                case "Assigned":
                                case "On Hold":
                                    nbInProgressMarch++;
                                    break;
                            };
                            nbReceivedMarch++;
                        };
                        if (element["Date resolved"].includes("2020-03") && element["Date received"].includes("2020-03")) {
                            nbNewResolvedMarch++;
                            //AVG Non-IT
                            dateReceived = new Date(element["Date received"]);
                            dateResolved = new Date(element["Date resolved"]);
                            differenceInTime = dateResolved.getTime() - dateReceived.getTime();
                            differenceInDays = differenceInTime / (1000 * 3600 * 24);
                            counter++;
                            processingTime += differenceInDays;
                        };
                        if (element["Date resolved"].includes("2020-03")) {
                            nbResolvedMarch++;
                            
                        };
                        
                        totalDateReceived = new Date(element["Date received"]);
                        totalDateResolved = new Date(element["Date resolved"]);
                        if (totalDateReceived.getTime() <= march.getTime() && totalDateReceived.getTime() >= october.getTime()) {
                            totalNew++;
                            if (totalDateResolved.getTime() > march.getTime()) {
                                inProgress1++;
                            };
                            if ((element["Date resolved"]) == "") {
                                if ((element["Status"]) != "Resolved" && (element["Status"]) != "closed") {
                                    inProgress2++;
                                };
                            };
                            totalInProgress = inProgress1 + inProgress2;
                        }; 
                        
                        if (totalDateResolved.getTime() <= march.getTime() && totalDateResolved.getTime() >= october.getTime()) {
                            totalResolved++;
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
                            switch (element["Status"]) {
                                case "In progress":
                                case "Assigned":
                                case "On Hold":
                                    nbInProgressMarchIT++;
                                    break;
                            };
                        };
                        if (element["Date resolved"].includes("2020-03") && element["Date received"].includes("2020-03")) {
                            nbNewResolvedMarchIT++
                            dateReceivedIT = new Date(element["Date received"]);
                            dateResolvedIT = new Date(element["Date resolved"]);
                            differenceInTimeIT = dateResolvedIT.getTime() - dateReceivedIT.getTime();
                            differenceInDaysIT = differenceInTimeIT / (1000 * 3600 * 24);
                            counterIT++;
                            processingTimeIT += differenceInDaysIT;
                        };
                        if (element["Date resolved"].includes("2020-03")) {
                            nbResolvedMarchIT++;
                            
                        };
                        
                        totalDateReceivedIT = new Date(element["Date received"]);
                        totalDateResolvedIT = new Date(element["Date resolved"]);
                        if (totalDateReceivedIT.getTime() <= march.getTime() && totalDateReceivedIT.getTime() >= october.getTime()) {
                            totalNewIT++;
                            if (totalDateResolvedIT.getTime() > march.getTime()) {
                                inProgress1IT++;
                            };
                            if ((element["Date resolved"]) == "") {
                                if ((element["Status"]) != "Resolved" && (element["Status"]) != "closed") {
                                    inProgress2IT++;
                                };
                            };
                            totalInProgressIT = inProgress1IT + inProgress2IT;
                        }; 
                        
                        if (totalDateResolvedIT.getTime() <= march.getTime() && totalDateResolvedIT.getTime() >= october.getTime()) {
                            totalResolvedIT++;
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

