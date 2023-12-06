// Save the setting
function saveSetting() {
    let loggingEnabled = document.getElementById('loggingEnabled').checked;
    chrome.storage.sync.set({ loggingEnabled });
}

// Load the setting
function restoreSetting() {
    chrome.storage.sync.get("loggingEnabled", (data) => {
        document.getElementById('loggingEnabled').checked = data.loggingEnabled;
    });
}

document.addEventListener('DOMContentLoaded', restoreSetting);
document.getElementById('loggingEnabled').addEventListener('change', saveSetting);