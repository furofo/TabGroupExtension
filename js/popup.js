// when delete button clicked removes the group number
// from google sync and from the popup page of extension
deleteButton.addEventListener('click', async () => {
  //use method isChecked to loop through checkboxes and see if checked or not 
  // if checked displays conirmation message, if nothing checked displays erro rmessage
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
addButton.addEventListener('click', async() => {
  console.log("add button clicked")
})
gobackButton.addEventListener('click', async () => {
  const isCheckedArray = document.querySelectorAll('.container input');
  const dropDownBox = document.querySelectorAll('.dropdown');
  // deleteButtonLogic(isCheckedArray, tabGroupsArray, dropDownBox, true)
  goBackButtonLogic(isCheckedArray, dropDownBox)
})
editAddButton.addEventListener('click', async function ()  {
  const isCheckedArray = document.querySelectorAll('.container input');
  const inputBox = document.querySelectorAll('.container');
  const checkedNameField = document.querySelectorAll('.name');
  const checkedUrlField = document.querySelectorAll('.flex-center');
  const dropDownBox = document.querySelectorAll('.dropdown');
  const boxField = document.querySelectorAll('.box');
  // if save button clicked  because should be only
  // Save Button text when delete button is not visible
  if (window.getComputedStyle(deleteButton, null).display === 'none') {
    saveButtonLogic(this, inputBox, isCheckedArray, checkedNameField, checkedUrlField, boxField, dropDownBox);
  } 
  else {
    if(isChecked(isCheckedArray)) {
      editButtonLogic(this, isCheckedArray, checkedNameField, checkedUrlField, dropDownBox);
    }
    else {
      ModalWindow.openModal({
      title:'No Group Checked!',
      content: 'Please check tab group to edit/add a rule!'
    })
    }
  }
});
zoomLg.addEventListener('click', async() => {
  document.getElementById('page-style').setAttribute('href', "/css/style.css")
  document.getElementById('alert-style').setAttribute('href', "/css/alert-boxes.css")
})
zoomReg.addEventListener('click', async() => {
  document.getElementById('page-style').setAttribute('href', "/css/styles2.css")
  document.getElementById('alert-style').setAttribute('href', "/css/alert-boxes2.css")
})
