import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap'
import { IModalModel } from './i-modal-model'

export abstract class AModalComponent<T extends IModalModel, R> {

  protected constructor(protected activeModal: NgbActiveModal) {
  }

  /**
   * Can be used to close a modal, passing an optional result.
   */
  close(result?: R): void {
    this.activeModal.close(result)
  }

  /**
   * Can be used to dismiss a modal, passing an optional reason.
   */
  dismiss(reason?: any): void {
    this.activeModal.dismiss(reason)
  }

  abstract setData(data: T): void
}
