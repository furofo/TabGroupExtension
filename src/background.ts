namespace AutoTabGroups {
// looks through a list of search terms and tells you if url is in them
let isSearchTermInUrl =  (url: string, searchTerms: string[]) => {
  if(searchTerms) {
    for(let i = 0; i < searchTerms.length; i++) {
      if(url.includes(searchTerms[i])) {
        return true;
      }
    }
    return false;
  }
}

interface BrowserTabGroup {
  title: string;
  id: number;
}

//function looks through a current browswerTabGroupObject and a then a chromeStorageTabGroup Object and if the name of one of the tab group objects
// in the the browser matches the name from chrome storage object it puts in that tab group and returns true, otherwise returns false
function groupTabIfTabGroupExistsInBrowser(browserTabGroupObject, chromeStorageTabGroupObject, tabId) {
  let matchingTabGroupInBrowser = false;
  for (let i = 0; i < browserTabGroupObject.length; i++) {
    if (
      chromeStorageTabGroupObject &&
      browserTabGroupObject[i].title === chromeStorageTabGroupObject.NAME
    ) {
      matchingTabGroupInBrowser = true;
      chrome.tabs.group({
        tabIds: tabId,
        groupId: browserTabGroupObject[i].id,
      }).catch((e) => console.log(''));
    }
  }
  return matchingTabGroupInBrowser;
}
// listener that can tell if a tab changes or a  new html page loads or if a new tab is opened
chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
  // only exectue if tabs are fully loaded
  if (changeInfo.status === 'complete' && tab.status === 'complete' && tab.url !== undefined ) {
    //this gets a list of all tab groups in broswer and returns an object of them
    let browserTabGroupObject = await chrome.tabGroups.query({});
    // this gets a list of all tab groups from chrome storage with name of TabGroups so what is saved to google accounts equialivent to local storage essetnially
    let chromeStorageTabGroupObject = await chrome.storage.sync.get(['TABGROUPS']);
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
});

//functoin that uses chrome commands api to collapse all tab groups when ctrl + shift + c is pressed 
// may modify this later to take the broswerTabGroupObjectDirectly
function closeTabGroupsWhenCtrlShiftY() {
    // alert('KEyboard short cut ctr-shift-y used');
    chrome.tabGroups.query({}).then((browserTabGroupObject) => {
    if (typeof browserTabGroupObject !== "undefined" && browserTabGroupObject.length > 0) {
      for (let i = 0; i < browserTabGroupObject.length; i++) {
        chrome.tabGroups.update(browserTabGroupObject[i].id, { collapsed: true });
      }
    }
    });
}
//functoin that uses chrome commands api to open all tab groups when ctrl + shift + i is pressed 
// may modify this later to take the broswerTabGroupObjectDirectly
function openTabGroupsWhenCtrlShiftH() {
  // alert('KEyboard short cut ctr-shift-y used');
  chrome.tabGroups.query({}).then((browserTabGroupObject) => {
  if (typeof browserTabGroupObject !== "undefined" && browserTabGroupObject.length > 0) {
    for (let i = 0; i < browserTabGroupObject.length; i++) {
      chrome.tabGroups.update(browserTabGroupObject[i].id, { collapsed: false });
    }
  }
  });
}
////functoin that uses chrome commands api to toggle all tab groups when ctrl + shift + t is pressed 
function toggleTabGroupsWhenCtrlShiftU() {
  // alert('KEyboard short cut ctr-shift-t used');
  chrome.tabGroups.query({}).then((browserTabGroupObject) => {
    if (typeof browserTabGroupObject !== "undefined" && browserTabGroupObject.length > 0) {
      // Get the collapsed value of the first tab group
      const collapsedValue = browserTabGroupObject[0].collapsed;
      // Toggle the collapsed value for all tab groups
      for (let i = 0; i < browserTabGroupObject.length; i++) {
        chrome.tabGroups.update(browserTabGroupObject[i].id, { collapsed: !collapsedValue });
      }
    }
  });
}
// listen for commands and call correct functoin to close or toggle groups accordingly 
chrome.commands.onCommand.addListener((command) => {
  if(command == "toggle-groups") {
    toggleTabGroupsWhenCtrlShiftU()
  }
  else if (command == "close-groups") {
    closeTabGroupsWhenCtrlShiftY()
  }
  else if (command == "open-groups") {
    openTabGroupsWhenCtrlShiftH()
  }
});
}