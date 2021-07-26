let addRule = document.getElementById('addGroup');

//this adds a property rule to local storage that we will use to define search urls for the tab groups
function setRule() {
    chrome.storage.sync.set({rule: "google.com"}, () => {
      console.log("value is set to", "google .com" );
    });
  }

// when button clicked for right now reads rule but functionality built to set rule//
  addRule.addEventListener("click", async() => {
    chrome.storage.sync.get(['rule'], (result) => {
        addRule.style.backgroundColor = "green";
        console.log("yeah baby this gets the rule set earlire", result.rule);
        // setRule();

    });
});

