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
  let group1 = {
    GROUP1: {

    }
  }

  let group2 = {
    GROUP2: {
      
    }
  }

  let group3 = {
    GROUP3: {
      
    }
  }
  let groupIDArray = [group1, group2, group3];
  // listener that can tell if tab changes and new html page loads or if new tab is opened
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab)  => {
  console.log("this is tab Group Id", tab.groupId);

  
let returnFoundTabGroupID = function(arr) {
  for(let i = 0; i < arr.length; i++) {

  }
}

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
  
  let url = tab.url;
  for(let i = 0; i < result.length; i++) {
    let group = 'GROUP' + String(i + 1);
    if(result[i].hasOwnProperty(group)) {
      let searchTerm = result[i][group]['URL'];

      if(url.includes(searchTerm)) {
          if(tab.groupId != -1) {
            console.log("this tab is already in group");

          }
          else if(groupIDArray[i][group].hasOwnProperty("TABGROUP")) {
            chrome.tabs.group({tabIds: tabId, groupId: groupIDArray[i][group]["TABGROUP"]}).then((id) => {
              console.log("Group ID was found \n \n \n follows rule in gorup ", group, "\n\n id is :", id);
            });

          }

          else {
            chrome.tabs.group({tabIds: tabId}).then((id) => {
              console.log("New group idea created it is:  ", id);
              groupIDArray[i][group]["TABGROUP"] = id;
            });
           

          }

      }



/*
      if(url.includes(searchTerm) && !groupedTabArray.includes(url)) {
        console.log("here is group id", groupIDArray);
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




    }
    
  }

});

});
