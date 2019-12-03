import { inject, TestBed } from '@angular/core/testing'

import { NgbModule } from '@ng-bootstrap/ng-bootstrap'
import { ToastrModule } from 'ngx-toastr'
import { ModalService } from './modal.service'

describe('ModalService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        NgbModule,
        ToastrModule.forRoot(),
      ],
      providers: [ModalService],
    })
  })

  it('should be created', inject([ModalService], (service: ModalService) => {
    expect(service).toBeTruthy()
  }))
})
