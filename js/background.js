// make chormestorage get a promise instead of callback avoid callback hell muahhahahah
function chromeStorageGet(result) {
  return new Promise((resolve, reject) => {
    if (resolve) {
      resolve(result);
    } else {
      reject();
    }
  });
}
// variables to store objects for groups 1, 2, 3, 4, 5, 6 and put in array to loop through later
// for any associated tab group ids
const groupIDArray = [{ GROUP1: {} }, { GROUP2: {} }, { GROUP3: {} }, { GROUP4: {} }, { GROUP5: {} }, { GROUP6: {} }, { GROUP7: {} }, { GROUP8: {} }];
// when a tab group is completly removed this fires and clears out local groupIdArSrays TABGROUP Property
chrome.tabGroups.onRemoved.addListener((tabGroup) => {
  for (let i = 0; i < groupIDArray.length; i += 1) {
    const group = `GROUP${String(i + 1)}`;
    if (
      Object.prototype.hasOwnProperty.call(groupIDArray[i], group) &&
      groupIDArray[i][group].TABGROUP === tabGroup.id
    ) {
      delete groupIDArray[i][group].TABGROUP;
    }
  }
});
//function takes two arguments url which will be url of active tab
// and searchTerms which is an array of Terms to search in URL for
// if any searchTerm in erray is a match return true
//if it gets to end of loop and ntohign found return false/
let searchTermInUrl =  (url, searchTerms) => {
  if(searchTerms) {
    for(let i = 0; i < searchTerms.length; i++) {
      if(url.includes(searchTerms[i])) {
        return true;
      }
    }
    return false;
  }
}
// listener that can tell if tab changes and new html page loads or if new tab is opened
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  // only exectue if tabs are fully loaded
  if (changeInfo.status === 'complete' && tab.status === 'complete' &&tab.url !== undefined ) {
    //this gets a list of all tab groups in broswer and returns an object of them
    chrome.tabGroups.query({}).then((tabGroupObj) => {
      // this is promise chain of chrome.storage.get instead of callback
      chromeStorageGet(chrome.storage.sync.get(['TABGROUPS'])).then(
        (result) => {
          const { url } = tab;
          if (Object.keys(result).length !== 0) {
            let ungroup = true;
            for (let i = 0; i < result.TABGROUPS.length; i += 1) {
              const group = `GROUP${String(i + 1)}`;
              if ( Object.prototype.hasOwnProperty.call(result.TABGROUPS[i], group) ) {
                const searchTerms = result.TABGROUPS[i][group].URL;
                if (searchTermInUrl(url, searchTerms)) {
                  let match = false;
                  ungroup = false;
                  for (let j = 0; j < tabGroupObj.length; j++) {
                    if (
                      result.TABGROUPS[i][group] &&
                      // tab.groupId === -1 &&
                      tabGroupObj[j].title === result.TABGROUPS[i][group].NAME
                    ) {
                      match = true;
                      chrome.tabs.group({
                        tabIds: tabId,
                        groupId: tabGroupObj[j].id,
                      });
                    }
                  }
                  //if it loops through all tab groups in window and no matches found create a new tab group
                  if (!match) {
                    // if tab doesn't have a group id already and no other tabs following that same
                    // group rule, make a new tab group and update localvariable groupIDArray with a
                    // property TABGROUP that holds that id
                    chrome.tabs.group({ tabIds: tabId }).then((id) => {
                      chrome.tabGroups.update(id, {
                        title: result.TABGROUPS[i][group].NAME,
                        color: result.TABGROUPS[i][group].COLOR,
                      });
                      groupIDArray[i][group].TABGROUP = id;
                    });
                  }
                }
              }
            }
            if (ungroup) {chrome.tabs.ungroup(tabId)}
          }
        }
      );
    });
  }
});