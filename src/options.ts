// Save the setting
function saveZoomPrefernence() {
    let zoomEnabled = (document.getElementById('zoomEnabled') as HTMLInputElement).checked;
    console.log("new code");
    chrome.storage.sync.set({ "TABGROUPSZOOMENABLED": zoomEnabled });
}

// Load the setting
function loadZoomPrefernence() {
    {
    chrome.storage.sync.get("TABGROUPSZOOMENABLED", (data) => {
        console.log("new code");
        (document.getElementById('zoomEnabled') as HTMLInputElement).checked = data.TABGROUPSZOOMENABLED;
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
    
            // Get today's date in yyyy-mm-dd format
            const today = new Date();
            const formattedDate = today.toISOString().substring(0, 10); // yyyy-mm-dd
    
            // Create an anchor element and trigger the download
            const a = document.createElement('a');
            a.href = URL.createObjectURL(blob);
            a.download = `AutoTabGroups_${formattedDate}.json`; // Set file name with date
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        } else {
            console.error("No data found in TABGROUPS");
        }
    });
    
});
// TabGroup type definition
type TabGroup = {
    [key: string]: {
      NAME: string;
      URL: string[];
      COLOR: string;
    };
  };
  
  // Function to read and process the file
  function handleFileSelect(evt) {
      const file = evt.target.files[0]; // Get the selected file
      console.log("did we get toe here", file);
      // Check if the file is a JSON file
      if (file && file.name.endsWith('.json')) {
        console.log("end with json");
          const reader = new FileReader();
          reader.onload =  function(e) {
              const content = e.target!.result;
              try {
                  console.log("try block reached")
                  const data = JSON.parse(content as string);
                  // Validate the data against the TabGroup type
                  if (isValidTabGroup(data)) {
                    console.log("did this even work");
                      // Save the parsed data to Chrome's storage
                       chrome.storage.sync.set({ 'TABGROUPS': data }, function() {
                          console.log('TABGROUPS data saved to Chrome storage');
                      });
                      
                      showTooltip(); // Assuming showTooltip is a function you've defined elsewhere
                  } else {
                      console.error(`Error: Data does not match the TabGroup format. Please make sure it's a valid JSON file.\n\nExample of  a file with the correct format:\n
                      {\n  "group1": {\n    "NAME": "Work",\n    "URL": ["https://example.com", "https://worksite.com"],\n    "COLOR": "blue"\n  },\n  
                      "group2": {\n    "NAME": "Leisure",\n    "URL": ["https://youtube.com", "https://reddit.com"],\n    "COLOR": "red"\n  }\n}`);
                  }
              } catch (error) {
                console.error("Error parsing JSON:", error);
            
                if (error instanceof SyntaxError) {
                    console.error(`Syntax error in file ${file.name}: ${error.message}`);
                    // Inform the user about the correct format
                    alert(`Failed to load file ${file.name}. Please make sure it's a valid JSON file.\n\nExample of a file with the correct format:\n{\n  
                        "group1": {\n    "NAME": "Work",\n    "URL": ["https://example.com", "https://worksite.com"],\n    "COLOR": "blue"\n  },
                        \n  "group2": {\n    "NAME": "Leisure",\n    "URL": ["https://youtube.com", "https://reddit.com"],\n    "COLOR": "red"\n  }\n}`);
                } else {
                    console.error(`Unexpected error processing file ${file.name}: ${error.message}`);
                    alert(`An unexpected error occurred while processing file ${file.name}. Please try again.`);
                }
              }
          };
          reader.readAsText(file);

      } else {
          console.error("Error: Only .json files are accepted");
      }
  }
  
  function isValidTabGroup(data) {
    // Check if data is an array
    if (!Array.isArray(data)) return false;

    for (const item of data) {
        // Now, item is each object in the array
        for (const key in item) {
            const group = item[key];
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

