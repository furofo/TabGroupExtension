// get variables for buttons ahere
const deleteButton = document.getElementById('delete-group');
const gobackButton = document.getElementById('go-back');
const editAddButton = document.getElementById('edit-add-group');
const isCheckedArray = document.querySelectorAll('.container input');
const dropDownAll = document.querySelectorAll('.dropdown');
const boxAll = document.querySelectorAll('.box');
const colors = {'blue': '#8ab4f7', 'yellow': '#fed663', 'purple': '#c589f9', 'green': '#81c895', 'red': '#f18b82', 'pink': '#ff8bcb', 'orange': '#fbac70', 'cyan': '#78d9ec', 'grey': 'grey'}
let tabGroupsArray = [];
const zoomLg = document.getElementById('zoom-lg')
const zoomReg = document.getElementById('zoom-reg')

// function that switches a btn elements inner html between two strings
const toggleButtonText = (btn, str1, str2) => {
  btn.innerHTML = (btn.innerHTML === str1) ? str2 : str1;
};
// provides functions for each color picking box => changes color/toggles display when clicked 
for (let i = 0; i < dropDownAll.length; i += 1) {
  // this assigns unique function to dropdown icon for each color box
  dropDownAll[i].onclick = () => {
  for (let j = 0; j < boxAll.length; j += 1) {
    // if there are other drop downs open other than this one clsoe them
      if (i !== j && boxAll[j].classList.contains('active-box')) {
        boxAll[j].classList.toggle('active-box');
      }
    }
    boxAll[i].classList.toggle('active-box');
  };
  // loops through all color options and all boxes and assigns them all functions, if any of these colors are clicked, assigns the parent element the color of them and toggles
  //active box class. This triggers when the drop down box is opened and a color is clicked.
  for (const color in colors) {
    if (color==='grey') continue
    boxAll[i].querySelector(`.${color}-box`).onclick = function () {
      this.parentElement.style.backgroundColor = colors[color];
      this.parentElement.classList.toggle('active-box');
      this.parentElement.setAttribute('value', color);
    }
  }
}

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

// add listener to first name value and use method to set value attribute of input to what is being typed
document.getElementById('first-name').addEventListener('input', updateInputWhenTyped);
// click outside drop down to close 
document.addEventListener('mouseup', (e) => {
  // if the target of the click isn't the container nor a descendant of the container
  const activeBoxes = document.querySelectorAll('.active-box');
  determineClickHandlerInB(activeBoxes, e.target);
});
// make chormestorage get a promise instead of callback avoid callback hell
function chromeStorageGet(result) {
  return new Promise((resolve, reject) => {
    if (resolve) {
      resolve(result);
    } else {
      reject();
    }
  });
}
window.onload = () => {
  chromeStorageGet(chrome.storage.sync.get(['TABGROUPS'])).then((result) => {
    if (Object.keys(result).length !== 0) {
      tabGroupsArray = [];
      const names = document.querySelectorAll('.name');
      const urls = document.querySelectorAll('.flex-center');
      const boxes = document.querySelectorAll('.box');
      for (let i = 0; i < result.TABGROUPS.length; i += 1) {
        if (result.TABGROUPS[i] === null) result.TABGROUPS[i] = {}
        tabGroupsArray.push(result.TABGROUPS[i]);
        const group = `GROUP${String(i + 1)}`;
        if (
          Object.prototype.hasOwnProperty.call(result.TABGROUPS[i], group)
          && result.TABGROUPS[i][group].NAME !== undefined
        ) {
          names[i].setAttribute('value', result.TABGROUPS[i][group].NAME);
          urls[i].setAttribute('value', result.TABGROUPS[i][group].URL);
          boxes[i].setAttribute('value', result.TABGROUPS[i][group].COLOR);
          boxes[i].style.backgroundColor = colors[result.TABGROUPS[i][group].COLOR];
        }
      }
    }
  });
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
  // toggle element display buttons
  toggleDisplays(editAddButton)
  // update pointer events for check boxes
  document.querySelectorAll('.container').forEach(e =>  e.style.pointerEvents = 'auto')
  // loop through the tabGroupsArray and set corresponding values
  // essentially reverts to original state before edits were made
  if (tabGroupsArray.length===0) tabGroupsArray = [{},{},{},{},{},{},{},{}]
  for (let i = 0; i < tabGroupsArray.length; i++){
    const checkedNameField = document.querySelectorAll('.name')[i];
    const checkedUrlField = document.querySelectorAll('.flex-center')[i];
    const box = document.querySelectorAll('.box')[i];
    const group = `GROUP${String(i + 1)}`
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
}
let deleteButtonLogic = (isCheckedArray, tabGroupsArray) => {
  for (let i = 0; i < isCheckedArray.length; i += 1) {
    const checkedNameField = document.querySelectorAll('.name')[i];
    const checkedUrlField = document.querySelectorAll('.flex-center')[i];
    const box = document.querySelectorAll('.box')[i];
    const checkedItem = document.querySelectorAll('.container input')[i];
    // runs on last item, if checked => remove everything and end here, if not => return 
      if (isCheckedArray[i].checked) {
        setValues(checkedNameField, checkedUrlField, box, '', [''], 'grey')
        checkedItem.checked = false;
        // remove this from tabsGroupArray which should be array of all groups retrieved from google Sync
        tabGroupsArray[i] = {};
      }
  }
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
  tabGroupsArray = [];
  // unchecks everything that is checked
  for (let i = 0; i < isCheckedArray.length; i += 1) {
    const groupNumber = `GROUP${String(i + 1)}`;
    inputBox[i].style.pointerEvents = 'auto';
    // let matchingText = checkedUrlField[i].value;
    // let matchingTextSplitComma = matchingText.split(',');
    // let matchingTextRemoveSpace = matchingTextSplitComma.map((item) => item.trim());
    if (isCheckedArray[i].checked) {
        tabGroupsArray.push({
          [groupNumber]: {
            COLOR: document.querySelectorAll('.box')[i].getAttribute('value'),
            NAME: checkedNameField[i].value,
            URL: checkedUrlField[i].value.split(',').map((item) => item.trim()),
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
          URL: checkedUrlField[i].value.split(',').map((item) => item.trim()),
        },
      });
    } else {
      tabGroupsArray.push({});
    }
  }
  chrome.storage.sync.set({ TABGROUPS: tabGroupsArray });
  toggleDisplays(button)
}
let editButtonLogic = (button,  isCheckedArray, checkedNameField, checkedUrlField, dropDownBox) => {
  for (let i = 0; i < isCheckedArray.length; i += 1) {
    document.querySelectorAll('.container')[i].style.pointerEvents = 'none';
    if (isCheckedArray[i].checked) {
      toggleInputAndDropdown(checkedNameField[i], checkedUrlField[i], dropDownBox[i])
    } 
  }
  toggleDisplays(button)
}