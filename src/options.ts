// Save the setting
function saveZoomPrefernence() {
    let zoomEnabled = (document.getElementById('zoomEnabled') as HTMLInputElement).checked;
    console.log("new code");
    chrome.storage.sync.set({ zoomEnabled }
    );
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
document.getElementById('download-btn')!.addEventListener('click', function() {
    // Retrieve the 'TABGROUPS' data from Chrome's storage
    chrome.storage.sync.get(['TABGROUPS'], function(result) {
        if (result.TABGROUPS) {
            const data = result.TABGROUPS;

            // Create a blob from the retrieved data
            const blob = new Blob([JSON.stringify(data, null, 2)], {type : 'application/json'});
            const url = URL.createObjectURL(blob);

            // Create an anchor element and trigger the download
            const a = document.createElement('a');
            a.href = url;
            a.download = 'data.json';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        } else {
            console.error("No data found in TABGROUPS");
        }
    });
});

// Function to read and process the file
// Function to read and process the file
function handleFileSelect(evt) {
    const file = evt.target.files[0]; // Get the selected file

    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const content = e.target!.result;
            try {
                const data = JSON.parse(content as string);
                // Save the parsed data to Chrome's storage
                chrome.storage.sync.set({ 'TABGROUPS': data }, function() {
                    console.log('TABGROUPS data saved to Chrome storage');
                });
            } catch (error) {
                console.error("Error parsing JSON:", error);
            }
        };
        reader.readAsText(file);
        showTooltip();
    }
}


// Attach event listener to the file input
document.getElementById('file-input')!.addEventListener('change', handleFileSelect);

// Function to trigger file input click
function loadCustomRules() {
    document.getElementById('file-input')!.click();
}

// Attach event listener to the load button
document.getElementById('load-btn')!.addEventListener('click', loadCustomRules);
function showTooltip() {
    const tooltip = document.getElementById('loadToolTip');
    tooltip!.classList.add('show-tooltip');
    console.log("tool tip button clicked !");
    setTimeout(() => tooltip!.classList.remove('show-tooltip'), 3000); // Hide after 3 seconds
}

// Example of using it in your save function

