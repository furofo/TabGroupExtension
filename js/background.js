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

let isSearchTermInUrl =  (url, searchTerms) => {
  if(searchTerms) {
    for(let i = 0; i < searchTerms.length; i++) {
      if(url.includes(searchTerms[i])) {
        return true;
      }
    }
    return false;
  }
}
// listener that can tell if a tab changes or a  new html page loads or if a new tab is opened
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  // only exectue if tabs are fully loaded
  if (changeInfo.status === 'complete' && tab.status === 'complete' && tab.url !== undefined ) {
    //this gets a list of all tab groups in broswer and returns an object of them
    chrome.tabGroups.query({}).then((tabGroupObj) => {
      // this is promise chain of chrome.storage.get instead of callback
      chromeStorageGet(chrome.storage.sync.get(['TABGROUPS'])).then(
        (result) => {
          //gets the url of the updated tab
          const { url } = tab;
          if (Object.keys(result).length !== 0) {
            let ungroup = true;
            for (let i = 0; i < result.TABGROUPS.length; i += 1) {
              const group = `GROUP${String(i + 1)}`;
              if ( Object.prototype.hasOwnProperty.call(result.TABGROUPS[i], group) ) {
                const searchTerms = result.TABGROUPS[i][group].URL;
                if (isSearchTermInUrl(url, searchTerms)) {
                  let matchingTabGroupInBrowser = false;
                  ungroup = false;
                  //look through all the currrent tab groups if the name matches the crome storage tab groups name pu tin their
                  for (let j = 0; j < tabGroupObj.length; j++) {
                    if (
                      result.TABGROUPS[i][group] &&
                      // tab.groupId === -1 &&
                      tabGroupObj[j].title === result.TABGROUPS[i][group].NAME
                    ) {
                      matchingTabGroupInBrowser = true;
                      chrome.tabs.group({
                        tabIds: tabId,
                        groupId: tabGroupObj[j].id,
                      });
                    }
                  }
                  //if it loops through all tab groups in window and no matches found create a new tab group
                  if (!matchingTabGroupInBrowser) {
                    // if tab doesn't have a group id already and no other tabs following that same
                    // group rule, make a new tab group and update localvariable groupIDArray with a
                    // property TABGROUP that holds that id
                    chrome.tabs.group({ tabIds: tabId }).then((id) => {
                      chrome.tabGroups.update(id, {
                        title: result.TABGROUPS[i][group].NAME,
                        color: result.TABGROUPS[i][group].COLOR,
                      });
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