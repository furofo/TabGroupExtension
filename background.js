// make chormestorage get a promise instead of callback avoid callback hell muahhahahah
console.log("hello ??? ");
function chromeStorageGet(result) {
  return new Promise((resolve, reject) => {
    if (resolve) {
      resolve(result);
    } else {
      reject();
    }
  });
}
// variables to store objects for groups 1, 2, 3, and put in array to loop through later
// for any associated tab group ids


const groupIDArray = [{ GROUP1: {} }, { GROUP2: {} }, { GROUP3: {} }];
// when a tab group is completly removed this fires
// chrome.tabGroups.onRemoved.addListener((tabGroup) => {
//   for (let i = 0; i < groupIDArray.length; i += 1) {
//     const group = `GROUP${String(i + 1)}`; 
//     if (Object.prototype.hasOwnProperty.call(groupIDArray[i], group)
//     && groupIDArray[i][group].TABGROUP === tabGroup.id) {
//       delete groupIDArray[i][group].TABGROUP;
//     }
//   }
// });
// // listener that can tell if tab changes and new html page loads or if new tab is opened
// chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
//   // only exectue if tabs are fully loaded
//   if (changeInfo.status === 'complete' && tab.status === 'complete'
//   && tab.url !== undefined) {
//     // this is promise chain of chrome.storage.get instead of callback
//     chromeStorageGet(chrome.storage.sync.get(['TABGROUPS'])).then((result) => {
//       const { url } = tab;
//       for (let i = 0; i < result.TABGROUPS.length; i += 1) {
//         const group = `GROUP${String(i + 1)}`;
//         if (Object.prototype.hasOwnProperty.call(result.TABGROUPS[i], group)) {
//           const searchTerm = result.TABGROUPS[i][group].URL;
//           if (url.includes(searchTerm)) {
//             // if tab has a group id already do nothing, if it doesn't see if the locla
//             // object for same group numberhas a property callled tab group, this stores the
//             // tab group ID and means already a tab that, that follows same group rule and matched,
//             // if so then group it to that existing tab group id
//             if (tab.groupId === -1 && Object.prototype.hasOwnProperty.call(groupIDArray[i][group], 'TABGROUP')) {
//               chrome.tabs.group({
//                 tabIds: tabId,
//                 groupId: groupIDArray[i][group].TABGROUP,
//               });
//             } else {
//               // if tab doesn't have a group id already and no other tabs following that same
//               // group rule, make a new tab group and update localvariable groupIDArray with a
//               // property TABGROUP that holds that id
//               chrome.tabs.group({ tabIds: tabId }).then((id) => {
//                 chrome.tabGroups.update(id, {
//                   title: result.TABGROUPS[i][group].NAME,
//                   color: result.TABGROUPS[i][group].COLOR,
//                 });
//                 groupIDArray[i][group].TABGROUP = id;
//                 console.log("New Tab Group Created id is", id, "\n here is groupdIDARRAy in total", groupIDArray);
//               });
//             }
//           }
//         }
//       }
//             //unit test here
//               test(result, result);
//     });
//   }
// });



chrome.commands.onCommand.addListener((command) => {
  console.log(`Command "${command}" triggered`);
  // alert('KEyboard short cut ctr-shift-y used');
  console.log("custom shortcut ctr + shift + y used")
});
let results = {
  total: 0,
  bad: 0
};
