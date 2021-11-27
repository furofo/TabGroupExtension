const ModalWindow = {
    init() {
        document.body.addEventListener('click', e => {
            if(e.target.classList.contains("modal__close") || e.target.classList.contains("modal__goback__button")) {
                this.closeModal(e.target);
            }

            else if (e.target.classList.contains("modal__confirm__button")) {
              deleteButtonLogic(isCheckedArray, tabGroupsArray);
              this.closeModal(e.target)

            }
        })
  
    },
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
    closeModal(closeButton) {
        const modalOverlay = closeButton.parentElement.parentElement.parentElement;
       document.body.removeChild(modalOverlay);
    }
  }
  
  document.addEventListener("DOMContentLoaded", () => {
    ModalWindow.init();
  });