
// this is function to get current tab
async function getCurrentTab() {
    let queryOptions = { active: true, currentWindow: true };
    let [tab] = await chrome.tabs.query(queryOptions);
    return tab;
  }


 //since get current Tab returns promis object, this waits for it then uses the value returned which is curent tab object
  
  getCurrentTab().then((tabObj) =>{
  chrome.tabs.group({tabIds: tabObj.id}).then((id) => {
     console.log(" group id created is");
     console.log(id);
    });
  });


  chrome.tabs.query({active: true, lastFocusedWindow: true}).then((tabs) => {
      let url = tabs[0].url;
      console.log("promise finidng url");
      console.log(url);
  });

// basic query to see all tab groups currently in window
chrome.tabGroups.query({}).then((obj) => {
        console.log(obj.length);
        if(obj.length >= 1) {
        console.log("succesfull?" + JSON.stringify(obj));
        }
        else {
            console.log("no match found sorry :(")
        }
}).catch(() => {
    console.log('error??');
});