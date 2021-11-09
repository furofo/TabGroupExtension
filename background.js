//changed this to an unamed function that uses promis method inside of async function and got rid of async functiont to set goupr id
  // this gets active tab and creates a group id for it
  /*
 chrome.tabs.query({active: true, lastFocusedWindow: true}).then((tabObj) =>{
  console.log("this is tabobj");
  console.log(tabObj);

  chrome.tabs.group({tabIds: tabObj[0].id}).then((id) => {
    });
  });
  */

  //this gets url and logs it to page
  chrome.tabs.query({active: true, lastFocusedWindow: true}).then((tabs) => {
      
      let url = tabs[0].url;
      console.log(url);
      let searchTerm = "john";
      if(url.includes(searchTerm)) {

      }

      else {
        console.log("this url does not inclue the search term");
      }
      console.log("promise finidng url");
      console.log(url);
  });

  let groupedTabArray = [];
  let groupIDArray = [];
  // listener that can tell if tab changes and new html page loads or if new tab is opened
  chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab)  => {

   

    /*
    chrome.storage.sync.get(['rule'], (result) => {
      console.log("yeah baby this is service worker does it work heree", result.rule);
      // setRule();
  });
  */
 /*
  chrome.storage.sync.get(['GROUP2'], (result) => {
    console.log("this is group2");
    console.log(result);
    console.log(".");
    console.log(".");
    console.log(".");
    console.log("yeah baby this gets the rule set earlire  Group 2 first up is Color", 
    result['GROUP2']['COLOR'], 'second is name',
     result['GROUP2']['NAME'], 'lastly is url', result["GROUP2"]["URL"]);
  });
  chrome.storage.sync.get(['GROUP1'], (result) => {
    
    console.log("this is group1");
    console.log(".");
    console.log(".");
    console.log(".");
    console.log(result);


*/
// make chormestorage get a promise instead of clalback avoid callback hell muahhahahah
function chromeStorageGet(result) {
  return new Promise((resolve, reject) => {
    if(resolve) {
      resolve(result)
    }
    else {
      console.log("didn't work");
    }

  });
}

chromeStorageGet(chrome.storage.sync.get(['GROUP1']))
.then((result) => {
  console.log("this is practice with promise instead of call back")
  console.log("..");
  console.log("...");
  console.log("..");
  console.log("...");
  console.log(result);
  let groupsArray = [];
  groupsArray.push(result);
  return groupsArray;
  })
.then((result) => {
  console.log('okay so this should be groups array right now yall', result);
  return  chromeStorageGet(chrome.storage.sync.get(['GROUP2']))
  .then((result2) => {
      result.push(result2);
      return result;
     })
  })
.then((result) => {
  console.log("so groups array with group 2 in it now", result)
});




    
    chrome.storage.sync.get(['GROUP1'], (result) => {
      //console.log("this is first result should be group 2", result);
      console.log("this is group1");
      console.log(".");
      console.log(".");
      console.log(".");
      console.log(result);


      chrome.storage.sync.get(['GROUP2'], (result2) => {
        console.log("this is first result should be group 1", result);
        console.log("this is group2");
        console.log(result2);
        console.log(".");
        console.log(".");
        console.log(".");
        console.log("yeah baby this gets the rule set earlire  Group 2 first up is Color", 
        result2['GROUP2']['COLOR'], 'second is name',
        result2['GROUP2']['NAME'], 'lastly is url', result2["GROUP2"]["URL"]);

        
              //console.log("yeah baby this gets the rule set earlire first up is Color", 
            // result['GROUP1']['COLOR'], 'second is name',
              //result['GROUP1']['NAME'], 'lastly is url', result["GROUP1"]["URL"]);
              
              console.log("yeah baby this gets the rule set earlire first up is Color", 
              result['GROUP1']['COLOR'], 'second is name',
              result['GROUP1']['NAME'], 'lastly is url', result["GROUP1"]["URL"]);
              



              let url = tab.url;
              console.log(url);
              let searchTerm = result['GROUP1']["URL"];






              
            // console.log("this is rule term", ruleTerm);
              //first parameter determines if url which is current tab url has the search term in it
              //this will later be updated to include group rules
              //second paramter deteremines if the grouped tab array has an excact match for this tab array, if it 
              //does this does not execute  and adds url toprevents infinite loops otherwise this fires infinietly 
              if(url.includes(searchTerm) && !groupedTabArray.includes(url)) {
                console.log("gropu created");
                if(groupIDArray[0]) {
                  console.log("group id found yay youu1");
                  chrome.tabs.group({tabIds: tabId, groupId: groupIDArray[0]}).then((id) => {
                    console.log("groupd id is ", id);
                    groupIDArray.push(id);
                    groupedTabArray.push(url);
                  });
                }
                else {
                  chrome.tabs.group({tabIds: tabId}).then((id) => {
                    console.log("groupd id is ", id);
                    groupIDArray.push(id);
                    groupedTabArray.push(url);
                  });
                }
                
            }





                })

    
});

/*

    let url = tab.url;
    console.log(url);
    let searchTerm = "john";
    let ruleTerm = rule1;
    console.log("this is rule term", ruleTerm);
    //first parameter determines if url which is current tab url has the search term in it
    //this will later be updated to include group rules
    //second paramter deteremines if the grouped tab array has an excact match for this tab array, if it 
    //does this does not execute  and adds url toprevents infinite loops otherwise this fires infinietly 
    if(url.includes(searchTerm) && !groupedTabArray.includes(url)) {
      console.log("gropu created");
      if(groupIDArray[0]) {
        console.log("group id found yay youu1");
        chrome.tabs.group({tabIds: tabId, groupId: groupIDArray[0]}).then((id) => {
          console.log("groupd id is ", id);
          groupIDArray.push(id);
          groupedTabArray.push(url);
         });
      }
      else {
        chrome.tabs.group({tabIds: tabId}).then((id) => {
          console.log("groupd id is ", id);
          groupIDArray.push(id);
          groupedTabArray.push(url);
         });
      }
      
  }
   

    */
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