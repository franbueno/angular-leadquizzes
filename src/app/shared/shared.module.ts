import { DragDropModule } from '@angular/cdk/drag-drop'
import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { RouterModule } from '@angular/router'
import { NgbCollapseModule, NgbDropdownModule, NgbModalModule } from '@ng-bootstrap/ng-bootstrap'
import { NgxFileDropModule } from 'ngx-file-drop'
import { ToastrModule } from 'ngx-toastr'
import { NavbarComponent } from './components/navbar/navbar.component'
import { BaseModalModule } from './modules/modal/modal.module'

const modulesToExport = [
  BaseModalModule,
  DragDropModule,
  FormsModule,
  NgbCollapseModule,
  NgbDropdownModule,
  NgbModalModule,
  NgxFileDropModule,
  ReactiveFormsModule,
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ToastrModule.forRoot({
      enableHtml: true,
      closeButton: true,
      easeTime: 300,
      extendedTimeOut: 1000,
      timeOut: 3000,
      maxOpened: 3,
      autoDismiss: true,
    }),
    ...modulesToExport,
  ],
  declarations: [NavbarComponent],
  exports: [
    CommonModule,
    NavbarComponent,
    ToastrModule,
    ...modulesToExport,
  ],
})
export class SharedModule { }
