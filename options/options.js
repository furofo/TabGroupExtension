var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// Save the setting
function saveZoomPrefernence() {
    let zoomEnabled = document.getElementById('zoomEnabled').checked;
    console.log("new code");
    chrome.storage.sync.set({ "TABGROUPSZOOMENABLED": zoomEnabled });
}
function saveGroupingSeparateWindowPreference() {
    let shouldGroupSeparateWindow = document.getElementById('shouldGroupInSameWindow').checked;
    chrome.storage.sync.set({ "AUTOGROUPTABSSHOULDGROUPINSAMEWINDOW": shouldGroupSeparateWindow });
}
// Load the setting
function loadZoomPrefernence() {
    {
        chrome.storage.sync.get("TABGROUPSZOOMENABLED", (data) => {
            document.getElementById('zoomEnabled').checked = data.TABGROUPSZOOMENABLED;
        });
    }
}
function loadGroupingSeparateWindowPreference() {
    chrome.storage.sync.get("AUTOGROUPTABSSHOULDGROUPINSAMEWINDOW", (data) => {
        // Check if the data is undefined and set default to true
        let shouldGroupSeparateWindow = data.AUTOGROUPTABSSHOULDGROUPINSAMEWINDOW;
        if (shouldGroupSeparateWindow === undefined) {
            shouldGroupSeparateWindow = true;
            // Optionally, save this default value back to the storage
            chrome.storage.sync.set({ "AUTOGROUPTABSSHOULDGROUPINSAMEWINDOW": true });
        }
        document.getElementById('shouldGroupInSameWindow').checked = shouldGroupSeparateWindow;
    });
}
document.addEventListener('DOMContentLoaded', () => {
    loadZoomPrefernence();
    loadGroupingSeparateWindowPreference();
});
document.getElementById('zoomEnabled').addEventListener('change', saveZoomPrefernence);
document.getElementById('shouldGroupInSameWindow').addEventListener('change', saveGroupingSeparateWindowPreference);
document.getElementById('download-btn').addEventListener('click', function () {
    // Retrieve the 'TABGROUPS' data from Chrome's storage
    chrome.storage.sync.get(['TABGROUPS'], function (result) {
        if (result.TABGROUPS && result.TABGROUPS.length > 0) {
            const data = result.TABGROUPS;
            // Create a blob from the retrieved data
            const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
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
        }
        else {
            ModalWindow.openModal({
                title: 'No Rules To Save',
                content: "Looks you have do not have any TabGroups set up yet. Add a least one rule to be able to save them to a file."
            });
        }
    });
});
// Function to read and process the file
function handleFileSelect(evt) {
    const fileInput = evt.target; // Cast evt.target to HTMLInputElement
    if (!fileInput.files)
        return; // Guard clause in case there are no files
    const file = fileInput.files[0];
    fileInput.value = '';
    // Check if the file is a JSON file
    if (file && file.name.endsWith('.json')) {
        const reader = new FileReader();
        reader.onload = function (e) {
            const content = e.target.result;
            try {
                const data = JSON.parse(content);
                // Validate the data against the TabGroup type
                if (isValidTabGroup(data)) {
                    // Save the parsed data to Chrome's storage
                    chrome.storage.sync.set({ 'TABGROUPS': data }, function () {
                    });
                    showTooltip(); // Assuming showTooltip is a function you've defined elsewhere
                }
                else {
                    let modalWindowContent = `Error: Data does not match the TabGroup format or is blank. Please make sure it's a valid JSON file.\n\nExample of  a file with the correct format:\n
                    {\n  "group1": {\n    "NAME": "Work",\n    "URL": ["https://example.com", "https://worksite.com"],\n    "COLOR": "blue"\n  },\n  
                    "group2": {\n    "NAME": "Leisure",\n    "URL": ["https://youtube.com", "https://reddit.com"],\n    "COLOR": "red"\n  }\n}`;
                    ModalWindow.openModal({
                        title: 'Invalid Object Type!',
                        content: modalWindowContent
                    });
                }
            }
            catch (error) {
                if (error instanceof SyntaxError) {
                    // Inform the user about the correct format
                    let modalWindowContent = `Failed to load file ${file.name}. Please make sure it's a valid JSON file.\n\nExample of a file with the correct format:\n{\n  
                        "group1": {\n    "NAME": "Work",\n    "URL": ["https://example.com", "https://worksite.com"],\n    "COLOR": "blue"\n  },
                        \n  "group2": {\n    "NAME": "Leisure",\n    "URL": ["https://youtube.com", "https://reddit.com"],\n    "COLOR": "red"\n  }\n}`;
                    ModalWindow.openModal({
                        title: 'Invalid File Data!',
                        content: modalWindowContent
                    });
                }
                else {
                    let modalWindowTitle = `Unexpected error processing file ${file.name}: ${error.message}`;
                    let modalWindowContent = `An unexpected error occurred while processing file ${file.name}. Please try again.`;
                    ModalWindow.openModal({
                        title: modalWindowTitle,
                        content: modalWindowContent
                    });
                }
            }
        };
        reader.readAsText(file);
    }
    else {
        ModalWindow.openModal({
            title: "Incorrect File Type",
            content: "Only .json files are accepted"
        });
    }
}
function isValidTabGroup(data) {
    // Check if data is an array
    if (!Array.isArray(data) || data.length <= 0)
        return false;
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
document.getElementById('file-input').addEventListener('change', handleFileSelect);
// Function to trigger file input click
function loadCustomRules() {
    document.getElementById('file-input').click();
}
// Attach event listener to the load button
document.getElementById('load-btn').addEventListener('click', loadCustomRules);
function showTooltip() {
    const tooltip = document.getElementById('loadToolTip');
    tooltip.classList.add('show-tooltip');
    setTimeout(() => tooltip.classList.remove('show-tooltip'), 3000); // Hide after 3 seconds
}
const ModalWindow = {
    init() {
        document.body.addEventListener('click', this.handleClick.bind(this)); // Binding 'this' context
    },
    handleClick(e) {
        return __awaiter(this, void 0, void 0, function* () {
            const target = e.target;
            if (target) {
                if (target.classList.contains("modal__close") ||
                    target.classList.contains("modal__overlay") ||
                    target.classList.contains("modal__goback__button")) {
                    this.closeModal();
                }
            }
        });
    },
    //function of Modal window that returns html of the modal window 
    getHtmlTemplate(modalOptions) {
        if (modalOptions.buttons) {
            return `
        <div class="modal__overlay">
         <div class="modal__window">
           <div class="modal__titlebar">
             <span class="modal__title">${modalOptions.title}</span>
             <button class = "modal__close material-icons">close</button>
           </div>
           <div class="modal__content">
            ${modalOptions.content}
           </div>
           <div class = "modal__buttons">
           <button class = "modal__goback__button">Go Back</button>
            <button class = "modal__confirm__button">Confirm</button>
           </div>
          
         </div>
       </div>`;
        }
        else {
            return `
        <div class="modal__overlay">
         <div class="modal__window">
           <div class="modal__titlebar">
             <span class="modal__title">${modalOptions.title}</span>
             <button class = "modal__close material-icons">close</button>
           </div>
           <div class="modal__content">
            ${modalOptions.content}
           </div>
         </div>
       </div>`;
        }
    },
    openModal(modalOptions = {}) {
        modalOptions = Object.assign({
            title: 'Modal Title',
            content: 'Modal Content',
            buttons: false,
        }, modalOptions);
        const modalTemplate = this.getHtmlTemplate(modalOptions);
        document.body.insertAdjacentHTML("afterbegin", modalTemplate);
    },
    closeModal() {
        const modalOverlay = document.querySelector(".modal__overlay");
        if (modalOverlay !== null) {
            document.body.removeChild(modalOverlay);
        }
    }
};
document.addEventListener("DOMContentLoaded", () => {
    ModalWindow.init();
});
//# sourceMappingURL=options.js.map