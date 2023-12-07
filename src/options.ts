// Save the setting
function saveZoomPrefernence() {
    let zoomEnabled = (document.getElementById('zoomEnabled') as HTMLInputElement).checked;
    console.log("new code");
    chrome.storage.sync.set({ zoomEnabled });
}

// Load the setting
function loadZoomPrefernence() {
    {
    chrome.storage.sync.get("zoomEnabled", (data) => {
        console.log("new code");
        (document.getElementById('zoomEnabled') as HTMLInputElement).checked = data.zoomEnabled;
    });
}
}

document.addEventListener('DOMContentLoaded', loadZoomPrefernence);
document.getElementById('zoomEnabled')!.addEventListener('change', saveZoomPrefernence);