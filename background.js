console.log("did this work at least?");

chrome.tabGroups.query({}, (obj) => {
    if(obj) {
        console.log("succesfull?" + JSON.stringify(obj));
    }
    else {
        console.log("unsuccesfull")
    }

}); 


/* output wiht one blue tab was did this work at least?
background.js:5 succesfull?[{"collapsed":false,"color":"blue","id":838850965,"title":"hello","windowId":16}]*/
