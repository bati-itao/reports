function calculateWeekendDays(fromDate, toDate){
    var weekendDayCount = 0;    
    while(fromDate < toDate){
        fromDate.setDate(fromDate.getDate() + 1);
        if(fromDate.getDay() === 0 || fromDate.getDay() == 6){
            ++weekendDayCount ;
        }
    }    return weekendDayCount ;
}
function validateForm() {

    if (document.getElementById("startDate").value.length && document.getElementById("endDate").value.length != 0) {


        var tickets1 = 0;
        var tickets2 = 0;
        var ticketsOpenTotal;
        var ticketsClosed = 0;
        var nbNewTicket = 0;
        var onHold = 0;
        //AVG
        var counter = 0;
        var processingTime = 0;
        var differenceInTime;
        var differenceInDays;
        var differenceInDaysNoWeekEnd;
        var averageTime;

        //Categories
        var showCategories;
        var nbCategories = [];

        //Form
        var startDate = new Date(document.getElementById("startDate").value);
        var endDate = new Date(document.getElementById("endDate").value);

        var json = (function () {
            $.ajax({
                'async': false,
                'global': false,
                'url': "./json/all_requests.json",
                'dataType': "json",
                'success': function (data) {
                    json = data;
                    json.forEach(element => {
                        var dateReceived = new Date(element["Date received"]);
                        var dateResolved = new Date(element["Date resolved"]);
                        var dateReceivedAVG = new Date(element["Date received"]);
                        var dateResolvedAVG = new Date(element["Date resolved"]);
                        if ((element["Status"]) == "On Hold" || (element["Status"]) == "on hold")
                        {
                            onHold++;
                        }
                        if ((element["Date received"]) != "") {
                            if (dateReceived.getTime() <= endDate.getTime()) {

                                if (dateResolved.getTime() > endDate.getTime()) {
                                    tickets1++;
                                };
                                if ((element["Date resolved"]) == "") {
                                    if ((element["Status"]) != "Resolved" && (element["Status"]) != "closed") {
                                        tickets2++;
                                    };
                                };

                            };
                            ticketsOpenTotal = tickets1 + tickets2;
                        };
                        
                        if (dateResolved.getTime() <= endDate.getTime() && dateResolved.getTime() >= startDate.getTime()) {
                            ticketsClosed++;
                            var nbWeekend = calculateWeekendDays(dateReceivedAVG,dateResolvedAVG); 
                            differenceInTime = dateResolved.getTime() - dateReceived.getTime();
                            differenceInDays = differenceInTime / (1000 * 3600 * 24);
                            differenceInDaysNoWeekEnd = differenceInDays - nbWeekend;
                            counter++;
                            processingTime += differenceInDaysNoWeekEnd;
                        };
                        if (dateReceived.getTime() <= endDate.getTime() && dateReceived.getTime() >= startDate.getTime()) {
                            nbNewTicket++;
                            nbCategories[element["Category"]] === undefined ? nbCategories[element["Category"]] = 1 : nbCategories[element["Category"]]++;
                        };

                    }
                    );


                }

            });
            averageTime = processingTime / counter;
            showCategories = "";
            for (var k in nbCategories) {
                showCategories += '<li>' + k + ': ' + nbCategories[k] + '</li>';
            }
        })
            ();
        document.getElementById("weeklyReport").innerHTML = '<h2>Week of ' + document.getElementById("startDate").value + ' to ' + document.getElementById("endDate").value + '</h2><p>Number of tickets open total: ' + ticketsOpenTotal + '</p><p>Number of tickets on hold: '+ onHold +'</p><p>Number of closed tickets this week: ' + ticketsClosed + '</p><p>Average response time: ' + Number.parseInt(averageTime) + ' days</p><p>Number of new tickets this week: ' + nbNewTicket + '</p><p>From which:</p><ul>' + showCategories + '</ul><p>* Please note that the "On Hold" count is for the requests that are on hold in the present only</p>';
    }
}  
