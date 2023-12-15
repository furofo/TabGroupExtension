// Save the setting
function saveZoomPrefernence() {
    var zoomEnabled = document.getElementById('zoomEnabled').checked;
    console.log("new code");
    chrome.storage.sync.set({ "TABGROUPSZOOMENABLED": zoomEnabled });
}
// Load the setting
function loadZoomPrefernence() {
    {
        chrome.storage.sync.get("TABGROUPSZOOMENABLED", function (data) {
            console.log("new code");
            document.getElementById('zoomEnabled').checked = data.TABGROUPSZOOMENABLED;
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
function handleFileSelect(evt) {
    var file = evt.target.files[0]; // Get the selected file
    console.log("did we get toe here", file);
    // Check if the file is a JSON file
    if (file && file.name.endsWith('.json')) {
        console.log("end with json");
        var reader = new FileReader();
        reader.onload = function (e) {
            var content = e.target.result;
            try {
                console.log("try block reached");
                var data = JSON.parse(content);
                // Validate the data against the TabGroup type
                if (isValidTabGroup(data)) {
                    console.log("did this even work");
                    // Save the parsed data to Chrome's storage
                    chrome.storage.sync.set({ 'TABGROUPS': data }, function () {
                        console.log('TABGROUPS data saved to Chrome storage');
                    });
                    showTooltip(); // Assuming showTooltip is a function you've defined elsewhere
                }
                else {
                    console.error("Error: Data does not match the TabGroup format. Please make sure it's a valid JSON file.\n\nExample of  a file with the correct format:\n\n                      {\n  \"group1\": {\n    \"NAME\": \"Work\",\n    \"URL\": [\"https://example.com\", \"https://worksite.com\"],\n    \"COLOR\": \"blue\"\n  },\n  \n                      \"group2\": {\n    \"NAME\": \"Leisure\",\n    \"URL\": [\"https://youtube.com\", \"https://reddit.com\"],\n    \"COLOR\": \"red\"\n  }\n}");
                }
            }
            catch (error) {
                console.error("Error parsing JSON:", error);
                if (error instanceof SyntaxError) {
                    console.error("Syntax error in file ".concat(file.name, ": ").concat(error.message));
                    // Inform the user about the correct format
                    alert("Failed to load file ".concat(file.name, ". Please make sure it's a valid JSON file.\n\nExample of a file with the correct format:\n{\n  \n                        \"group1\": {\n    \"NAME\": \"Work\",\n    \"URL\": [\"https://example.com\", \"https://worksite.com\"],\n    \"COLOR\": \"blue\"\n  },\n                        \n  \"group2\": {\n    \"NAME\": \"Leisure\",\n    \"URL\": [\"https://youtube.com\", \"https://reddit.com\"],\n    \"COLOR\": \"red\"\n  }\n}"));
                }
                else {
                    console.error("Unexpected error processing file ".concat(file.name, ": ").concat(error.message));
                    alert("An unexpected error occurred while processing file ".concat(file.name, ". Please try again."));
                }
            }
        };
        reader.readAsText(file);
    }
    else {
        console.error("Error: Only .json files are accepted");
    }
}
function isValidTabGroup(data) {
    // Check if data is an array
    if (!Array.isArray(data))
        return false;
    for (var _i = 0, data_1 = data; _i < data_1.length; _i++) {
        var item = data_1[_i];
        // Now, item is each object in the array
        for (var key in item) {
            var group = item[key];
            if (typeof group.NAME !== 'string' ||
                !Array.isArray(group.URL) ||
                typeof group.COLOR !== 'string') {
                return false;
            }
        }
    }
    return true;
}
// ... rest of your code ...
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
//# sourceMappingURL=options.js.map