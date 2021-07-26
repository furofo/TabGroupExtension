let addRule = document.getElementById('addGroup');

function setRule() {
    chrome.storage.sync.set({rule: "google.com"}, () => {
      console.log("value is set to", "google .com" );
    });
  }

addRule.addEventListener("click", async() => {
    addRule.style.backgroundColor = "green";
    console.log("did this click thingy work?");
    setRule();
});
// The body of this function will be executed as a content script inside the
  // current page
