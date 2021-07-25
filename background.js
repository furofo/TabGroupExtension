//changed this to an unamed function that uses promis method inside of async function and got rid of async functiont to set goupr id
  // this gets active tab and creates a group id for it
 chrome.tabs.query({active: true, lastFocusedWindow: true}).then((tabObj) =>{
  chrome.tabs.group({tabIds: tabObj[0].id}).then((id) => {
     console.log(" group id created is");
     console.log(id);
    });
  });


  //this gets url and logs it to page
  chrome.tabs.query({active: true, lastFocusedWindow: true}).then((tabs) => {
      let url = tabs[0].url;
      console.log("promise finidng url");
      console.log(url);
  });

  /*

// basic query to see all tab groups currently in window
chrome.tabGroups.query({}).then((obj) => {
        console.log(obj.length);
        if(obj.length >= 1) {
        //console.log("succesfull?" + JSON.stringify(obj));
        }
        else {
           // console.log("no match found sorry :(")
        }
}).catch(() => {
    //console.log('error??');
}); 
*/

/* call back mehtod
chrome.tabGroups.query({}, (obj) => {
    console.log(obj.length);
        if(obj.length >= 1) {
        console.log("succesfull?" + JSON.stringify(obj));
        }
        else {
            console.log("no match found sorry :(")
        }
})

*/