console.log("testing js");
// USE THIS FOR TESTING TO REMOVE ALL TABGROUPS WHEN DELETE AND ADDD FUNCTOINS MES THINGS UP testing functoin

function removeTabGroups() {
    chrome.storage.sync.remove('TABGROUPS', function() {
        console.log('Tab Groups property removed from chrome storage');
    });
  }
  
  //use this to manualy setTabGroups to testing function
  function setTabGroups(tabGroupsArray) {
    chrome.storage.sync.set({ TABGROUPS: tabGroupsArray});
  
  }
  type TabGroup = {
    [key: string]: {
      COLOR: string;
      NAME: string;
      URL: string[];
    };
  };
  
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
  
  