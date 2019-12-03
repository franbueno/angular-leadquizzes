import { Component, ViewEncapsulation } from '@angular/core'
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap'
import { AModalComponent, IModalModel } from '../../../modal'

export class DefaultConfirmModel implements IModalModel {
  message: string
  yesNoOptions = ['Yes', 'No']
  footerButtons ? = []
}

@Component({
  selector: 'app-confirmation-modal',
  templateUrl: './confirmation-modal.component.html',
  styleUrls: ['./confirmation-modal.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class DefaultConfirmationModalComponent extends AModalComponent<DefaultConfirmModel, boolean> {

  modalData: DefaultConfirmModel

  constructor(protected activeModal: NgbActiveModal) {
    super(activeModal)
  }

  setData(data: DefaultConfirmModel): void {
    this.modalData = data
    if (!data.footerButtons) {
      this.modalData.footerButtons = [{text: 'Cancel'}, {text: 'Ok', class: 'btn-edu-primary'}]
    }
  }

}
