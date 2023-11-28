import{deleteButtonLogic, isCheckedArray, tabGroupsArray} from "./globalValAndFunction"
interface ModalOptions {
    title: string;
    content: string;
    buttons?: boolean;
}
  export const ModalWindow = {
    init() {
        document.body.addEventListener('click', this.handleClick.bind(this));  // Binding 'this' context
    },
   async handleClick(e: MouseEvent)  {
        const target = e.target as HTMLElement;
        if(target) {
            if(target.classList.contains("modal__close") || 
               target.classList.contains("modal__overlay") ||
               target.classList.contains("modal__goback__button")) {
                   this.closeModal();
            } else if (target.classList.contains("modal__confirm__button")) {
                let isCheckedArray = document.querySelectorAll('.container input');
                await deleteButtonLogic(isCheckedArray);
                this.closeModal();
            }
        }
    },
    //function of Modal window that returns html of the modal window 
      getHtmlTemplate(modalOptions: ModalOptions){
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
    openModal(modalOptions: Partial<ModalOptions> = {}) {
      modalOptions = Object.assign({
          title: 'Modal Title',
          content: 'Modal Content',
          buttons: false,
      }, modalOptions);
    const modalTemplate = this.getHtmlTemplate(modalOptions as ModalOptions);
    document.body.insertAdjacentHTML("afterbegin", modalTemplate);
    },
    closeModal() {
        const modalOverlay = document.querySelector(".modal__overlay");
        if(modalOverlay !== null) {
          document.body.removeChild(modalOverlay);
        }
       
    }
  }
  
  document.addEventListener("DOMContentLoaded", () => {
  ModalWindow.init();
  });
