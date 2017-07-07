import {Component} from '@angular/core';
import {ModalModule} from "ng2-modal";

declare var $ : any;
@Component({
    selector: "app-custom-modal",
    template: `
<div class="row">
    <button (click)="myModal.open()">open my modal</button>
    <modal #myModal>
        <modal-header>
            <h1>Modal header</h1>
        </modal-header>
        <modal-content>
            Hello Modal!
        </modal-content>
        <modal-footer>
            <button class="btn btn-primary" (click)="myModal.close()">close</button>
        </modal-footer>
    </modal>
</div>
    `
})

export class NgbdModalBasic {
  closeResult: string;

  constructor() {}
   
}


// Reference
// http://jasonwatmore.com/post/2017/01/24/angular-2-custom-modal-window-dialog-box
// http://plnkr.co/edit/?p=preview