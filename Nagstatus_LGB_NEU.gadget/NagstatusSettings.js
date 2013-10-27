System.Gadget.onSettingsClosing = closeSettings;

function soundChanged() {
    document.getElementById("alertSound").value = document.getElementById("browseSound").value;
}

function initSettings() {
    nagiosUrl.value = System.Gadget.Settings.read("nagiosUrl");
    xmlProviderUrl.value = System.Gadget.Settings.read("xmlProviderUrl");
    xmlProviderUser.value = System.Gadget.Settings.read("xmlProviderUser");  
    xmlProviderPass.value = System.Gadget.Settings.read("xmlProviderPass");  
    windowTitle.value = System.Gadget.Settings.read("windowTitle");
    refreshTimeoutSec.value = System.Gadget.Settings.read("refreshTimeoutSec");
    if (System.Gadget.Settings.read("xmlProviderType") == 'file') { xmlProviderType[1].selected = true; }
    if (System.Gadget.Settings.read("displayUpdate") == 'On') { document.getElementById("displayUpdate").checked = true; } 
    alertSound.value = System.Gadget.Settings.read("alertSound");
}

function closeSettings(event) {
    
    if (event.closeAction == event.Action.commit) {
        System.Gadget.Settings.write("windowTitle", windowTitle.value);
        System.Gadget.Settings.write("nagiosUrl", nagiosUrl.value);
        System.Gadget.Settings.write("nagiosExtinfoUrl", nagiosUrl.value + "/cgi-bin/extinfo.cgi");
        if (xmlProviderUrl.value != "") {
            System.Gadget.Settings.write("xmlProviderUrl", xmlProviderUrl.value);            
        } else {
            System.Gadget.Settings.write("xmlProviderUrl", nagiosUrl.value + "/cgi-bin/nagxmlstatus.cgi");
        }
        System.Gadget.Settings.write("xmlProviderUser", xmlProviderUser.value);
        System.Gadget.Settings.write("xmlProviderPass", xmlProviderPass.value);
        var s = document.getElementById("xmlProviderType");
        System.Gadget.Settings.write("xmlProviderType", s.options[s.selectedIndex].value);
        if (refreshTimeoutSec.value.toString().search(/^[0-9]+$/) == 0) {
            System.Gadget.Settings.write("refreshTimeoutSec", refreshTimeoutSec.value);
        }
/*        if ((System.Gadget.Settings.read("alertSound") != "") && (alertSound.value != "") && (alertSound.value != " ")) {
            System.Gadget.Settings.write("alertSound", alertSound.value);
        } else {
            System.Gadget.Settings.write("alertSound", "");
        } */
		 /* if (document.getElementByName('displayUpdate').checked == true) { System.Gadget.Settings.write("displayUpdate", "true"); }	*/
		/* if (document.getElementByName('displayUpdate').checked = true) { window.alert("Alles Klar!!"); } */
		if (document.getElementById("displayUpdate").checked) { System.Gadget.Settings.write("displayUpdate", "On"); } else { System.Gadget.Settings.write("displayUpdate", "Off"); }
        System.Gadget.Settings.write("alertSound", alertSound.value);
    }
    
    // Settings saved, close Settings window
    event.cancel = false;
}