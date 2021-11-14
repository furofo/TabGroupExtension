//get variables for buttons ahere
let deleteButton = document.getElementById('delete-group');
let editAddButton = document.getElementById('edit-add-group');
let tabGroupsArray = [];

//function that switches a btn elements inner html between two strings, first argument is button element, second is current text
//third is text to toggle between
let toggleButtonText = function(btn, str1, str2) {
  if(btn.innerHTML == str1) {
    btn.innerHTML = str2;
  }
  else {
    btn.innerHTML = str1;
  }
}

//function that switches an elemtns display between none and block
let toggleElementDisplay = function(elem) {
  if (window.getComputedStyle(elem, null).display == 'block') {
    elem.style.display = 'none';
  }
  else {
    elem.style.display = 'block';
  }
}

//this function toggles input disabled from true and false and border to none and solid px effectively
let toggleInputDisabled = function(elem) {
  elem.disabled =  !elem.disabled;
        if(elem.disabled) {
          elem.style.border = "none";
        }
        else {
          elem.style.border = '1px solid grey';
        }
}

//this function hides and unhides the dropdown box for the color picker box
let toggleDropdownBox = function (elem) {
  if(window.getComputedStyle(elem, null).display == 'none') {
    elem.style.display = "inline-block";
  }
  else {
    elem.style.display = "none";
  }
}

//functoin to get input value as typed and update that inputs value attribute with what was typed
function updateInputWhenTyped(e) {
    e.target.setAttribute('value', e.target.value);
    console.log(e.target.value);
  }

// add listener to first name value and use this method
document.getElementById('first-name').addEventListener('input', updateInputWhenTyped);

//when delet button clicked removes the group number from google sync and from pop up html of extension
deleteButton.addEventListener("click", async function() {
  //logic to see if input is checked
  let isCheckedArray = document.querySelectorAll('.container input');
  let checkedInputFound = false;
  for(let i = 0; i < isCheckedArray.length; i++) {
    let checkedNameField = document.querySelectorAll(".name")[i];
    let checkedUrlField = document.querySelectorAll(".flex-center")[i];
    let box = document.querySelectorAll(".box")[i];
    //this runs on last item, if it is checked remove everything and end here if not just return and do nothing
    if(i == isCheckedArray.length - 1) {
      if(isCheckedArray[i].checked) {
        checkedNameField.setAttribute('value', '');
        checkedNameField.value = '';
        checkedUrlField.setAttribute('value', '');
        checkedUrlField.value = '';
        box.setAttribute('color', 'grey' );
        box.style.backgroundColor = 'grey';
        let checkedItem = document.querySelectorAll(".container input")[i];
        checkedItem.checked = false;
        checkedInputFound = true;

        // logic to delete rule here 
      let group = "GROUP" + String(i + 1);

     // chrome.storage.sync.remove(group).then(() => {console.log("group", group, " was removed")});
     //logic to remove this from tabsGroup Array which should be array of all groups retrieved from google Sync
      if (tabGroupsArray[i].hasOwnProperty(group)) {
        tabGroupsArray[i][group] = {};
      }
      else {
        console.log("tabs group array does not have group#", group, "\n \n")
      }



      chrome.storage.sync.set({TABGROUPS: tabGroupsArray}).then(() => {console.log('Groups Removed and rest in chrome sync')});
        return;
      }
      if(checkedInputFound) {
        chrome.storage.sync.set({TABGROUPS: tabGroupsArray}).then(() => {console.log('Groups Removed and rest in chrome sync')});
        return;
      }

     

    }
    if(isCheckedArray[i].checked) {
      checkedNameField.setAttribute('value', '');
      checkedNameField.value = '';
      checkedUrlField.setAttribute('value', '');
      checkedUrlField.value = '';
      box.setAttribute('color', 'grey' );
      box.style.backgroundColor = 'grey';
      checkedInputFound = true;
      let checkedItem = document.querySelectorAll(".container input")[i];
      checkedItem.checked = false;

      // logic to delete rule here 
      let group = "GROUP" + String(i + 1);
      if (tabGroupsArray[i].hasOwnProperty(group)) {
        tabGroupsArray[i][group] = {};
      }
      else {
        console.log("tabs group array does not have group#", group, "\n \n")
      }
     // chrome.storage.sync.remove(group).then(() => {console.log("group", group, " was removed")});
      
    }
  }
  alert("No Group Checked! Please Check Tab Group Rule to Delete!")
});









editAddButton.addEventListener("click", async function()  {
    let isCheckedArray = document.querySelectorAll('.container input');
    let checkedInputFound = false;

  
    console.log("this is tab groups array", tabGroupsArray);
    //if save button clicked basiclaly because should be only Save Button when delete button is not visible
    if (window.getComputedStyle(deleteButton, null).display == 'none') {
      let firstName = document.getElementById("first-name").value;
      let firstURL = document.getElementById("first-url").value;
      let firstBox = document.getElementById("first-box").getAttribute("value");
      tabGroupsArray = [];
      console.log(document.getElementById("first-box"));
           //this coges through and unchecks everything that is checked
        for(let i = 0; i < isCheckedArray.length; i++) {
          let inputBox = document.querySelectorAll(".container")[i];

          inputBox.style.pointerEvents = "auto";
          let checkedNameField = document.querySelectorAll(".name")[i];
          let checkedUrlField = document.querySelectorAll(".flex-center")[i];
          let dropDownBox = document.querySelectorAll(".dropdown")[i];
          let boxField = document.querySelectorAll(".box")[i];
          let groupNumber = 'GROUP' + String(parseInt(i + 1));
          if(isCheckedArray[i].checked) {
           
            if(checkedNameField.value && checkedUrlField.value && boxField.getAttribute("value") != "grey") {
              console.log("this is group number", groupNumber);

            tabGroupsArray.push( {
              [groupNumber]: {
                COLOR: document.querySelectorAll(".box")[i].getAttribute("value"),
                NAME: checkedNameField.value,
                URL: checkedUrlField.value,
              }
            });

            /*
            chrome.storage.sync.set({[groupNumber]: {
              COLOR: document.querySelectorAll(".box")[i].getAttribute("value"),
              NAME: checkedNameField.value,
              URL: checkedUrlField.value,
            }}, function() {
              console.log(groupNumber + " was set");
            });

            */
            
           


            toggleInputDisabled(checkedUrlField);
            toggleInputDisabled(checkedNameField);
            toggleDropdownBox(dropDownBox);
            isCheckedArray[i].checked = false;
              
            }
            /*
            else {
              alert("Fields in a rule are empty, or color is not selected please fill out all forms / select color before saving");
              return;
            }
            */

            //this unchecks everythign after save button is hit
           let checkedItem = document.querySelectorAll(".container input")[i];
           checkedItem.checked = false;
      
          }

          else {
            //logic to go heree to check if name fiels are blank
            
       
            //logic to go heree to check if name fiels are blank
            if(checkedNameField.value && checkedUrlField.value && boxField.getAttribute("value") != "grey") {
            tabGroupsArray.push( {
              [groupNumber]: {
                COLOR: document.querySelectorAll(".box")[i].getAttribute("value"),
                NAME: checkedNameField.value,
                URL: checkedUrlField.value,
              }

             });
             }

            else {
              tabGroupsArray.push( {
              
              });

            }

         
          
        
          }

         
          
        }


        chrome.storage.sync.set({TABGROUPS:  tabGroupsArray }, function() {
        //  tabGroupsArray = [];
          console.log('GROUPS' + " was set");
          tabGroupsArray = [];
        });
        
        toggleElementDisplay(deleteButton);
        toggleButtonText(this,  'Save Group(s)', 'Edit/Add Group');

      
      
    }
    //if edit button clicked make all the checked stuff editable basically
    else {
      for(let i = 0; i < isCheckedArray.length; i++) {
        let inputBox = document.querySelectorAll(".container")[i];
        inputBox.style.pointerEvents = "none";
        if(i == isCheckedArray.length - 1 ) {
          //this is handlign for last check box returns if it is checked so doesn't throw error logic
          if(isCheckedArray[i].checked) {
            let checkedNameField = document.querySelectorAll(".name")[i];
            let checkedUrlField = document.querySelectorAll(".flex-center")[i];
            let dropDownBox = document.querySelectorAll(".dropdown")[i];
            toggleInputDisabled(checkedUrlField);
            toggleInputDisabled(checkedNameField);
            toggleDropdownBox(dropDownBox);
            checkedInputFound = true;
          }
        
          if(checkedInputFound) {
            toggleButtonText(this, 'Edit/Add Group', 'Save Group(s)')
            toggleElementDisplay(deleteButton);
            return;
          }
         
        }
        if(isCheckedArray[i].checked) {
          let checkedNameField = document.querySelectorAll(".name")[i];
          let checkedUrlField = document.querySelectorAll(".flex-center")[i];
          let dropDownBox = document.querySelectorAll(".dropdown")[i];
          toggleInputDisabled(checkedUrlField);
          toggleInputDisabled(checkedNameField);
          toggleDropdownBox(dropDownBox);
          checkedInputFound = true;
  
        }
        else {
          let inputBox = document.querySelectorAll(".container")[i];
          inputBox.style.pointerEvents = "none";
        }
      }
      alert("No Group Checked! Please Check Tab Group Rule to Edit or Add!")
      
    }
});

   // Set up custom drop down menu color pickers
   let dropDownAll = document.querySelectorAll('.dropdown');
   let boxAll = document.querySelectorAll('.box');
    //this loops through and provides functions for each color picking box, changes color when clicked toggles display when clicked
   for(let i = 0; i < dropDownAll.length; i++) {
    //this assigns unique function to dropdown icon for each color box
    dropDownAll[i].onclick = function() {
        for(let j = 0; j < boxAll.length; j++) {
          if(i == j) {

          }
         else if(boxAll[j].classList.contains('active-box')) {
            boxAll[j].classList.toggle('active-box');
          }
        }
        boxAll[i].classList.toggle('active-box');  
    }
    boxAll[i].querySelector('.blue-box').onclick = function() {   
        this.parentElement.style.backgroundColor = "blue";
        this.parentElement.classList.toggle('active-box');
        this.parentElement.setAttribute('value', 'blue');
     }

     boxAll[i].querySelector('.yellow-box').onclick = function() {   
        this.parentElement.style.backgroundColor = "yellow";
        this.parentElement.classList.toggle('active-box');
        this.parentElement.setAttribute('value', 'yellow');
     }

     boxAll[i].querySelector('.purple-box').onclick = function() {   
        this.parentElement.style.backgroundColor = "purple";
        this.parentElement.classList.toggle('active-box');
        this.parentElement.setAttribute('value', 'purple');
     }
   }
   
   //function that looks at second argument and sees if it has parent element, if ithas parent element and doesn't 
   //have class of dropdown and doesn't match element in the elmeArr toggles active-box away from it, ignores drop down when clicked since 
   //we have a functoin for that already that toggles when that is clicked among other things. 
   let aIsInB = function (elemArr, elemToMatch) {
      for(let i = 0; i < elemArr.length; i++) {
         if(elemToMatch.parentElement) {
           if(elemToMatch.parentElement.classList.contains('dropdown')) {}
           else if(elemToMatch.parentElement != elemArr[i]){
            elemArr[i].classList.toggle('active-box');
           }
         } 
      }
   }
   

   //click function for body taht closes drop down menu as witch exceptions for clicking other things, 
   // used so you click outside of the drop downs to close them
      
    document.addEventListener('mouseup', function(e) 
      {
           // if the target of the click isn't the container nor a descendant of the container
           let activeBoxes = document.querySelectorAll('.active-box');
           aIsInB(activeBoxes, e.target);

 
      });
// make chormestorage get a promise instead of callback avoid callback hell muahhahahah
function chromeStorageGet(result) {
  return new Promise((resolve, reject) => {
  if(resolve) { resolve(result) }
  else {console.log("didn't work"); }
      });
      }    
 window.onload = function () {
  
    chromeStorageGet(chrome.storage.sync.get(['TABGROUPS']))
    .then((result) => {
      // so if object is empty
      console.log(result);
     if(Object.keys(result).length === 0) {
       console.log("object lenght is zero here")

     }
     else {
       console.log("this is result", result);
       tabGroupsArray = [];
       
      let names = document.querySelectorAll(".name");
      let urls = document.querySelectorAll(".flex-center");
      let boxes = document.querySelectorAll(".box");
      for(let i = 0; i < result['TABGROUPS'].length; i++) {
        tabGroupsArray.push(result['TABGROUPS'][i]);
        console.log("this is tab group array now biatches!", tabGroupsArray, "\n \n");
        let group = "GROUP" + String(i + 1);
        if(result['TABGROUPS'][i].hasOwnProperty(group) && result['TABGROUPS'][i][group]["NAME"] != undefined) {
         
          names[i].setAttribute("value",  result['TABGROUPS'][i][group]["NAME"]);
          urls[i].setAttribute("value", result['TABGROUPS'][i][group]["URL"]);
          boxes[i].setAttribute("value", result['TABGROUPS'][i][group]["COLOR"]);
          boxes[i].style.backgroundColor = result['TABGROUPS'][i][group]["COLOR"];   
        } 








        

      }
     }


    });
    
}



  