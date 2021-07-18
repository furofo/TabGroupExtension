console.log("did this work at least?");



let objy = {color:'yellow'};

chrome.tabGroups.query(objy).then((obj) => {
        if(objy.length < 1) { console.log("succesfull?" + JSON.stringify(obj));}
        else {console.log("did not find!")}
       
   
}).catch(() => {
    console.log('error??');
});

/*
chrome.tabGroups.query({}, (obj) => {
    if(obj) {
        console.log("succesfull?" + JSON.stringify(obj));
    }
    else {
        console.log("unsuccesfull")
    }

}); 
*/


chrome.tabGroups.get(987625515, (obj) => {
    if (obj) {
        console.log("this was succesfull too shoud return blue group"  + JSON.stringify(obj));

    }
    else {
        console.log("this second check did not work");
    }

});

/* output wiht one blue tab was did this work at least?
background.js:5 succesfull?[{"collapsed":false,"color":"blue","id":838850965,"title":"hello","windowId":16}]*/


/* output with two groups [{"collapsed":true,"color":"blue","id":987625515,"title":"hello","windowId":10},
{"collapsed":true,"color":"red","id":1437632484,"title":"test2","windowId":10}]*/