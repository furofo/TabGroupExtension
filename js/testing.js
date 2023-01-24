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
  
  let createXNumbersTabGroupsArray = function(numTestRules) {
    let tabGroupsArray = [];
    for (let i = 0; i < numTestRules; i++) {
      let groupNumber = "GROUP" + (i + 1);
      tabGroupsArray.push ( {
        [groupNumber]: {
          "COLOR": "blue",
          "NAME": "TEST" + (i+1),
          "URL":["TEST" + i]
        }
      });
      
    }
    return tabGroupsArray;
  }
  