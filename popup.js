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
// add listener to first name value and use method
// to set value attribute of input to what is being typed
document.getElementById('first-name').addEventListener('input', updateInputWhenTyped);
// when delete button clicked removes the group number
// from google sync and from pop up html of extension
deleteButton.addEventListener('click', async () => {
  debugger;
  // logic to see if input is checked
  const isCheckedArray = document.querySelectorAll('.container input');
  let checkedInputFound = false;
  for (let i = 0; i < isCheckedArray.length; i += 1) {
    const checkedNameField = document.querySelectorAll('.name')[i];
    const checkedUrlField = document.querySelectorAll('.flex-center')[i];
    const box = document.querySelectorAll('.box')[i];
    const group = `GROUP${String(i + 1)}`;
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
        const checkedItem = document.querySelectorAll('.container input')[i];
        checkedItem.checked = false;
        checkedInputFound = true;
        // logic to delete rule here
        // logic to remove this from tabsGroup Array which
        // should be array of all groups retrieved from google Sync
        tabGroupsArray[i][group] = {};
        chrome.storage.sync.set({ TABGROUPS: tabGroupsArray }).then(() => {});
        return;
      }
      if (checkedInputFound) {
        chrome.storage.sync.set({ TABGROUPS: tabGroupsArray }).then(() => {});
        return;
      }
    }
    if (isCheckedArray[i].checked) {
      checkedNameField.setAttribute('value', '');
      checkedNameField.value = '';
      checkedUrlField.setAttribute('value', '');
      checkedUrlField.value = '';
      box.setAttribute('color', 'grey');
      box.style.backgroundColor = 'grey';
      checkedInputFound = true;
      document.querySelectorAll('.container input')[i].checked = false;
      // logic to delete rule here
      // if (Object.prototype.hasOwnProperty.call(tabGroupsArray[i], group)) {
      //   tabGroupsArray[i][group] = {};
      // }
      tabGroupsArray[i][group] = {};
    }
  }
  alert('No Group Checked! Please Check Tab Group Rule to Delete!');
});
editAddButton.addEventListener('click', async function ()  {
  const isCheckedArray = document.querySelectorAll('.container input');
  const inputBox = document.querySelectorAll('.container');
  const checkedNameField = document.querySelectorAll('.name');
  const checkedUrlField = document.querySelectorAll('.flex-center');
  const dropDownBox = document.querySelectorAll('.dropdown');
  const boxField = document.querySelectorAll('.box');

  let checkedInputFound = false;
  // if save button clicked  because should be only
  // Save Button text when delete button is not visible
  if (window.getComputedStyle(deleteButton, null).display === 'none') {
    tabGroupsArray = [];
    //logic here loops through all rules if any are checked if they are blank isBlank
    //returns true and alert displays function returns empty
    if( isBlank(isCheckedArray, checkedNameField, checkedUrlField, boxField)) {
      alert("Field is blank please set it pleassse");
      return;
    }
    // this coges through and unchecks everything that is checked
    for (let i = 0; i < isCheckedArray.length; i += 1) {
      const groupNumber = `GROUP${String(i + 1)}`;
      inputBox[i].style.pointerEvents = 'auto';
      if (isCheckedArray[i].checked) {
          tabGroupsArray.push({
            [groupNumber]: {
              COLOR: document.querySelectorAll('.box')[i].getAttribute('value'),
              NAME: checkedNameField[i].value,
              URL: checkedUrlField[i].value,
            },
          });
          toggleInputDisabled(checkedUrlField[i]);
          toggleInputDisabled(checkedNameField[i]);
          toggleDropdownBox(dropDownBox[i]);
          isCheckedArray[i].checked = false;
      } 
      else if (checkedNameField[i].value && checkedUrlField[i].value
        && boxField[i].getAttribute('value') !== 'grey') {
        tabGroupsArray.push({
          [groupNumber]: {
            COLOR: document.querySelectorAll('.box')[i].getAttribute('value'),
            NAME: checkedNameField[i].value,
            URL: checkedUrlField[i].value,
          },
        });
      } else {
        tabGroupsArray.push({});
      }

      if(i === isCheckedArray.length - 1) {
        //if make it to last array withoug this breaking
        toggleElementDisplay(deleteButton);
        toggleButtonText(this, 'Save Group(s)', 'Edit/Add Group');
        chrome.storage.sync.set({ TABGROUPS: tabGroupsArray }, () => {
          tabGroupsArray = [];
        });
      }
    }
  } else {
    for (let i = 0; i < isCheckedArray.length; i += 1) {
      const groupNumber = `GROUP${String(i + 1)}`;
      if (i === isCheckedArray.length - 1) {
        // this is handlign for last check box returns if it is checked so doesn't throw error logic
        if (isCheckedArray[i].checked) {
          toggleInputDisabled(checkedUrlField[i]);
          toggleInputDisabled(checkedNameField[i]);
          toggleDropdownBox(dropDownBox[i]);
          checkedInputFound = true;
        }
        if (checkedInputFound) {
          toggleButtonText(this, 'Edit/Add Group', 'Save Group(s)');
          toggleElementDisplay(deleteButton);
          return;
        }
        // if gets all the way to last group and nothing is checked make all buttons selectable again
        else {
          for(let i = 0; i < document.querySelectorAll('.container').length; i++) {
            document.querySelectorAll('.container')[i].style.pointerEvents = 'auto';
          }
        }
      }
      else if (isCheckedArray[i].checked) {
        toggleInputDisabled(checkedUrlField[i]);
        toggleInputDisabled(checkedNameField[i]);
        toggleDropdownBox(dropDownBox[i]);
        checkedInputFound = true;
      } 
      else {
        document.querySelectorAll('.container')[i].style.pointerEvents = 'none';
      }
    }
    alert('No Group Checked! Please Check Tab Group Rule to Edit or Add!');
  }
});



// Set up custom drop down menu color pickers
const dropDownAll = document.querySelectorAll('.dropdown');
const boxAll = document.querySelectorAll('.box');
// this loops through and provides functions for each color picking box,
// changes color when clicked toggles display when clicked
for (let i = 0; i < dropDownAll.length; i += 1) {
  // this assigns unique function to dropdown icon for each color box
  dropDownAll[i].onclick = () => {
    for (let j = 0; j < boxAll.length; j += 1) {
      if (i !== j && boxAll[j].classList.contains('active-box')) {
        boxAll[j].classList.toggle('active-box');
      }
    }
    boxAll[i].classList.toggle('active-box');
  };
  boxAll[i].querySelector('.blue-box').onclick = function () {
    this.parentElement.style.backgroundColor = 'blue';
    this.parentElement.classList.toggle('active-box');
    this.parentElement.setAttribute('value', 'blue');
  };

  boxAll[i].querySelector('.yellow-box').onclick = function () {
    this.parentElement.style.backgroundColor = 'yellow';
    this.parentElement.classList.toggle('active-box');
    this.parentElement.setAttribute('value', 'yellow');
  };

  boxAll[i].querySelector('.purple-box').onclick = function ()  {
    this.parentElement.style.backgroundColor = 'purple';
    this.parentElement.classList.toggle('active-box');
    this.parentElement.setAttribute('value', 'purple');
  };
}
// function that looks at second argument and sees if it has parent element, if ithas parent element
// and doesn't have class of dropdown and doesn't match element in the elmeArr toggles
// active-box away from it, ignores drop down when clicked since
// we have a functoin for that already that toggles when that is clicked among other things.
const aIsInB = (elemArr, elemToMatch) => {
  for (let i = 0; i < elemArr.length; i += 1) {
    if (elemToMatch.parentElement) {
      if (!elemToMatch.parentElement.classList.contains('dropdown')
      && elemToMatch.parentElement !== elemArr[i]) {
        elemArr[i].classList.toggle('active-box');
      }
    }
  }
};
// click function for body taht closes drop down menu as witch exceptions for clicking other things,
// used so you click outside of the drop downs to close them
document.addEventListener('mouseup', (e) => {
  // if the target of the click isn't the container nor a descendant of the container
  const activeBoxes = document.querySelectorAll('.active-box');
  aIsInB(activeBoxes, e.target);
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
        tabGroupsArray.push(result.TABGROUPS[i]);
        // const group = "GROUP" + String(i + 1);
        const group = `GROUP${String(i + 1)}`;
        if (
          Object.prototype.hasOwnProperty.call(result.TABGROUPS[i], group)
          && result.TABGROUPS[i][group].NAME !== undefined
        ) {
          names[i].setAttribute('value', result.TABGROUPS[i][group].NAME);
          urls[i].setAttribute('value', result.TABGROUPS[i][group].URL);
          boxes[i].setAttribute('value', result.TABGROUPS[i][group].COLOR);
          boxes[i].style.backgroundColor = result.TABGROUPS[i][group].COLOR;
        }
      }
    }
  });
};
