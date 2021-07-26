let addRule = document.getElementById('addGroup');

function setRule() {
    chrome.storage.sync.set({rule: "google.com"}, () => {
      console.log("value is set to", "google .com" );
    });
  }


  addRule.addEventListener("click", async() => {
    chrome.storage.sync.get(['rule'], (result) => {
        addRule.style.backgroundColor = "green";
        console.log("yeah baby this gets the rule set earlire", result.rule);

    });
});

  /*
addRule.addEventListener("click", async() => {
    chrome.storage.sync.get('rule').then((result) => {
        addRule.style.backgroundColor = "green";
        console.log("yeah baby this gets the rule set earlire", result);

    });
    
    setRule();
}); */

// The body of this function will be executed as a content script inside the
  // current page
