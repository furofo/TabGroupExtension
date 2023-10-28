namespace AutoTabGroups {
 export let createRuleElement = function() {
  let rulesContainerElement = document.querySelector(".rules-container");
    let centerRuleDiv = document.createElement("div");
    centerRuleDiv.classList.add("center");
    centerRuleDiv.classList.add("rule");
    let containerLabel = document.createElement("label");
    containerLabel.classList.add("container");
    let containerLabelChildInput = document.createElement("input");
    containerLabelChildInput.type = "checkbox";
    let containerLabelSpanChild = document.createElement("span");
    containerLabelSpanChild.classList.add("checkmark");
    containerLabel.appendChild(containerLabelChildInput);
    containerLabel.appendChild(containerLabelSpanChild);
    centerRuleDiv.appendChild(containerLabel);
    let nameContentDiv = document.createElement("div");
    nameContentDiv.classList.add("rule-content");
    nameContentDiv.classList.add("name-content");
    let nameContentChildInput = document.createElement("input");
    nameContentChildInput.classList.add("name");
    nameContentChildInput.setAttribute("id", "first-name");
    nameContentChildInput.setAttribute("value", "");
    nameContentChildInput.value = "";
    nameContentChildInput.disabled = true;
    nameContentDiv.appendChild(nameContentChildInput);
    centerRuleDiv.appendChild(nameContentDiv);

    let urlContentDiv = document.createElement("div");
    urlContentDiv.classList.add("rule-content");
    let urlContentChildInput = document.createElement("input");
    urlContentChildInput.classList.add("flex-center");
    urlContentChildInput.setAttribute("id", "first-url");
    urlContentChildInput.setAttribute("value", "");
    urlContentChildInput.value = "";
    urlContentChildInput.disabled = true;
    urlContentDiv.appendChild(urlContentChildInput);
    centerRuleDiv.appendChild(urlContentDiv);

    let colorContentDiv = document.createElement("div");
    colorContentDiv.classList.add("color-content");
    let colorContentChildBoxDiv = document.createElement("div");
    colorContentChildBoxDiv.classList.add("box");
    colorContentChildBoxDiv.setAttribute("id", "first-box");
    colorContentChildBoxDiv.setAttribute("value", "grey");
  
    //create divs for all box colors that are not gray 
    // let blueBox = document.createElement("div")
    // let yellowBox = document.createElement("div")
    // let purpleBox = document.createElement("div")
    // let greenBox = document.createElement("div")
    // let pinkBox = document.createElement("div")
    // let redBox = document.createElement("div")
    // let orangeBox = document.createElement("div")
    // let cyanBox = document.createElement("div")
    
    // blueBox.classList.add("blue-box");
    //make all color boxes divs and give them correct claass names
    let blueBox = document.createElement("div")
    blueBox.classList.add("blue-box");
    let yellowBox = document.createElement("div")
    yellowBox.classList.add("yellow-box");
    let purpleBox = document.createElement("div")
    purpleBox.classList.add("purple-box");
    let greenBox = document.createElement("div")
    greenBox.classList.add("green-box");
    let pinkBox = document.createElement("div")
    pinkBox.classList.add("pink-box");
    let redBox = document.createElement("div")
    redBox.classList.add("red-box");
    let orangeBox = document.createElement("div")
    orangeBox.classList.add("orange-box");
    let cyanBox = document.createElement("div")
    cyanBox.classList.add("cyan-box");
    // append them as child to color Content Child Box
    colorContentChildBoxDiv.appendChild(blueBox);
    colorContentChildBoxDiv.appendChild(yellowBox);
    colorContentChildBoxDiv.appendChild(purpleBox);
    colorContentChildBoxDiv.appendChild(greenBox);
    colorContentChildBoxDiv.appendChild(pinkBox);
    colorContentChildBoxDiv.appendChild(redBox);
    colorContentChildBoxDiv.appendChild(orangeBox);
    colorContentChildBoxDiv.appendChild(cyanBox);
    // append cololorContent ChildBox div as child to color content

    colorContentDiv.appendChild(colorContentChildBoxDiv);
    centerRuleDiv.appendChild(colorContentDiv);

    let dropdown = document.createElement("div");
    dropdown.classList.add("dropdown");
    let svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    svg.setAttribute("viewBox", "0 0 320 512");
    svg.setAttribute("fill", "white");
    let path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("d", "M143 256.3L7 120.3c-9.4-9.4-9.4-24.6 0-33.9l22.6-22.6c9.4-9.4 24.6-9.4 33.9 0l96.4 96.4 96.4-96.4c9.4-9.4 24.6-9.4 33.9 0L313 86.3c9.4 9.4 9.4 24.6 0 33.9l-136 136c-9.4 9.5-24.6 9.5-34 .1zm34 192l136-136c9.4-9.4 9.4-24.6 0-33.9l-22.6-22.6c-9.4-9.4-24.6-9.4-33.9 0L160 352.1l-96.4-96.4c-9.4-9.4-24.6-9.4-33.9 0L7 278.3c-9.4 9.4-9.4 24.6 0 33.9l136 136c9.4 9.5 24.6 9.5 34 .1z");
    svg.appendChild(path);
    dropdown.appendChild(svg);
    colorContentDiv.appendChild(dropdown);
    // console.log("center rule  is  ", centerRuleDiv);
    rulesContainerElement!.appendChild(centerRuleDiv);
    return centerRuleDiv;
}

// when delete button clicked removes the group number
// from google sync and from the popup page of extension
console.log(" this is tab groups delte button" , AutoTabGroups.deleteButton)
AutoTabGroups.deleteButton!.addEventListener('click', async () => {
  //use method isChecked to loop through checkboxes and see if checked or not 
  // if checked displays conirmation message, if nothing checked displays erro rmessage
  isCheckedArray = document.querySelectorAll('.container input');
  if(isChecked(isCheckedArray)) {
    ModalWindow.openModal({
      title: "Do you want to delete?",
      content: "This will permanently delete selected rules",
      buttons: true
    })
  }
  else {
    ModalWindow.openModal({
    title:'No Group Checked!',
    content: 'Please check tab group to delete a rule!'
  })
  }
});
addButton!.addEventListener('click', async(elem) => {
  let ruleElement = createRuleElement();

  // uncheck all other selectorrs other than one added
  let otherSelectorInputContainers = document.querySelectorAll('.container');
  for(let i = 0; i < otherSelectorInputContainers.length; i++) {
    const container = otherSelectorInputContainers[i] as HTMLElement; // Narrow down the type to HTMLElement
    const input = container.querySelector('input') as HTMLInputElement; // Also narrow down the type of the input

    input.checked = false;
    container.style.pointerEvents = 'none';
  }
  let addButton = elem.target as HTMLElement;
 
  let selectorInput = ruleElement.querySelector(".container > input") as HTMLInputElement;
  const checkedNameField = ruleElement.querySelector('.name-content > input') as HTMLInputElement;
  const checkedUrlField = ruleElement.querySelector('.flex-center') as HTMLInputElement;
  let dropDown = ruleElement.querySelector('.dropdown') as HTMLInputElement;
  console.log(ruleElement.querySelector(".container > input"));
  selectorInput.checked = true;
  toggleInputDisabled(checkedNameField);
  toggleInputDisabled(checkedUrlField);
  toggleDropdownBox(dropDown);
  addDropDownMenuOnClickListeners();

  // let selectedElemetn = document.querySelector("body > div.rules-container > div")
  // // let selectedElement = document.querySelector(ruleElement);
  // console.log(selectedElement);
  console.log(ruleElement);
  toggleElementDisplay(addButton);
  toggleElementDisplay(document.getElementById('go-back')!);
  toggleElementDisplay(document.getElementById('delete-group')!);
  toggleButtonText(document.getElementById('edit-add-group')!, "Select", "Save")
  checkedNameField.focus();
       
})
gobackButton!.addEventListener('click', async () => {
  const isCheckedArray = document.querySelectorAll('.container input');
  const dropDownBox = document.querySelectorAll('.dropdown') as unknown as HTMLElement[];

  // deleteButtonLogic(isCheckedArray, tabGroupsArray, dropDownBox, true)
  goBackButtonLogic(isCheckedArray, dropDownBox)
})
editAddButton!.addEventListener('click', async function () {
  addDropDownMenuOnClickListeners();
  const isCheckedArray = document.querySelectorAll('.container input');
  const inputBox = document.querySelectorAll('.container');
  const checkedNameField = document.querySelectorAll('.name');
  const checkedUrlField = document.querySelectorAll('.flex-center');
  const dropDownBox = document.querySelectorAll('.dropdown');
  const boxField = document.querySelectorAll('.box');

  // need to conver nodelistOfElments to HTMLInputElement[]
  const inputBoxes = Array.from(inputBox) as HTMLInputElement[];
  const checkedInputs = Array.from(isCheckedArray) as HTMLInputElement[]
  const checkedNameInputs = Array.from(checkedNameField) as HTMLInputElement[];
  const checkedUrlInputs = Array.from(checkedUrlField) as HTMLInputElement[];
  const boxInputs = Array.from(boxField) as HTMLInputElement[];
  const dropDownElements = Array.from(dropDownBox) as HTMLElement[];
  // if save button clicked because should be only
  // Save Button text when delete button is not visible
  if (window.getComputedStyle(deleteButton!, null).display === 'none') {
    saveButtonLogic(this as HTMLButtonElement, inputBoxes, checkedInputs, checkedNameInputs, checkedUrlInputs, boxInputs, dropDownElements);
  } 
  else {
    if (isChecked(isCheckedArray)) {
      editButtonLogic(this, isCheckedArray, checkedNameField, checkedUrlField, dropDownBox);
    }
    else {
      ModalWindow.openModal({
        title: 'No Group Checked!',
        content: 'Please check a tab group to edit/add a rule!'
      });
    }
  }
});

zoomLg!.addEventListener('click', async() => {
  document.getElementById('page-style')!.setAttribute('href', "/css/style.css")
  document.getElementById('alert-style')!.setAttribute('href', "/css/alert-boxes.css")
})
zoomReg!.addEventListener('click', async() => {
  document.getElementById('page-style')!.setAttribute('href', "/css/styles2.css")
  document.getElementById('alert-style')!.setAttribute('href', "/css/alert-boxes2.css")
})
}