

let addButton = document.getElementById('delete-group');
let editAddButton = document.getElementById('edit-add-group')
//let ruleInput = document.getElementById('rule-input');
//this adds a property rule to local storage that we will use to define search urls for the tab groups
function setRule() {
   // let value = ruleInput.value;
    console.log("value is ", value);
    chrome.storage.sync.set({rule: value}, () => {
      setARule.style.backgroundColor = "purple";
      console.log("value is set to", value);
    });
  }

//listener for setRule Button
addButton.addEventListener("click", async() => {
  setRule("johntron.com");
});

// when button clicked for right now reads rule but functionality built to set rule//
  editAddButton.addEventListener("click", async() => {
    chrome.storage.sync.get(['rule'], (result) => {
       
        console.log("yeah baby this gets the rule set earlire", result.rule);
        // setRule();

    });
});



