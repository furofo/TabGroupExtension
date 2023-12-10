// Save the setting
function saveZoomPrefernence() {
    var zoomEnabled = document.getElementById('zoomEnabled').checked;
    console.log("new code");
    chrome.storage.sync.set({ zoomEnabled: zoomEnabled });
}
// Load the setting
function loadZoomPrefernence() {
    {
        chrome.storage.sync.get("zoomEnabled", function (data) {
            console.log("new code");
            document.getElementById('zoomEnabled').checked = data.zoomEnabled;
        });
    }
}
document.addEventListener('DOMContentLoaded', loadZoomPrefernence);
document.getElementById('zoomEnabled').addEventListener('change', saveZoomPrefernence);
document.getElementById('download-btn').addEventListener('click', function () {
    // Retrieve the 'TABGROUPS' data from Chrome's storage
    chrome.storage.sync.get(['TABGROUPS'], function (result) {
        if (result.TABGROUPS) {
            var data = result.TABGROUPS;
            // Create a blob from the retrieved data
            var blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
            // Get today's date in yyyy-mm-dd format
            var today = new Date();
            var formattedDate = today.toISOString().substring(0, 10); // yyyy-mm-dd
            // Create an anchor element and trigger the download
            var a = document.createElement('a');
            a.href = URL.createObjectURL(blob);
            a.download = "AutoTabGroups_".concat(formattedDate, ".json"); // Set file name with date
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        }
        else {
            console.error("No data found in TABGROUPS");
        }
    });
});
// Function to read and process the file
// Function to read and process the file
function handleFileSelect(evt) {
    var file = evt.target.files[0]; // Get the selected file
    if (file) {
        var reader = new FileReader();
        reader.onload = function (e) {
            var content = e.target.result;
            try {
                var data = JSON.parse(content);
                // Save the parsed data to Chrome's storage
                chrome.storage.sync.set({ 'TABGROUPS': data }, function () {
                    console.log('TABGROUPS data saved to Chrome storage');
                });
            }
            catch (error) {
                console.error("Error parsing JSON:", error);
            }
        };
        reader.readAsText(file);
        showTooltip();
    }
}
// Attach event listener to the file input
document.getElementById('file-input').addEventListener('change', handleFileSelect);
// Function to trigger file input click
function loadCustomRules() {
    document.getElementById('file-input').click();
}
// Attach event listener to the load button
document.getElementById('load-btn').addEventListener('click', loadCustomRules);
function showTooltip() {
    var tooltip = document.getElementById('loadToolTip');
    tooltip.classList.add('show-tooltip');
    console.log("tool tip button clicked !");
    setTimeout(function () { return tooltip.classList.remove('show-tooltip'); }, 3000); // Hide after 3 seconds
}
// Example of using it in your save function
