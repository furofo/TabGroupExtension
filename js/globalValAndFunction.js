// get variables for buttons ahere
const deleteButton = document.getElementById('delete-group');
const editAddButton = document.getElementById('edit-add-group');
let tabGroupsArray = [];
// function that switches a btn elements inner html between two strings,
// first argument is button element, second is current text
// third is text to toggle between
const toggleButtonText = (btn, str1, str2) => {
  const selectedBtn = btn;
  if (selectedBtn.innerHTML === str1) {
    selectedBtn.innerHTML = str2;
  } else {
    selectedBtn.innerHTML = str1;
  }
};
// function that switches an elemtns display between none and block
const toggleElementDisplay = (elem) => {
  const selectedElem = elem;
  if (window.getComputedStyle(selectedElem, null).display === 'block') {
    selectedElem.style.display = 'none';
  } else {
    selectedElem.style.display = 'block';
  }
};
// this function toggles input disabled from true and false and
// border to none and solid px effectively
const toggleInputDisabled = (elem) => {
  const selectedElem = elem;
  selectedElem.disabled = !selectedElem.disabled;
  if (selectedElem.disabled) {
    selectedElem.style.border = 'none';
  } else {
    selectedElem.style.border = '1px solid grey';
  }
};
// this function hides and unhides the dropdown box for the color picker box
const toggleDropdownBox = (elem) => {
  const selectedElem = elem;
  if (window.getComputedStyle(selectedElem, null).display === 'none') {
    selectedElem.style.display = 'inline-block';
  } else {
    selectedElem.style.display = 'none';
  }
};

//function that returns true if either name or url or color field is blank if it is checked in tool false othersiwe
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
// functoin to get input value as typed and update that inputs value attribute with what was typed
function updateInputWhenTyped(e) {
  e.target.setAttribute('value', e.target.value);
}

//function that loops through lsit and sees if values in certain  are checked if not returns false otherwise returns true
let isChecked = (isCheckedArray) => {
    let checkedInput = false;
    for (let i = 0; i < isCheckedArray.length; i += 1) {
    // this runs on last item, if it is checked remove everything and
    // end here if not just return and do nothing
    if (i === isCheckedArray.length - 1) {
      if (isCheckedArray[i].checked) {
        checkedInput = true;
      }
      if(!checkedInput) {
          return false;
      }
    }
    if (isCheckedArray[i].checked) {
         checkedInput = true
     }
    }
    return true;

}
//this is core functinality of delte button empties out all fields and updates chrome storage sync
let deleteButtonLogic = (isCheckedArray, tabGroupsArray) => {
    debugger;
    for (let i = 0; i < isCheckedArray.length; i += 1) {
        const checkedNameField = document.querySelectorAll('.name')[i];
        const checkedUrlField = document.querySelectorAll('.flex-center')[i];
        const box = document.querySelectorAll('.box')[i];
        const group = `GROUP${String(i + 1)}`;
        const checkedItem = document.querySelectorAll('.container input')[i];
        // this runs on last item, if it is checked remove everything and
        // end here if not just return and do nothing
        if (i === isCheckedArray.length - 1) {
          if (isCheckedArray[i].checked) {
            checkedNameField.setAttribute('value', '');
            checkedNameField.value = '';
            checkedUrlField.setAttribute('value', '');
            checkedUrlField.value = '';
            box.setAttribute('color', 'grey');
            box.style.backgroundColor = 'grey';
            checkedItem.checked = false;
            // logic to delete rule here
            // logic to remove this from tabsGroup Array which
            // should be array of all groups retrieved from google Sync
            tabGroupsArray[i][group] = {};
            chrome.storage.sync.set({ TABGROUPS: tabGroupsArray }).then(() => {});
          }
          else {
            chrome.storage.sync.set({ TABGROUPS: tabGroupsArray }).then(() => {});
          }
        }
        else if (isCheckedArray[i].checked) {
          checkedNameField.setAttribute('value', '');
          checkedNameField.value = '';
          checkedUrlField.setAttribute('value', '');
          checkedUrlField.value = '';
          box.setAttribute('color', 'grey');
          box.style.backgroundColor = 'grey';
          checkedItem.checked = false;
          // logic to delete rule here
          tabGroupsArray[i][group] = {};
        }
      }

}