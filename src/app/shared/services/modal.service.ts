import { Injectable, Type } from '@angular/core'
import { NgbModal, NgbModalOptions, NgbModalRef } from '@ng-bootstrap/ng-bootstrap'
import { ActiveToast, ToastrService } from 'ngx-toastr'
import { IndividualConfig } from 'ngx-toastr/toastr/toastr-config'
import { AModalComponent, IModalModel } from '../modal'
import { DefaultConfirmationModalComponent, DefaultConfirmModel } from '../modules/modal/confirmation-modal/confirmation-modal.component'

@Injectable()
export class ModalService {
  private toastrDefaultConfig: Partial<IndividualConfig> = {
    closeButton: false,
    timeOut: 5000,
    positionClass: 'toast-bottom-right',
    extendedTimeOut: 1000,
    disableTimeOut: false,
    enableHtml: true,
    tapToDismiss: true,
  }

  constructor(private toastService: ToastrService, private modalService: NgbModal) { }

  public openModal<T extends IModalModel, R>(modalComponent: Type<AModalComponent<T, R>>, modalModel?: T,
                                             options?: NgbModalOptions): NgbModalRef {
    if (!options) {
      options = this.defaultOption()
    }
    const modalRef = this.modalService.open(modalComponent, options)
    modalRef.componentInstance.setData(modalModel)

    return modalRef
  }

  public open<T extends IModalModel, R>(modalComponent: Type<AModalComponent<T, R>>, modalModel?: T,
                                        options?: NgbModalOptions): Promise<any> {
    const modalResult = this.openModal(modalComponent, modalModel, options).result
    return new Promise((resolve) => modalResult.then(
      (data) => resolve(data),
      () => resolve(),
    ))
  }

  public openConfirmModal(modalModel: DefaultConfirmModel, options?: NgbModalOptions): Promise<any> {
    return this.open(DefaultConfirmationModalComponent, modalModel, options)
  }

  public toastSuccess(message: string, title?: string): ActiveToast<any> {
    return this.toastService.success(message, title, this.toastrDefaultConfig)
  }

  public toastInfo(message: string, title?: string): ActiveToast<any> {
    return this.toastService.info(message, title, this.toastrDefaultConfig)
  }

  public toastError(message: string, title?: string): ActiveToast<any> {
    const toastrErrorConfig = Object.assign({}, this.toastrDefaultConfig)
    toastrErrorConfig.tapToDismiss = false
    toastrErrorConfig.disableTimeOut = true
    toastrErrorConfig.closeButton = true

    return this.toastService.error(message, title, toastrErrorConfig)
  }

  private defaultOption(): NgbModalOptions {
    const  defaultOptions = {}
    defaultOptions['backdrop'] = 'static'
    defaultOptions['keyboard'] = 'false'
    return defaultOptions
  }
}
