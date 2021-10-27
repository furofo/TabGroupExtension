

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

//listener for setRule Button
deleteButton.addEventListener("click", async() => {
  if(document.querySelector('.container input').checked) {
    console.log(document.querySelectorAll('.container input'));
    console.log("checked item detected");

  }
  else {
    console.log("did not detect checked item");
  }
  console.log("delete group clicked");
});

// when button clicked for right now reads rule but functionality built to set rule//
  editAddButton.addEventListener("click", async() => {
    chrome.storage.sync.get(['rule'], (result) => {
       
        console.log("yeah baby this gets the rule set earlire", result.rule);
        // setRule();

    });
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
     }

     boxAll[i].querySelector('.yellow-box').onclick = function() {   
        this.parentElement.style.backgroundColor = "yellow";
        this.parentElement.classList.toggle('active-box');
     }

     boxAll[i].querySelector('.purple-box').onclick = function() {   
        this.parentElement.style.backgroundColor = "purple";
        this.parentElement.classList.toggle('active-box');
     }


   }
   
   let aIsInB = function (elemArr, elemToMatch) {
      console.log("Here is array of elements with class of Active Box", elemArr);
      console.log("here is what are tyring to find match for elemetn clicked", elemToMatch);
      console.log("this is parent elmenet of clicked element", elemToMatch.parentElement);
      for(let i = 0; i < elemArr.length; i++) {
         if(elemToMatch.parentElement) {
           console.log("Element clicked has parent element");
           if(elemToMatch.parentElement.classList.contains('dropdown')) {
            console.log(elemToMatch.parentElement.classList);
             console.log("elemetn clickeds parent has class of dropdown")
          
           }
           else if(elemToMatch.parentElement != elemArr[i]){
             console.log(elemToMatch.parentElement.classList);
             console.log('active box not click');
            elemArr[i].classList.toggle('active-box');
           }

           else {
             console.log("no match found");
           }
         }
        
         else {
            console.log("matchfound", elemArr[i], elemToMatch);
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


