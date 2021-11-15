// make chormestorage get a promise instead of callback avoid callback hell muahhahahah
function chromeStorageGet(result) {
  return new Promise((resolve, reject) => {
    if(resolve) {
      resolve(result)
    }
    else {
     // console.log("didn't work");
    }

  });
}

  // variables to store objects for groups 1, 2, 3, and put in array to loop through later for any associated tab group ids
  let groupedTabArray = [];
  let group1 = { GROUP1: {} }
  let group2 = { GROUP2: {} }
  let group3 = {GROUP3: {}}
  let groupIDArray = [group1, group2, group3];

  //when a tab group is completly removed this fires
  chrome.tabGroups.onRemoved.addListener(
    (tabGroup) => {
    
     for(let i = 0; i < groupIDArray.length; i++) {
       let group = 'GROUP' + String(i + 1);
       if(groupIDArray[i][group].hasOwnProperty('TABGROUP') && groupIDArray[i][group]['TABGROUP'] == tabGroup.id) {
        delete  groupIDArray[i][group]['TABGROUP'];
        console.log("id", tabGroup.id, "deleted");
       }

     }
    }
  );

  // listener that can tell if tab changes and new html page loads or if new tab is opened
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab)  => {

//only exectue if tabs are fully loaded
if(changeInfo.status == 'complete' && tab.status == 'complete' && tab.url != undefined){
  console.log("on updated was called \n \n \n ");
  //this is promise chain of chrome.storage.get instead of callback
chromeStorageGet(chrome.storage.sync.get(['TABGROUPS']))
.then((result) => {
  let url = tab.url;
  for(let i = 0; i < result['TABGROUPS'].length; i++) {
    let group = 'GROUP' + String(i + 1);
    if(result['TABGROUPS'][i].hasOwnProperty(group)) {
      let searchTerm = result['TABGROUPS'][i][group]['URL'];
      if(url.includes(searchTerm)) {
          if(tab.groupId != -1) {
           // console.log("this tab is already in group \n \n \n");

          }
          else if(groupIDArray[i][group].hasOwnProperty("TABGROUP")) {
            chrome.tabs.group({tabIds: tabId, groupId: groupIDArray[i][group]["TABGROUP"]}).then((id) => {
             // console.log("Group ID was found \n \n \n follows rule in gorup ", group, "\n\n id is :", id);
            });

          }
          else {
            chrome.tabs.group({tabIds: tabId}).then((id) => {
             // console.log("Not in group \n \n \n \n New group idea created it is:  ", id);
              groupIDArray[i][group]["TABGROUP"] = id;
            });
           

          }

      }

    }
    
  }

});
    }


});
