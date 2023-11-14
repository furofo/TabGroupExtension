namespace AutoTabGroups {
console.log("testing js");
// USE THIS  to quickly test setting and delte rules functionality

function removeTabGroups() {
    chrome.storage.sync.remove('TABGROUPS', function() {
        console.log('Tab Groups property removed from chrome storage');
    });
  }
  type TabGroup = {
    [key: string]: {
      COLOR: string;
      NAME: string;
      URL: string[];
    };
  };
  
  //use this to manualy setTabGroups to testing function
  function setTabGroups(tabGroupsArray: TabGroup[]) {
    chrome.storage.sync.set({ TABGROUPS: tabGroupsArray});
  
  }
 // this sets desidred number of test rules to make sure rules set and function correctly
  let createXNumbersTabGroupsArray = function(numTestRules: number): TabGroup[] {
    let tabGroupsArray: TabGroup[] = [];
    for (let i = 0; i < numTestRules; i++) {
      let groupNumber = "GROUP" + (i + 1);
      const newGroup: TabGroup = {
        [groupNumber]: {
          "COLOR": "blue",
          "NAME": "TEST" + (i+1),
          "URL": ["TEST" + i]
        }
      };
      tabGroupsArray.push(newGroup);
    }
    return tabGroupsArray;
  }
  
}