var customTotalApp = 0;
var customTotalCompliant = 0;

var json = (function () {
    var json = null;
    $.ajax({
        'async': false,
        'global': false,
        'url': "./json/csd_solutions.json",
        'dataType': "json",
        'success': function (data) {
            json = data;
            json.forEach(element => {

            if((element["Life-Cycle Status"]) == "In Production" && (element["Solution Type"]) == "Custom" && (element["Solution Client Base"]) != "General Public"){
                customTotalApp++
            }
            if((element["Life-Cycle Status"]) == "In Production" && (element["Solution Type"]) == "Custom" && (element["Solution Client Base"]) != "General Public" && (element["Accessibility Assessment"]) == "100%"){
                customTotalCompliant++
            }
            }
            );
        }

    });
})
    ();

