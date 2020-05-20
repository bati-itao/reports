//function to get values of form
function getValue(param) {
	var vars = {};
	window.location.href.replace( location.hash, '' ).replace( 
		/[?&]+([^=&]+)=?([^&]*)?/gi, // regexp
		function( m, key, value ) { // callback
			vars[key] = value !== undefined ? value : '';
		}
	);

	if ( param ) {
		return vars[param] ? vars[param] : null;	
	}
	return vars;
}

function validateForm() {

        //var for the Non-IT column in the ACE ticket summary table
        var monthCountNonIT = [];
        monthCountNonIT["nbReceived"] = 0;
        monthCountNonIT["nbNewResolved"] = 0;
        monthCountNonIT["nbResolved"] = 0;
        monthCountNonIT["nbResolvedAfterCurrentMonth"] = 0;
        monthCountNonIT["nbNoDateResolved"] = 0;
        monthCountNonIT["nbInProgress"] = 0;

        //var for the IT column in the ACE ticket summary table
        var monthCountIT = [];
        monthCountIT["nbReceived"] = 0;
        monthCountIT["nbNewResolved"] = 0;
        monthCountIT["nbResolved"] = 0;
        monthCountIT["nbResolvedAfterCurrentMonth"] = 0;
        monthCountIT["nbNoDateResolved"] = 0;
        monthCountIT["nbInProgress"] = 0;

        //var for the Non-IT average
        var avgNonIT = [];
        avgNonIT["counter"] = 0;
        avgNonIT["processingTime"] = 0;
        avgNonIT["differenceInTime"] = 0;
        avgNonIT["differenceInDays"] = 0;
        avgNonIT["averageTime"] = 0;

        //var for the IT average
        var avgIT = [];
        avgIT["counter"] = 0;
        avgIT["processingTime"] = 0;
        avgIT["differenceInTime"] = 0;
        avgIT["differenceInDays"] = 0;
        avgIT["averageTime"] = 0;

        //var for the Non-IT row in the yearly rollup table
        var yearCountNonIT = [];
        yearCountNonIT["totalNew"] = 0;
        yearCountNonIT["totalResolved"] = 0;
        yearCountNonIT["totalResolvedAfterCurrentMonth"] = 0;
        yearCountNonIT["totalNoDateResolved"] = 0;
        yearCountNonIT["totalInProgress"] = 0;

        //var for the IT row in the yearly rollup table
        var yearCountIT = [];
        yearCountIT["totalNew"] = 0;
        yearCountIT["totalResolved"] = 0;
        yearCountIT["totalResolvedAfterCurrentMonth"] = 0;
        yearCountIT["totalNoDateResolved"] = 0;
        yearCountIT["totalInProgress"] = 0;

        //function that does all the counting for each element of the json file
        var json = (function () {
            $.ajax({
                'async': false,
                'global': false,
                'url': "./json/all_requests.json",
                'dataType': "json",
                'success': function (data) {
                    json = data;
                    json.forEach(element => {

                        //verify which month and year is selected
                        var selectedMonth = "";
                        var selectedYear = "";

                        switch (getValue("month")) {
                            case "January":
                                selectedMonth = "01";
                                break;
                            case "February":
                                selectedMonth = "02";
                                break;
                            case "March":
                                selectedMonth = "03";
                                break;
                            case "April":
                                selectedMonth = "04";
                                break;
                            case "May":
                                selectedMonth = "05";
                                break;
                            case "June":
                                selectedMonth = "06";
                                break;
                            case "July":
                                selectedMonth = "07";
                                break;
                            case "August":
                                selectedMonth = "08";
                                break;
                            case "September":
                                selectedMonth = "09";
                                break;
                            case "October":
                                selectedMonth = '10';
                                break;
                            case "November":
                                selectedMonth = "11";
                                break;
                            case "December":
                                selectedMonth = "12";
                                break;
                        };
                        switch (getValue("year")) {
                            case "2020":
                                selectedYear = "2020";
                                break;
                        };

                        var october = new Date("2019-10-01"); //This var is needed for the yearly report section
                        var endSelectedMonth = new Date(selectedYear, selectedMonth, 0); // Calculates the end of the selected month
                        var dateReceived = new Date(element["Date received"]);
                        var dateResolved = new Date(element["Date resolved"]);


                        //Non-IT Categories
                        switch (element["Category"]) {
                            case "Awareness":
                            case "Design and Development Advice on Accessible ICT":
                            case "Document review":
                            case "General Advice on accessible ICT":
                            case "Information and Awareness on Accessibility Topics":
                            case "Presentation":
                            case "Procurement Advice on Accessible ICT":
                            case "Training":
                            
                                if (element["Date received"].includes(selectedYear + "-" + selectedMonth)) { //verify if the date received includes the selected month and year
                                    monthCountNonIT["nbReceived"]++;
                                    if (dateResolved.getTime() > endSelectedMonth.getTime()) { //verify if it was resolved after the end of the selected month
                                        monthCountNonIT["nbResolvedAfterCurrentMonth"]++;
                                    };
                                    if ((element["Date resolved"]) == "") { //verify if the date resolved coolumn is empty
                                        if ((element["Status"]) != "Resolved" && (element["Status"]) != "closed") { //verify if the status is different from resolved and closed
                                            monthCountNonIT["nbNoDateResolved"]++;
                                        };
                                    };
                                    monthCountNonIT["nbInProgress"] = monthCountNonIT["nbResolvedAfterCurrentMonth"] + monthCountNonIT["nbNoDateResolved"];


                                };
                                if (element["Date resolved"].includes(selectedYear + "-" + selectedMonth) && element["Date received"].includes(selectedYear + "-" + selectedMonth)) { //verify if the date resolved and received includes the selected month and year
                                    monthCountNonIT["nbNewResolved"]++;

                                    //Calculates the AVG for Non-IT categories
                                    avgNonIT["differenceinTime"] = dateResolved.getTime() - dateReceived.getTime();
                                    avgNonIT["differenceinDays"] = avgNonIT["differenceinTime"] / (1000 * 3600 * 24);
                                    avgNonIT["counter"]++;
                                    avgNonIT["processingTime"] += avgNonIT["differenceinDays"];
                                };

                                if (element["Date resolved"].includes(selectedYear + "-" + selectedMonth)) {
                                    monthCountNonIT["nbResolved"]++;
                                };


                                if (dateReceived.getTime() <= endSelectedMonth.getTime() && dateReceived.getTime() >= october.getTime()) {
                                //verify of the date received is before the end of the selected month and after october 2019
                                    yearCountNonIT["totalNew"]++;
                                    if (dateResolved.getTime() > endSelectedMonth.getTime()) {
                                        //verify if the date resolved is before the end of the month
                                        yearCountNonIT["totalResolvedAfterCurrentMonth"]++;
                                    };
                                    if ((element["Date resolved"]) == "") {
                                        //verify if the date resolved is empty and if the status is different from resolved and closed
                                        if ((element["Status"]) != "Resolved" && (element["Status"]) != "closed") {
                                            yearCountNonIT["totalNoDateResolved"]++;
                                        };
                                    };
                                    yearCountNonIT["totalInProgress"] = yearCountNonIT["totalResolvedAfterCurrentMonth"] + yearCountNonIT["totalNoDateResolved"];
                                };

                                if (dateResolved.getTime() <= endSelectedMonth.getTime() && dateResolved.getTime() >= october.getTime()) {
                                    //verify if the date resolved is before the end of the month and after october 2019
                                    yearCountNonIT["totalResolved"]++;
                                };
                                break;
                            
                            // IT Categories (calculation are the same as the Non IT ones)
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
                                if (element["Date received"].includes(selectedYear + "-" + selectedMonth)) {
                                    monthCountIT["nbReceived"]++;
                                    if (dateResolved.getTime() > endSelectedMonth.getTime()) {
                                        monthCountIT["nbResolvedAfterCurrentMonth"]++;
                                    };
                                    if ((element["Date resolved"]) == "") {
                                        if ((element["Status"]) != "Resolved" && (element["Status"]) != "closed") {
                                            monthCountIT["nbNoDateResolved"]++;
                                        };
                                    };
                                    monthCountIT["nbInProgress"] = monthCountIT["nbResolvedAfterCurrentMonth"] + monthCountIT["nbNoDateResolved"];
                                };
                                if (element["Date resolved"].includes(selectedYear + "-" + selectedMonth) && element["Date received"].includes(selectedYear + "-" + selectedMonth)) {
                                    monthCountIT["nbNewResolved"]++
                                    avgIT["differenceInTime"] = dateResolved.getTime() - dateReceived.getTime();
                                    avgIT["differenceInDays"] = avgIT["differenceInTime"] / (1000 * 3600 * 24);
                                    avgIT["counter"]++;
                                    avgIT["processingTime"] += avgIT["differenceInDays"];
                                };
                                if (element["Date resolved"].includes(selectedYear + "-" + selectedMonth)) {
                                    monthCountIT["nbResolved"]++;
                                };
                                if (dateReceived.getTime() <= endSelectedMonth.getTime() && dateReceived.getTime() >= october.getTime()) {
                                    yearCountIT["totalNew"]++;
                                    if (dateResolved.getTime() > endSelectedMonth.getTime()) {
                                        yearCountIT["totalResolvedAfterCurrentMonth"]++;
                                    };
                                    if ((element["Date resolved"]) == "") {
                                        if ((element["Status"]) != "Resolved" && (element["Status"]) != "closed") {
                                            yearCountIT["totalNoDateResolved"]++;
                                        };
                                    };
                                    yearCountIT["totalInProgress"] = yearCountIT["totalResolvedAfterCurrentMonth"] + yearCountIT["totalNoDateResolved"];
                                };
                                if (dateResolved.getTime() <= endSelectedMonth.getTime() && dateResolved.getTime() >= october.getTime()) {
                                    yearCountIT["totalResolved"]++;
                                };
                                break;
                        };

                    }
                    );
                }

            });
            //final calculation for average
            avgNonIT["averageTime"] = avgNonIT["processingTime"] / avgNonIT["counter"];
            avgIT["averageTime"] = avgIT["processingTime"] / avgIT["counter"];
           
        })
            ();
        document.getElementById("monthlyReport").innerHTML = '<h1 property="name" id="wb-cont">'+ getValue("month") +' '+ getValue("year") +' Monthly Report</h1><ul class="pager"><li class="previous"><a href="monthly-report.html" rel="prev">Back to Monthly Report Form</a></li></ul><h2>Ticket Summary</h2><table class="wb-charts wb-charts-bar table"><caption>IT Accessibility Office (ITAO) Ticket Summary</caption><tr><th>&nbsp;</th><th>IT Related</th><th>Non-IT Related</th></tr><tr><th>New this Month</th><td>' + monthCountIT["nbReceived"] + '</td><td>' + monthCountNonIT["nbReceived"] + '</td></tr><tr><th>Total New Resolved this Month</th><td>' + monthCountIT["nbNewResolved"] + '</td><td>' + monthCountNonIT["nbNewResolved"] + '</td></tr><tr><th>Total Resolved this Month</th><td>' + monthCountIT["nbResolved"] + '</td><td>' + monthCountNonIT["nbResolved"] + '</td></tr><tr><th>Active in Progress</th><td>' + monthCountIT["nbInProgress"] + '</td><td>' + monthCountNonIT["nbInProgress"] + '</td></tr></tbody></table><p>AVG Resolution Time (days) IT Related: ' + Number.parseInt(avgIT["averageTime"]) + '</p><p>AVG Resolution Time (days) Non-IT Related: ' + Number.parseInt(avgNonIT["averageTime"]) + '</p><h2>Yearly Rollup</h2><table class="wb-charts wb-charts-bar table"><caption>Yearly Rollup</caption><tr><th>Year to Date (2019-2020)</th><th>IT Related</th><th>Non-IT Related</th></tr><tr><th>Total New</th><td>' + yearCountIT["totalNew"] + '</td><td>' + yearCountNonIT["totalNew"] + '</td></tr><tr><th>Total Resolved</th><td>' + yearCountIT["totalResolved"] + '</td><td>' + yearCountNonIT["totalResolved"] + '</td></tr><tr><th>Active in Progress</th><td>' + yearCountIT["totalInProgress"] + '</td><td>' + yearCountNonIT["totalInProgress"] + '</td></tr></table>';

       

        


    
}
