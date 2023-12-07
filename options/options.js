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
