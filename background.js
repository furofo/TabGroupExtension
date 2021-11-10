

// make chormestorage get a promise instead of callback avoid callback hell muahhahahah
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

/*
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
  */

  //define gloabl variable to keep track of things.

  let groupedTabArray = [];
  let groupIDArray = [];
  // listener that can tell if tab changes and new html page loads or if new tab is opened
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab)  => {

  


//this is promise chaing of chrome storage .gets 
chromeStorageGet(chrome.storage.sync.get(['GROUP1']))
.then((result) => {
  console.log("this is practice with promise instead of call back")
  console.log("..");
  console.log("...");
  console.log("..");
  console.log("...");
  console.log("this will be group 1");
  console.log(result);
  let groupsArray = [];
  groupsArray.push(result);
  return groupsArray;
  })
.then((result) => {
  console.log('okay so this should be groups array variable right now yall', result);
  return  chromeStorageGet(chrome.storage.sync.get(['GROUP2']))
  .then((result2) => {
    console.log("..");
    console.log("...");
    console.log("..");
    console.log("...");
    console.log("this will be group 2");
    console.log(result2);
      result.push(result2);
      return result;
     });
  })
.then((result) => {
  console.log("so groups array with group 2 in it now", result)
  return chromeStorageGet(chrome.storage.sync.get(['GROUP3']))
  .then((result2) => {
    console.log("..");
    console.log("...");
    console.log("..");
    console.log("...");
    console.log("this will be group 3");
    console.log(result2);
    result.push(result2);
    return result;
  });
}).then((result) => {
  
  console.log("so groups array with group 3 in it now", result);
  let url = tab.url;
  console.log(url);
  let searchTerm = result[0]['GROUP1']["URL"];

  if(url.includes(searchTerm) && !groupedTabArray.includes(url)) {
    console.log("group created");
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

});




    
  /*  chrome.storage.sync.get(['GROUP1'], (result) => {
      //console.log("this is first result should be group 2", result);
      


      chrome.storage.sync.get(['GROUP2'], (result2) => {
        

        



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
*/

});
