

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


  let groupedTabArray = [];
  let groupIDArray = [];
  // listener that can tell if tab changes and new html page loads or if new tab is opened
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab)  => {

  


//this is promise chaing of chrome storage .gets 
chromeStorageGet(chrome.storage.sync.get(['GROUP1']))
.then((result) => {
  let groupsArray = [];
  groupsArray.push(result);
  return groupsArray;
  })
.then((result) => {
  return  chromeStorageGet(chrome.storage.sync.get(['GROUP2']))
  .then((result2) => {
      result.push(result2);
      return result;
     });
  })
.then((result) => {
  return chromeStorageGet(chrome.storage.sync.get(['GROUP3']))
  .then((result2) => {
    result.push(result2);
    return result;
  });
}).then((result) => {
  
  console.log("so groups array with group 3 in it now", result);
  let url = tab.url;
  console.log(url);
  for(let i = 0; i < result.length; i++) {
    let group = 'GROUP' + String(i + 1);
    if(result[i].hasOwnProperty(group)) {
      let searchTerm = result[i][group]['URL'];
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

    }
    
  }

});

});
