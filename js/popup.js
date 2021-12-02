// when delete button clicked removes the group number
// from google sync and from the popup page of extension
deleteButton.addEventListener('click', async () => {
  //use method isChecked to loop through checkboxes and see if checked or not 
  // if checked displays conirmation message, if nothing checked displays erro rmessage
  if(isChecked(isCheckedArray)) {
    ModalWindow.openModal({
      title: "Do you want to delete?",
      content: "This will permantly delete selected rules",
      buttons: true
    })
  }
  else {
    ModalWindow.openModal({
    title:'No Group Checked!',
    content: 'please check tab group to delete a rule!'
  })
  }
});
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
      content: 'please check tab group to edit/add a rule!'
    })
    }
  }
});


