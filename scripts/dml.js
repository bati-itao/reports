var cotsTotalApp = 0;
var cotsTotalCompliant = 0;

var json = (function () {
    var json = null;
    $.ajax({
        'async': false,
        'global': false,
        'url': "./json/dml.json",
        'dataType': "json",
        'success': function (data) {
            json = data;
            json.forEach(element => {

            if((element["Proposal Status"]) == "Approved"){
                cotsTotalApp++
            }
            if((element["Proposal Status"]) == "Approved" && (element["Accessibility Assessment Result"] == "Recommended")){
                cotsTotalCompliant++
            }
            }
            );
        }

    });
})
    ();

