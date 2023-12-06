// Save the setting
function saveSetting() {
    let loggingEnabled = (document.getElementById('loggingEnabled') as HTMLInputElement).checked;
    console.log("new code");
    chrome.storage.sync.set({ loggingEnabled });
}

// Load the setting
function restoreSetting() {
    chrome.storage.sync.get("loggingEnabled", (data) => {
        console.log("new code");
        (document.getElementById('loggingEnabled') as HTMLInputElement).checked = data.loggingEnabled;
    });
}


document.addEventListener('DOMContentLoaded', restoreSetting);
document.getElementById('loggingEnabled')!.addEventListener('change', saveSetting);