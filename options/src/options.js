// Save the setting
function saveSetting() {
    var loggingEnabled = document.getElementById('loggingEnabled').checked;
    console.log("new code");
    chrome.storage.sync.set({ loggingEnabled: loggingEnabled });
}
// Load the setting
function restoreSetting() {
    chrome.storage.sync.get("loggingEnabled", function (data) {
        console.log("new code");
        document.getElementById('loggingEnabled').checked = data.loggingEnabled;
    });
}
document.addEventListener('DOMContentLoaded', restoreSetting);
document.getElementById('loggingEnabled').addEventListener('change', saveSetting);
