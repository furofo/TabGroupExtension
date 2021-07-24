console.log("did this work at least?");



let objy = {}

//chrome.tabs.getCurrent().then((tabObj) => {console.log("this should be curernt tab") + console.log(tabObj)});
async function getCurrentTab() {
    let queryOptions = { active: true, currentWindow: true };
    let [tab] = await chrome.tabs.query(queryOptions);
    return tab;
  }
  console.log("this hould be current tab");
  // get current tabl id
  let tabId;
  getCurrentTab().then((obj) =>{
      tabId = obj.id;
      console.log(tabId);
  chrome.tabs.group({tabIds: tabId}).then((id) => {
     console.log(" group id created is");
     console.log(id);
     
    });
  
  });

 
  //console.log(await(getCurrentTab()));

// basic query to see if object found
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

//this moves whatever tab group to the end of the tab
//chrome.tabGroups.move(957711729, {'index': -1}).then((obj) => { console.log(obj)});

// id 1611148928 // test 2
/*
chrome.tabGroups.query({}, (obj) => {
    if(obj) {
        console.log("succesfull?" + JSON.stringify(obj));
    }
    else {
        console.log("unsuccesfull")
    }

}); 
*/




/* output wiht one blue tab was did this work at least?
background.js:5 succesfull?[{"collapsed":false,"color":"blue","id":838850965,"title":"hello","windowId":16}]*/


/* output with two groups [{"collapsed":true,"color":"blue","id":987625515,"title":"hello","windowId":10},
{"collapsed":true,"color":"red","id":1437632484,"title":"test2","windowId":10}]*/