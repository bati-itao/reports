var customTotalApp = 0;
var customTotalCompliant = 0;
var publicFacingTotal = 0;
var number1 = 0;
var number2 = 0;
var number3 = 0;

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

                if ((element["Life-Cycle Status"]) == "In Production" && (element["Solution Type"]) == "Custom" && (element["Solution Client Base"]) != "General Public") {
                    customTotalApp++;
                }
                if ((element["Life-Cycle Status"]) == "In Production" && (element["Solution Type"]) == "Custom" && (element["Solution Client Base"]) != "General Public" && (element["Accessibility Assessment"]) == "100%") {
                    customTotalCompliant++;
                }
                switch (element["Solution"]) {
                    case "Access Management Portal":
                    case "Corporate Code Tables":
                    case "Data Gateway":
                    case "Electronic Documents System":
                    case "Electronic Forms on the Intranet":
                    case "Enterprise Web Services - WSAddress":
                    case "International Agreements":
                    case "Infrastructure Secure Channel Implementation":
                    case "Inquiry Reporting and Information System":
                    case "Internet Forms":
                    case "PULSE":
                    case "Quality Assurance Numerical Transaction Analysis":
                    case "Unemployment Insurance Calculation":
                    case "Integration Hub":
                    case "Web Error Code System":
                    case "Service Request Management Information System":
                    case "Systems Availability Notification System":
                    case "Enterprise Web Services - WSAudit":
                    case "Enterprise Web Services - WSDBLink":
                    case "Enterprise Web Services - WSED":
                    case "Enterprise Web Services - IMCCE":
                    case "ROE - Data and Web Services":
                    case "Corporate Solution Directory":
                    case "NSD Password Reset Tool":
                    case "Enterprise Web Services - WSEMail":
                    case "Action Request System":
                    case "AdminLauncher":
                    case "SAS Desktop Migration to Server Solution 1":
                    case "SharePoint Generic Collaboration - 2010":
                    case "Configuration Management Integrator":
                    case "GCProfile":
                    case "Atrium for the Social Security Tribunal Appeals":
                    case "CSL Loans Recall and Rehabilitation":
                    case "IVR Enterprise Services":
                    case "IVR - Main":
                    case "Systems Data Holdings":
                    case "Corporate Correspondence Tool":
                    case "IBM Statistical Package for the Social Sciences":
                    case "MultiTrans":
                    case "ESDC Job Profile Database":
                    case "Database Information System":
                    case "Oracle Business Process Management (BPM) Suite":
                    case "Interactive Forum":
                    case "Departmental Service Bus":
                    case "Self Install Printer Tool":
                    case "WebDirect":
                    case "IVR - Factory Framework":
                    case "IVR - Administrative Services":
                    case "IVR - Client Self-Serve":
                    case "Group Management Portal":
                    case "IRIS Build":
                    case "Common Application Deployment Engine":
                    case "Corporate Management System - Archiving Solution":
                    case "Service Agreements":
                    case "Supporting Services Repository":
                    case "Electronic Document and Records Management Solution":
                    case "Application Catalogue":
                    case "SCCM PC Admin":
                    case "IRIS - IT Asset Management":
                    case "Phishing button for Outlook":
                    case "Financial Information and Reference Search Tool":
                    case "FileScan":
                    case "Management of workforce tracking":
                    case "IT Security Exceptions site":
                    case "ITAM Control Board Proposals and Requests":
                    case "Resources Center (BSI)":
                    case "SEED (IITB)":
                    case "AIHMS Replacement":
                    case "Disposition Tracking Tool":
                    case "Sensitive Document Collaboration Service-Including MinO":
                    case "SharePoint Record management label printing":
                    case "Service Portfolio":
                    case "Batch Metadata Tagging Tool":
                    case "Departmental Information Resource Inventory":
                    case "Litigation Holds Database":
                    case "HRDConn OCX":
                    case "QualiWare Lifecycle Manager":
                    case "Shared Application Development Environment":
                    case "GC Hosted Contact Centre Solution":
                    case "Resource Centre Management System":
                    case "Application Testing Tracking Solution":
                    case "Test Automation Framework":
                    case "Advanced Analytics Open Source Package Repository":
                    case "SQL Server Monitoring":
                    case "SSC Query":
                    case "Definitive Software Library Search tool":
                    case "Network Performance and Monitoring":
                    case "System Center Configuration Manager":
                    case "Reference Data":
                    case "SharePoint 2016 collaboration":
                        if ((element["Life-Cycle Status"]) == "In Production") {
                            publicFacingTotal++
                            if ((element["Accessibility Assessment"]) == "100%") {
                                number1++;
                            }
                            if ((element["Accessibility Assessment"]) == "<100%") {
                                number2++;
                            }
                            if ((element["Accessibility Assessment"]) == "TBD") {
                                number3++;
                            }
                        }
                        break;
                };
            }
            );
        }

    });
})
    ();

