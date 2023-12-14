
import {createRuleElement} from "./popup"
import {ModalWindow} from "./alertBoxes"
// get variables for buttons ahere
export const deleteButton = document.getElementById('delete-group') as HTMLButtonElement;
export const gobackButton = document.getElementById('go-back') as HTMLButtonElement;
export const addButton = document.getElementById('add-group');
export const editAddButton: HTMLButtonElement = document.getElementById('edit-add-group') as HTMLButtonElement;
export let isCheckedArray = document.querySelectorAll('.container input');
const colors = {'blue': '#8ab4f7', 'yellow': '#fed663', 'purple': '#c589f9', 'green': '#81c895', 'red': '#f18b82', 'pink': '#ff8bcb', 'orange': '#fbac70', 'cyan': '#78d9ec', 'grey': 'grey'}
type TabGroup = {
  [key: string]: {
    NAME: string;
    URL: string[];
    COLOR: string;
  };
};
type TabGroupOrBlankObject = TabGroup | {};
let tabGroupsPromiseResolve: (tabGroups: TabGroup[]) => void;


const tabGroupsPromise = new Promise<TabGroup[]>(resolve => {
  tabGroupsPromiseResolve = resolve;
});

function isNotEmptyObject(obj: TabGroupOrBlankObject): obj is TabGroup {
  return Object.keys(obj).length > 0;
}

export let tabGroupsArray: TabGroup[] = [];
export const zoomLg = document.getElementById('zoom-lg')
export const zoomReg = document.getElementById('zoom-reg')
// function that switches a btn elements inner html between two strings
export const toggleButtonText = (btn: HTMLElement, str1: string, str2: string): void => {
  btn.innerHTML = (btn.innerHTML === str1) ? str2 : str1;
};
// Looks at second argument for parent element, if it has parent element
// that doesn't have class of dropdown and doesn't match element in the elmeArr toggles
// active-box away from it, ignores drop down when clicked since
// we have a functoin for that already that toggles when that is clicked among other things.
export const determineClickHandlerInB = (elemArr: HTMLElement[], elemToMatch:  HTMLElement) => {
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
 export function addDropDownMenuOnClickListeners() {
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
            targetElement.parentElement!.style.backgroundColor = colors[color as keyof typeof colors];

            targetElement.parentElement.classList.toggle('active-box');
            targetElement.parentElement.setAttribute('value', color);
          }
        };
      }
    }
  }
}

export function getTabGroups() {
  return tabGroupsPromise;
}

//this takes an array of Object representing tabGroup Rules and this returns an copy array of Objects but renames the property of them to represent the GROUP number
//starts with GROUP1 and goes on until the end of the array. This is to prevent situation where Tab Group 1 deleted last time and tab group 2 repeats for instance, guarinties unique tab
// group names
export function reorderTabGroups(tabGroupsArrayOfObjects: TabGroupOrBlankObject[]) {
  let newTabGroups: TabGroupOrBlankObject[] = [];
  let groupNumberForNewTabGroups: number = 1;
  for (let i = 0; i < tabGroupsArrayOfObjects.length; i++) {
    if (isNotEmptyObject(tabGroupsArrayOfObjects[i])) {
      const tabGroup = tabGroupsArrayOfObjects[i] as TabGroup;
      for (let key in tabGroup) {
        let newKey = "GROUP" + groupNumberForNewTabGroups;
        groupNumberForNewTabGroups += 1;
        let newObject: TabGroup = {}; 
        newObject[newKey] = tabGroup[key];
        newTabGroups.push(newObject);
      }
    }
  }
  return newTabGroups;
}

export async function populateTabGroupsArrayFromChromeStorage() {
  let result = await chrome.storage.sync.get(['TABGROUPS']);
  //put all TabGroup Rules in to TabGroups Array
  tabGroupsArray = [];
  if (Object.keys(result).length !== 0) {
    //first thing we do is initzlze array to blank array to make sure it wlways starts empty 
    
    for (let i = 0; i < result.TABGROUPS.length; i += 1) {
      if(result.TABGROUPS[i] !== null) {
        tabGroupsArray.push(result.TABGROUPS[i]);
      }
    }
    tabGroupsArray =  reorderTabGroups(tabGroupsArray);
     await chrome.storage.sync.set({ TABGROUPS: tabGroupsArray });
     return tabGroupsArray;
}
}
// get chrome storage tabgropus object 
window.onload = async () => {
  // get chrome setting for zoom and zoom or mimize screen accoring
  let zoom = await  chrome.storage.sync.get("TABGROUPSZOOMENABLED");
  console.log("zoom is", zoom);
  if(zoom.TABGROUPSZOOMENABLED) {
    document.getElementById('page-style')!.setAttribute('href', "/css/style.css")
    document.getElementById('alert-style')!.setAttribute('href', "/css/alert-boxes.css")
  }
  else {
  document.getElementById('page-style')!.setAttribute('href', "/css/styles2.css")
  document.getElementById('alert-style')!.setAttribute('href', "/css/alert-boxes2.css")
  }
  const settingsIcon = document.getElementById('settings-icon');
  // Check if the element exists to avoid null reference errors
  if (settingsIcon) {
    // Add a click event listener to the SVG element
    settingsIcon.addEventListener('click', () => {
      // Log the SVG element to the console when it is clicked
      console.log("settings wheel clicked", settingsIcon);
      chrome.runtime.openOptionsPage();
    });
  }
  let result = await chrome.storage.sync.get(['TABGROUPS']);
   await  populateTabGroupsArrayFromChromeStorage();
    if (Object.keys(result).length !== 0 && result['TABGROUPS'] !== null) {
      for (let i = 0; i < tabGroupsArray.length; i += 1) {
        let ruleElement = createRuleElement();
        const checkedNameField = ruleElement.querySelector('.name-content > input');
        const checkedUrlField = ruleElement.querySelector('.flex-center');
        let box = ruleElement.querySelector('.box');
        const group = Object.keys(tabGroupsArray[i])[0];
        if (
          Object.prototype.hasOwnProperty.call(tabGroupsArray[i], group)
          && tabGroupsArray[i][group].NAME !== undefined
        ) {
          checkedNameField!.setAttribute('value', tabGroupsArray[i][group].NAME);
          checkedUrlField!.setAttribute('value', tabGroupsArray[i][group].URL.join(', '));
          box!.setAttribute('value', tabGroupsArray[i][group].COLOR);
          (box! as HTMLElement).style.backgroundColor = colors[tabGroupsArray[i][group].COLOR! as keyof typeof colors];
          (checkedUrlField! as HTMLInputElement).value = tabGroupsArray[i][group].URL.join(', ');  // Assuming URL is an array of strings
          (checkedNameField! as HTMLInputElement).value = tabGroupsArray[i][group].NAME;

        }
      }
    }
};

// Switches an elements display between none and block
export const toggleElementDisplay = (elem: HTMLElement) => {
  const selectedElem = elem;
  if (window.getComputedStyle(selectedElem, null).display === 'block') {
    selectedElem.style.display = 'none';
  } else {
    selectedElem.style.display = 'block';
  }
};

// Toggles input disabled from true and false and border to none and solid px effectively
 export const toggleInputDisabled = (elem: HTMLInputElement) => {
  elem.disabled = !elem.disabled;
  elem.style.border = elem.disabled ? 'none' : '1px solid grey';
};
// Hides and unhides the dropdown box for the color picker box
 export const toggleDropdownBox = (elem: HTMLInputElement) => {
  const selectedElem = elem;
  selectedElem.style.display = (window.getComputedStyle(selectedElem, null).display === 'none') ? 'flex' : 'none'
};

 // helper function for toggling input and dropdown
export const toggleInputAndDropdown = (nameField: HTMLInputElement, urlField: HTMLInputElement, dropDown: HTMLInputElement) => {
  toggleInputDisabled(nameField);
  toggleInputDisabled(urlField);
  toggleDropdownBox(dropDown);
}
// helper function for toggling display elements
export let toggleDisplays =  (button: HTMLButtonElement) => {
  const goBackButton = document.getElementById('go-back');
  const deleteButton = document.getElementById('delete-button');
  if (goBackButton) {
    toggleElementDisplay(goBackButton);
  }
  if (deleteButton) {
    toggleElementDisplay(deleteButton);
  }
  toggleButtonText(button, "Select", "Save");
};
// helper function for setting field values
let setValues = (nameField: HTMLInputElement , urlField: HTMLInputElement, box: HTMLElement, title: string, url: string, color: string) => {
  nameField.setAttribute('value', title)
  nameField.value = title
  urlField.setAttribute('value', url[0])
  urlField.value = url[0]
  box.setAttribute('color', color);
  box.style.backgroundColor = colors[color as keyof typeof colors];
}
// Returns true if either name or url or color field is blank if it is checked in tool false othersiwe
export const isBlank = (isCheckedArray: HTMLInputElement[], checkedNameField: HTMLInputElement[], checkedUrlField: HTMLInputElement[], boxField:  HTMLElement[]) => {
  for(let i = 0; i < isCheckedArray.length; i += 1) {
    if((isCheckedArray[i] as HTMLInputElement).checked) {
      if (!checkedNameField[i].value || !checkedUrlField[i].value
        ||boxField[i].getAttribute('value') === 'grey') {
          return true
        }
    }
  }
  return false;
}
export function updateInputWhenTyped(e: InputEvent) {
  const target = e.target as HTMLInputElement;
  target.setAttribute('value', target.value);
}
// Loops through list and sees if a value is checked, if not returns false otherwise returns true
 export let isChecked = (isCheckedArray: NodeListOf<Element>) => {
  let checkedInput = false;
  for (let i = 0; i < isCheckedArray.length; i += 1) {
  if ((isCheckedArray[i] as HTMLInputElement).checked ) checkedInput = true
  }
  return checkedInput;
}
 export let goBackButtonLogic = (isCheckedArray: NodeListOf<Element>, dropDownBox: HTMLElement[]) => {
  // toggle element display buttons
  if (editAddButton && addButton && gobackButton) {
    // toggle element display buttons
    toggleDisplays(editAddButton);
    toggleElementDisplay(addButton);
    toggleElementDisplay(deleteButton);
  }
  // update pointer events for check boxes
  document.querySelectorAll('.container').forEach(e => {
    (e as HTMLElement).style.pointerEvents = 'auto';
  });
  // loop through the tabGroupsArray and set corresponding values
  // essentially reverts to original state before edits were made
  let allRules = document.querySelectorAll(".center.rule");
  for (let i = 0; i < tabGroupsArray.length; i++){
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
    url = url.join(', ');
    setValues(checkedNameField as HTMLInputElement, checkedUrlField as HTMLInputElement, box as HTMLInputElement, title, url, color)
    if (!(isCheckedArray[i] as HTMLInputElement).checked) continue
    (isCheckedArray[i] as HTMLInputElement).checked = false;
    toggleInputAndDropdown(checkedNameField as HTMLInputElement, checkedUrlField as HTMLInputElement, dropDownBox[i] as HTMLInputElement)
  }
  if(allRules.length > tabGroupsArray.length) {
    allRules[allRules.length - 1].remove();

  }
}
export let deleteButtonLogic = async (isCheckedArray: NodeListOf<Element>) => {
   await populateTabGroupsArrayFromChromeStorage();
  const ruleElements = document.querySelectorAll('.center.rule');
  let ruleElementIndexesToRemove: number[] = [];
  for (let i = 0; i < isCheckedArray.length; i += 1) {
    const checkedNameField = document.querySelectorAll('.name')[i];
    const checkedUrlField = document.querySelectorAll('.flex-center')[i];
    const box = document.querySelectorAll('.box')[i];
    const checkedItem = document.querySelectorAll('.container input')[i] as HTMLInputElement;
    // runs on last item, if checked => remove everything and end here, if not => return 
      if ((isCheckedArray[i] as HTMLInputElement).checked) {
        setValues(checkedNameField as HTMLInputElement, checkedUrlField as HTMLInputElement, box as HTMLInputElement, '', '', 'grey')
        checkedItem.checked = false;
        ruleElementIndexesToRemove.push(i);
        // remove this from tabsGroupArray which should be array of all groups retrieved from google Sync
        tabGroupsArray.splice(i, 1, {});
      }
  }
  for(let i = 0; i < ruleElementIndexesToRemove.length; i++) {
    ruleElements[ruleElementIndexesToRemove[i]].remove();
  }
   tabGroupsArray = reorderTabGroups(tabGroupsArray);
   chrome.storage.sync.set({ TABGROUPS: tabGroupsArray }, () => {
  });
}
type ButtonType = HTMLButtonElement; // Replace with actual type
type InputBoxType = HTMLInputElement[]; // Replace with actual type
type IsCheckedArrayType = HTMLInputElement[]; // Replace with actual type
type CheckedNameFieldType = HTMLInputElement[]; // Replace with actual type
type CheckedUrlFieldType = HTMLInputElement[]; // Replace with actual type
type BoxFieldType = HTMLElement[]; // Replace with actual type
type DropDownBoxType = HTMLElement[]; // Replace with actual type
// save logic
 export let saveButtonLogic = (
  button: ButtonType, 
  inputBox: InputBoxType, 
  isCheckedArray: IsCheckedArrayType,
  checkedNameField: CheckedNameFieldType,
  checkedUrlField: CheckedUrlFieldType,
  boxField: BoxFieldType, 
  dropDownBox: DropDownBoxType
) => {
  // your existing code here
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
  isCheckedArray = Array.from(document.querySelectorAll('.container input')) as HTMLInputElement[];
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
        toggleInputAndDropdown(checkedNameField[i], checkedUrlField[i], dropDownBox[i] as HTMLInputElement)
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
  toggleElementDisplay(addButton!);
  toggleElementDisplay(deleteButton!);
}
 export let editButtonLogic = (button: any, isCheckedArray: any, checkedNameField: any, checkedUrlField: any, dropDownBox: any) => {
  for (let i = 0; i < isCheckedArray.length; i += 1) {
    (document.querySelectorAll('.container')[i] as HTMLElement).style.pointerEvents = 'none';
    if (isCheckedArray[i].checked) {
      toggleInputAndDropdown(checkedNameField[i], checkedUrlField[i], dropDownBox[i])
    } 
  }
  toggleDisplays(button);
  toggleElementDisplay(addButton!);
  toggleElementDisplay(deleteButton!);
}
