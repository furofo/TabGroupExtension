namespace AutoTabGroups {
  export const ModalWindow = {
    init() {
        document.body.addEventListener('click', e => {
          // IF this is go back or close button clicked return this ModalWindow objects closeMOdeal with teh element that was clicked as argument
            if(e.target.classList.contains("modal__close") || 
            e.target.classList.contains("modal__overlay") ||
            e.target.classList.contains("modal__goback__button")) {
                this.closeModal();
            }
            // if confirm button is clicked instead use delet ebutton logic  with argument isCheckedArray and tabGroups array as arguments
            else if (e.target.classList.contains("modal__confirm__button")) {
              deleteButtonLogic(isCheckedArray, tabGroupsArray);
              this.closeModal()

            }
        })
  
    },
    //function of Modal window that returns html of the modal window 
      getHtmlTemplate(modalOptions) {
      if(modalOptions.buttons){
        return`
        <div class="modal__overlay">
         <div class="modal__window">
           <div class="modal__titlebar">
             <span class="modal__title">${modalOptions.title}</span>
             <button class = "modal__close material-icons">close</button>
           </div>
           <div class="modal__content">
            ${modalOptions.content}
           </div>
           <div class = "modal__buttons">
           <button class = "modal__goback__button">Go Back</button>
            <button class = "modal__confirm__button">Confirm</button>
           </div>
          
         </div>
       </div>`;

      }

      else{
        return`
        <div class="modal__overlay">
         <div class="modal__window">
           <div class="modal__titlebar">
             <span class="modal__title">${modalOptions.title}</span>
             <button class = "modal__close material-icons">close</button>
           </div>
           <div class="modal__content">
            ${modalOptions.content}
           </div>
         </div>
       </div>`;
      }
       
    },
    openModal(modalOptions = {}) {
        modalOptions = Object.assign({
            title: 'Modal Title',
            content: 'Modal Content',
            buttons: false,
        }, modalOptions)
  
  const modalTemplate = this.getHtmlTemplate(modalOptions);
  document.body.insertAdjacentHTML("afterbegin", modalTemplate);
    },
    closeModal() {
        const modalOverlay = document.querySelector(".modal__overlay");
       document.body.removeChild(modalOverlay);
    }
  }
  
  document.addEventListener("DOMContentLoaded", () => {
    ModalWindow.init();
  });
}