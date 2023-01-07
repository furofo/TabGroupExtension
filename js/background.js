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

//function looks through a current browswerTabGroupObject and a the a chromeStorageTabGroup Object and if the name of one of the tab group objects
// in the the browser matches the name from chrome storage object it puts in that tab group and returns true, otherwise returns false
function groupTabIfTabGroupExistsInBrowser(browserTabGroupObject, chromeStorageTabGroupObject, tabId) {
  let matchingTabGroupInBrowser = false;
  console.log("chrome storage object is " + chromeStorageTabGroupObject);
  for (let i = 0; i < browserTabGroupObject.length; i++) {
    if (
      chromeStorageTabGroupObject &&
      browserTabGroupObject[i].title === chromeStorageTabGroupObject.NAME
    ) {
      matchingTabGroupInBrowser = true;
      chrome.tabs.group({
        tabIds: tabId,
        groupId: browserTabGroupObject[i].id,
      }).catch((e) => console.log(e));
    }
  }
  return matchingTabGroupInBrowser;
}
// listener that can tell if a tab changes or a  new html page loads or if a new tab is opened
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  // only exectue if tabs are fully loaded
  if (changeInfo.status === 'complete' && tab.status === 'complete' && tab.url !== undefined ) {
    //this gets a list of all tab groups in broswer and returns an object of them
    chrome.tabGroups.query({}).then((browserTabGroupObject) => {
      // this is promise chain of chrome.storage.get instead of callback
      chromeStorageGet(chrome.storage.sync.get(['TABGROUPS'])).then(
        (chromeStorageTabGroupObject) => {
          //gets the url of the updated tab
          const { url } = tab;
          if (Object.keys(chromeStorageTabGroupObject).length !== 0) {
            let ungroup = true;
            let matchingTabGroupInBrowser = false;
            for (let i = 0; i < chromeStorageTabGroupObject.TABGROUPS.length; i += 1) {
              const group = `GROUP${String(i + 1)}`;
              const currentChromeStorageTabGroup = chromeStorageTabGroupObject.TABGROUPS[i];
              if ( Object.prototype.hasOwnProperty.call(currentChromeStorageTabGroup, group) ) {
                const searchTerms = currentChromeStorageTabGroup[group].URL;
                if (isSearchTermInUrl(url, searchTerms)) {
                  ungroup = false
                  matchingTabGroupInBrowser = groupTabIfTabGroupExistsInBrowser(browserTabGroupObject, currentChromeStorageTabGroup[group], tabId);
                  // if tab doesn't have a group id already and no other tabs following that same
                    // group rule, make a new tab group and update localvariable groupIDArray with a
                    // property TABGROUP that holds that id
                  if (!matchingTabGroupInBrowser) {
                    chrome.tabs.group({ tabIds: tabId }).then((id) => {
                      chrome.tabGroups.update(id, {
                        title: chromeStorageTabGroupObject.TABGROUPS[i][group].NAME,
                        color: chromeStorageTabGroupObject.TABGROUPS[i][group].COLOR,
                      });
                    });
                  }
              }
            }
          }
          //if this code exectutes no matches where found on this tab id so ungroup this tab id from tabgroups if it is in one.
          if (ungroup) {chrome.tabs.ungroup(tabId)}
        }
      }
      );
    });
  }
});
chrome.commands.onCommand.addListener((command) => {
  console.log(`Command "${command}" triggered`);
  // alert('KEyboard short cut ctr-shift-y used');
  console.log("custom shortcut ctr + shift + y used")
  chrome.tabGroups.query({}).then((browserTabGroupObject) => {
    console.log("tab gorup object is here", browserTabGroupObject)
    console.log("tab goup object id", browserTabGroupObject[0].id);
    console.log("tab gorup object length", browserTabGroupObject.length);
    chrome.tabGroups.update(browserTabGroupObject[0].id , {collapsed: true});
  });
});