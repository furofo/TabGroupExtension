

let deleteButton = document.getElementById('delete-group');
let editAddButton = document.getElementById('edit-add-group')
//let ruleInput = document.getElementById('rule-input');
//this adds a property rule to local storage that we will use to define search urls for the tab groups
function setRule() {
   // let value = ruleInput.value;
   // console.log("value is ", value);
   // chrome.storage.sync.set({rule: value}, () => {
     // setARule.style.backgroundColor = "purple";
      console.log("value is set to", value);
    //});
  }

//function that switches a btn elements inner html between two strings, firs argument is button element, second is current text
//third is text to toggle between
toggleButtonText = function(btn, str1, str2) {
  if(btn.innerHTML == str1) {
    btn.innerHTML = str2;
  }
  else {
    btn.innerHTML = str1;
  }
}

//function thtat switches an elemtns display between none and block
toggleElementDisplay = function(elem) {
  
  if (window.getComputedStyle(elem, null).display == 'block') {
    elem.style.display = 'none';
  }
  else {
    elem.style.display = 'block';
  }
  
}

//this function toggles input disabled from true and false and border to none and solid px effectively
toggleInputDisabled = function(elem) {
  elem.disabled =  !elem.disabled;
        if(elem.disabled) {
          elem.style.border = "none";
        }
        else {
          elem.style.border = '1px solid grey';
        }

}

toggleDropdownBox = function (elem) {
  
  if(window.getComputedStyle(elem, null).display == 'none') {
    elem.style.display = "inline-block";
  }
  else {
    elem.style.display = "none";
  }
}

//functoin to get input value as typed 
function showMe(e) {
  // i am spammy!
    e.target.setAttribute('value', e.target.value);
    console.log(e.target.value);
  }

document.getElementById('first-name').addEventListener('input', showMe);

//listener for setRule Button
deleteButton.addEventListener("click", async function() {
  //logic to see if input is checked
  let isCheckedArray = document.querySelectorAll('.container input');
  let checkedInputFound = false;
  for(let i = 0; i < isCheckedArray.length; i++) {
    if(i == isCheckedArray.length - 1) {
      if(isCheckedArray[i].checked) {
        let checkedNameField = document.querySelectorAll(".name")[i];
        let checkedUrlField = document.querySelectorAll(".flex-center")[i];
        let box = document.querySelectorAll(".box")[i];
      
        console.log(checkedNameField.getAttribute('value'));
        //checkedNameField.setAttribute('value', 'a');
       // checkedNameField.innerHTML = 'a';
       console.log(checkedNameField);
      // checkedNameField.disabled = false;
        checkedNameField.value = 'a';
        box.setAttribute('color', 'grey' );
        box.style.backgroundColor = 'grey';
        checkedInputFound = true;
        return;
      }
      if(checkedInputFound) {
        return;
      }

    }
    if(isCheckedArray[i].checked) {
      let checkedNameField = document.querySelectorAll(".name")[i];
      let checkedUrlField = document.querySelectorAll(".flex-center")[i];
      
      console.log(checkedNameField.getAttribute('value'));
      let box = document.querySelectorAll(".box")[i];
     // checkedNameField.disabled = false;
      checkedNameField.setAttribute('value', '');
      checkedNameField.value = '';
     
      checkedUrlField.setAttribute('value', '');
      checkedUrlField.value = '';
      box.setAttribute('color', 'grey' );
      box.style.backgroundColor = 'grey';
      checkedInputFound = true;
    }
    

  }
  alert("No Group Checked! Please Check Tab Group Rule to Delete!")
 
});

// when button clicked for right now reads rule but functionality built to set rule//
  editAddButton.addEventListener("click", async function()  {
    let isCheckedArray = document.querySelectorAll('.container input');
    let checkedInputFound = false;
    //if save button clicked basiclaly because should be only Save Button when delete button is not visible
    if (window.getComputedStyle(deleteButton, null).display == 'none') {
      let firstName = document.getElementById("first-name").value;
      if(firstName) {
        toggleButtonText(this,  'Save Group(s)', 'Edit/Add Group')
        console.log(document.getElementById("first-name").value);
      }
      else {
        console.log("no first Name Value found");
      }

      //example for how to set chrome storage
        chrome.storage.sync.set({GROUP1: {
          COLOR: 'BLUE',
          NAME: 'google',
          URL: 'rule',
        }}, function() {
          console.log('rule set');
        });

       
        toggleElementDisplay(deleteButton);
        for(let i = 0; i < isCheckedArray.length; i++) {
          if(isCheckedArray[i].checked) {
            let checkedNameField = document.querySelectorAll(".name")[i];
            let checkedUrlField = document.querySelectorAll(".flex-center")[i];
            let dropDownBox = document.querySelectorAll(".dropdown")[i];
            toggleInputDisabled(checkedUrlField);
            toggleInputDisabled(checkedNameField);
            toggleDropdownBox(dropDownBox);
            isCheckedArray[i].checked = false;
          }
          
        }
    }

    else {
      for(let i = 0; i < isCheckedArray.length; i++) {
        if(i == isCheckedArray.length - 1 ) {
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
        
    
      }
      alert("No Group Checked! Please Check Tab Group Rule to Edit or Add!")
      //fetch somelthign from group storage
    }
    
    /*
    chrome.storage.sync.get(['rule'], (result) => {
       
        console.log("yeah baby this gets the rule set earlire", result.rule);
        
    });*/
});



   // Set up custom drop down menu color pickers
   let dropDownAll = document.querySelectorAll('.dropdown');
   let boxAll = document.querySelectorAll('.box');
   for(let i = 0; i < dropDownAll.length; i++) {
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
   
   let aIsInB = function (elemArr, elemToMatch) {
     
      for(let i = 0; i < elemArr.length; i++) {
         if(elemToMatch.parentElement) {
          
           if(elemToMatch.parentElement.classList.contains('dropdown')) {
           
          
           }
           else if(elemToMatch.parentElement != elemArr[i]){
             
            elemArr[i].classList.toggle('active-box');
           }

           else {
             
           }
         }
        
         else {
            
         }
         
      }
   }
   

   //click function for body taht closes drop down menu as witch exceptions for clicking other things, 
   // used so you click outside of the drop downs to clsoe them jquery implentation
      
    document.addEventListener('mouseup', function(e) 
      {
           // if the target of the click isn't the container nor a descendant of the container
           let activeBoxes = document.querySelectorAll('.active-box');
           aIsInB(activeBoxes, e.target);
          /*
           for (let i = 0; i < activeBoxes.length; i++) {
            if (!$(activeBoxes[i]).is(e.target) && $(activeBoxes[i]).has(e.target).length === 0 
            && !$(".box").is(e.target) && $(".box").has(e.target).length === 0
            && !$(".dropdown").is(e.target) && $(".dropdown").has(e.target).length === 0)  {
                $(activeBoxes[i]).toggleClass('active-box');

            }
              
           }
*/

 
      });

     

