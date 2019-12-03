import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap'
import { ModalService } from '../../services/modal.service'
import { DefaultConfirmationModalComponent } from './confirmation-modal/confirmation-modal.component'

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    NgbModalModule,
  ],
  exports: [
    NgbModalModule,
  ],
  declarations: [DefaultConfirmationModalComponent],
  entryComponents: [DefaultConfirmationModalComponent],
  providers: [ModalService],
})
export class BaseModalModule {
}
