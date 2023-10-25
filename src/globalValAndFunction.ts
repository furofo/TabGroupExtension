
// get variables for buttons ahere
const deleteButton = document.getElementById('delete-group');
const gobackButton = document.getElementById('go-back');
const addButton = document.getElementById('add-group');
const editAddButton = document.getElementById('edit-add-group');
let isCheckedArray = document.querySelectorAll('.container input');
// let dropDownAll = document.querySelectorAll('.dropdown');
// console.log("drop down all is.... " ,)
// let boxAll = document.querySelectorAll('.box');
const colors = {'blue': '#8ab4f7', 'yellow': '#fed663', 'purple': '#c589f9', 'green': '#81c895', 'red': '#f18b82', 'pink': '#ff8bcb', 'orange': '#fbac70', 'cyan': '#78d9ec', 'grey': 'grey'}
let tabGroupsArray = [];
const zoomLg = document.getElementById('zoom-lg')
const zoomReg = document.getElementById('zoom-reg')

// function that switches a btn elements inner html between two strings
export const toggleButtonText = (btn: HTMLElement, str1: string, str2: string): void => {
  btn.innerHTML = (btn.innerHTML === str1) ? str2 : str1;
};



// Looks at second argument for parent element, if it has parent element
// that doesn't have class of dropdown and doesn't match element in the elmeArr toggles
// active-box away from it, ignores drop down when clicked since
// we have a functoin for that already that toggles when that is clicked among other things.
const determineClickHandlerInB = (elemArr, elemToMatch) => {
  for (let i = 0; i < elemArr.length; i += 1) {
    if (elemToMatch.parentElement) {
      // check if the element is the svg clicked, the path in the svg or dropdown, if any of these
      // use the other click handler set for dropdown instead
      // without this two click events are fired leading to issues with drop down boxes not closing properly
      if (!elemToMatch.classList.contains('dropdown')
      && !elemToMatch.parentElement.classList.contains('dropdown') && elemToMatch.tagName !== 'path' 
       && elemToMatch.parentElement !== elemArr[i]) {
        elemArr[i].classList.toggle('active-box');
      }
    }
  }
};

// this loops through all visible drop down boxes and assigns htem on click listeners
function addDropDownMenuOnClickListeners() {
  let dropDownAll = document.querySelectorAll('.dropdown') as NodeListOf<HTMLElement>;
  let boxAll = document.querySelectorAll('.box') as NodeListOf<HTMLElement>;

  for (let i = 0; i < dropDownAll.length; i++) {
    dropDownAll[i].onclick = () => {
      for (let j = 0; j < boxAll.length; j++) {
        if (i !== j && boxAll[j].classList.contains('active-box')) {
          boxAll[j].classList.toggle('active-box');
        }
      }
      boxAll[i].classList.toggle('active-box');
    };

    for (const color in colors) {
      if (color === 'grey') continue;

      const colorBox = boxAll[i].querySelector(`.${color}-box`) as HTMLElement; // Casting here

      if (colorBox !== null) {
        colorBox.onclick = (event: Event) => { // Using event parameter
          const targetElement = event.currentTarget as HTMLElement;

          if (targetElement && targetElement.parentElement) {
            targetElement.parentElement.style.backgroundColor = colors[color];
            targetElement.parentElement.classList.toggle('active-box');
            targetElement.parentElement.setAttribute('value', color);
          }
        };
      }
    }
  }
}

//this takes an array of Object representing tabGroup Rules and this returns an copy array of Objects but renames the property of them to represent the GROUP number
//starts with GROUP1 and goes on until the end of the array. This is to prevent situation where Tab Group 1 deleted last time and tab group 2 repeats for instance, guarinties unique tab
// group names
function reorderTabGroups(tabGroupsArrayOfObjects) {
  let newTabGroups = [];
  for (let i = 0; i < tabGroupsArrayOfObjects.length; i++) {
      for (let key in tabGroupsArrayOfObjects[i]) {
          let newKey = "GROUP" + (i + 1);
          let newObject = {};
          newObject[newKey] = tabGroupsArrayOfObjects[i][key];
          newTabGroups.push(newObject);
      }
  }
  return newTabGroups;
}


// get chrome storage tabgropus object 
window.onload = async () => {
    // //uncomment this to remoe all tabgroups on load for testing 
    // removeTabGroups();
    // let testTabGroups = createXNumbersTabGroupsArray(9);
    // setTabGroups(testTabGroups);
    let result = await chrome.storage.sync.get(['TABGROUPS']);
    console.log("result is", result);
    console.log("Chrome Tab rules are as follows!" , result);
    //put all TabGroup Rules in to TabGroups Array
    if (Object.keys(result).length !== 0) {
      //first thing we do is initzlze array to blank array to make sure it wlways starts empty 
      tabGroupsArray = [];
      for (let i = 0; i < result.TABGROUPS.length; i += 1) {
        if (result.TABGROUPS[i] === null)  { console.log ('empty tab group found??')}
        else {
          tabGroupsArray.push(result.TABGROUPS[i]);
        }
      }
      tabGroupsArray = reorderTabGroups(tabGroupsArray);
    }
    if (Object.keys(result).length !== 0) {
      for (let i = 0; i < tabGroupsArray.length; i += 1) {
        let ruleElement = createRuleElement();
        const checkedNameField = ruleElement.querySelector('.name-content > input');
        const checkedUrlField = ruleElement.querySelector('.flex-center');
        let box = ruleElement.querySelector('.box');
        // const group = `GROUP${String(i + 1)}`;
        console.log("key of tabGroup Array is", Object.keys(tabGroupsArray[i])[0]);
        const group = Object.keys(tabGroupsArray[i])[0];
        if (
          Object.prototype.hasOwnProperty.call(tabGroupsArray[i], group)
          && tabGroupsArray[i][group].NAME !== undefined
        ) {
          checkedNameField.setAttribute('value', tabGroupsArray[i][group].NAME);
          checkedUrlField.setAttribute('value', tabGroupsArray[i][group].URL);
          box.setAttribute('value', tabGroupsArray[i][group].COLOR);
          box.style.backgroundColor = colors[tabGroupsArray[i][group].COLOR];
          checkedUrlField.value = tabGroupsArray[i][group].URL
          checkedNameField.value = tabGroupsArray[i][group].NAME
        }
      }
    }
};

// Switches an elements display between none and block
const toggleElementDisplay = (elem) => {
  const selectedElem = elem;
  if (window.getComputedStyle(selectedElem, null).display === 'block') {
    selectedElem.style.display = 'none';
  } else {
    selectedElem.style.display = 'block';
  }
};

// Toggles input disabled from true and false and border to none and solid px effectively
const toggleInputDisabled = (elem) => {
  const selectedElem = elem;
  selectedElem.disabled = !selectedElem.disabled;
  selectedElem.style.border = selectedElem.disabled ? 'none' : '1px solid grey'
};

// Hides and unhides the dropdown box for the color picker box
const toggleDropdownBox = (elem) => {
  const selectedElem = elem;
  selectedElem.style.display = (window.getComputedStyle(selectedElem, null).display === 'none') ? 'flex' : 'none'
};

 // helper function for toggling input and dropdown
const toggleInputAndDropdown = (nameField, urlField, dropDown) => {
  toggleInputDisabled(nameField);
  toggleInputDisabled(urlField);
  toggleDropdownBox(dropDown);
}

// helper function for toggling display elements
let toggleDisplays = (button) => {
  toggleElementDisplay(document.getElementById('go-back'))
  toggleElementDisplay(deleteButton)
  toggleButtonText(button, "Select", "Save")
}

// helper function for setting field values
let setValues = (nameField, urlField, box, title, url, color) => {
  nameField.setAttribute('value', title)
  nameField.value = title
  urlField.setAttribute('value', url[0])
  urlField.value = url[0]
  box.setAttribute('color', color);
  box.style.backgroundColor = colors[color]
}

// Returns true if either name or url or color field is blank if it is checked in tool false othersiwe
const isBlank = (isCheckedArray, checkedNameField, checkedUrlField, boxField) => {
  for(let i = 0; i < isCheckedArray.length; i += 1) {
    if(isCheckedArray[i].checked) {
      if (!checkedNameField[i].value || !checkedUrlField[i].value
        ||boxField[i].getAttribute('value') === 'grey') {
          return true
        }
    }
  }
  return false;
}

// Get input value as typed and update its value attribute 
function updateInputWhenTyped(e) {
  e.target.setAttribute('value', e.target.value);
}
// Loops through list and sees if a value is checked, if not returns false otherwise returns true
let isChecked = (isCheckedArray) => {
  let checkedInput = false;
  for (let i = 0; i < isCheckedArray.length; i += 1) {
  if (isCheckedArray[i].checked) checkedInput = true
  }
  return checkedInput;
}
let goBackButtonLogic = (isCheckedArray, dropDownBox) => {
 console.log("this is tab grops array", tabGroupsArray);
  // toggle element display buttons
  toggleDisplays(editAddButton)
  toggleElementDisplay(addButton);
  // update pointer events for check boxes
  document.querySelectorAll('.container').forEach(e =>  e.style.pointerEvents = 'auto')
  // loop through the tabGroupsArray and set corresponding values
  // essentially reverts to original state before edits were made
  let allRules = document.querySelectorAll(".center.rule");
  for (let i = 0; i < tabGroupsArray.length; i++){
    console.log("allRules", allRules);
    const checkedNameField = document.querySelectorAll('.name')[i];
    const checkedUrlField = document.querySelectorAll('.flex-center')[i];
    const box = document.querySelectorAll('.box')[i];
    // const group = `GROUP${String(i + 1)}`
    const group = Object.keys(tabGroupsArray[i])[0];
    let title, url, color
    if (Object.keys(tabGroupsArray[i]).length !== 0) {
      [title, url, color] = [tabGroupsArray[i][group].NAME, tabGroupsArray[i][group].URL, tabGroupsArray[i][group].COLOR]
    } else {
      [title, url, color] = ['', [''], 'grey']
    }
    setValues(checkedNameField, checkedUrlField, box, title, url, color)
    if (!isCheckedArray[i].checked) continue
    isCheckedArray[i].checked = false;
    toggleInputAndDropdown(checkedNameField, checkedUrlField, dropDownBox[i])
  }

  if(allRules.length > tabGroupsArray.length) {
    allRules[allRules.length - 1].remove();

  }
  
}
let deleteButtonLogic = (isCheckedArray, tabGroupsArray) => {
  const ruleElements = document.querySelectorAll('.center.rule');
  console.log("rule elements before deleing", ruleElements);
  let ruleElementIndexesToRemove = [];
  for (let i = 0; i < isCheckedArray.length; i += 1) {
    const checkedNameField = document.querySelectorAll('.name')[i];
    const checkedUrlField = document.querySelectorAll('.flex-center')[i];
    const box = document.querySelectorAll('.box')[i];
    const checkedItem = document.querySelectorAll('.container input')[i];
    // runs on last item, if checked => remove everything and end here, if not => return 
      if (isCheckedArray[i].checked) {
        setValues(checkedNameField, checkedUrlField, box, '', [''], 'grey')
        checkedItem.checked = false;
        ruleElementIndexesToRemove.push(i);
        // remove this from tabsGroupArray which should be array of all groups retrieved from google Sync
        console.log("tabGroupsArray incex to remove", i,  tabGroupsArray);
        tabGroupsArray.splice(i, 1, {});
        console.log("tabGroupsArray", tabGroupsArray);
      }
  }
  for(let i = 0; i < ruleElementIndexesToRemove.length; i++) {
    ruleElements[ruleElementIndexesToRemove[i]].remove();
    console.log("rule elemtens after deleing", ruleElements);
  }
   tabGroupsArray = reorderTabGroups(tabGroupsArray);
   chrome.storage.sync.set({ TABGROUPS: tabGroupsArray });
}
// save logic
let saveButtonLogic =  (button, inputBox, isCheckedArray, checkedNameField, checkedUrlField, boxField, dropDownBox) =>  {
  // Loops through all rules if any are checked if they are blank 
  if( isBlank(isCheckedArray, checkedNameField, checkedUrlField, boxField)) {
    ModalWindow.openModal({
      title:'Field is Blank!',
      content: 'Make sure name and url fields are not blank, and color box is not grey!'
    })
    return;
  }
  type TabGroup = {
    [key: string]: {
      COLOR: string | null;
      NAME: string;
      URL: string[];
    };
  };
  
  let tabGroupsArray: TabGroup[] = [];
  
  
  isCheckedArray = document.querySelectorAll('.container input');
  // unchecks everything that is checked
  for (let i = 0; i < isCheckedArray.length; i += 1) {
    const groupNumber = `GROUP${String(i + 1)}`;
    // const groupNumber =  Date.now() + Math.random();
    inputBox[i].style.pointerEvents = 'auto';
    // let matchingText = checkedUrlField[i].value;
    // let matchingTextSplitComma = matchingText.split(',');
    // let matchingTextRemoveSpace = matchingTextSplitComma.map((item) => item.trim());
    if (isCheckedArray[i].checked) {
        tabGroupsArray.push({
          [groupNumber]: {
            COLOR: document.querySelectorAll('.box')[i].getAttribute('value'),
            NAME: checkedNameField[i].value,
            URL: checkedUrlField[i].value.split(',').map((item: string) => item.trim()),
          },
        });
        toggleInputAndDropdown(checkedNameField[i], checkedUrlField[i], dropDownBox[i])
        isCheckedArray[i].checked = false;
    } 
    else if (checkedNameField[i].value && checkedUrlField[i].value
      && boxField[i].getAttribute('value') !== 'grey') {
      tabGroupsArray.push({
        [groupNumber]: {
          COLOR: document.querySelectorAll('.box')[i].getAttribute('value'),
          NAME: checkedNameField[i].value,
          URL: checkedUrlField[i].value.split(',').map((item: string) => item.trim()),
        },
      });
    } else {
      tabGroupsArray.push({});
    }
  }
  chrome.storage.sync.set({ TABGROUPS: tabGroupsArray });
  toggleDisplays(button);
  toggleElementDisplay(addButton);
}
let editButtonLogic = (button: any, isCheckedArray: any, checkedNameField: any, checkedUrlField: any, dropDownBox: any) => {
  for (let i = 0; i < isCheckedArray.length; i += 1) {
    (document.querySelectorAll('.container')[i] as HTMLElement).style.pointerEvents = 'none';
    if (isCheckedArray[i].checked) {
      toggleInputAndDropdown(checkedNameField[i], checkedUrlField[i], dropDownBox[i])
    } 
  }
  toggleDisplays(button);
  toggleElementDisplay(addButton);
}

// this functoin finds duplicates in an array and returns an object showing if ther are any essentially testing functoin
function findDuplicates(arr: number[]): { hasDuplicates: boolean; indices: number[] } {
  let indices: number[] = [];
  let seen = new Set<number>();
  for (let i = 0; i < arr.length; i++) {
    if (seen.has(arr[i])) {
      indices.push(i);
    } else {
      seen.add(arr[i]);
    }
  }
  return {
    hasDuplicates: indices.length > 0,
    indices: indices
  };
}

//testing fucntion to go in and put  a bunch of random values in an arra test up to a million 

function generateRandomValuesAndPushToArray(arrayLength:number):number[] {
  let randomNumbersArray:number[] = [];
  for(let i = 0; i < arrayLength; i++) {
    randomNumbersArray.push(Math.random())
  
  }
  return randomNumbersArray;
}
let testArray = [1, 2, 3 , 4, 5]


//input
// [
//   {
//       "GROUP1": {
//           "COLOR": "red",
//           "NAME": "colors",
//           "URL": [
//               "red",
//               "yellow.blue"
//           ]
//       }
//   },
//   {
//       "GROUP2": {
//           "COLOR": "red",
//           "NAME": "vehicles",
//           "URL": [
//               "green",
//               "blue",
//               "yellow"
//           ]
//       }
//   },
//   {
//       "GROUP3": {
//           "COLOR": "green",
//           "NAME": "trucks",
//           "URL": [
//               "nissan"
//           ]
//       }
//   },
//   {
//       "GROUP4": {
//           "COLOR": "pink",
//           "NAME": "pokemon",
//           "URL": [
//               "pikachu",
//               "storm"
//           ]
//       }
//   }
// ]

//deleted group 3 this is what happened after 
// [
//   {
//       "GROUP1": {
//           "COLOR": "red",
//           "NAME": "colors",
//           "URL": [
//               "red",
//               "yellow.blue"
//           ]
//       }
//   },
//   {
//       "GROUP2": {
//           "COLOR": "red",
//           "NAME": "vehicles",
//           "URL": [
//               "green",
//               "blue",
//               "yellow"
//           ]
//       }
//   },
//   {
//       "GROUP4": {
//           "COLOR": "pink",
//           "NAME": "pokemon",
//           "URL": [
//               "pikachu",
//               "storm"
//           ]
//       }
//   }
// ]

// it only printed colors and vehicles and everything else blank