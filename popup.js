chrome.tabGroups.query({}, (obj) => {
    if(obj) {
        console.log("succesfull?" + obj);
    }
    else {
        console.log("unsuccesfull")
    }

}); 

console.log("did this work at least?");