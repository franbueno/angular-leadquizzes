import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { FormsModule } from '@angular/forms'
import { NgbActiveModal, NgbModalModule } from '@ng-bootstrap/ng-bootstrap'
import { DefaultConfirmationModalComponent } from './confirmation-modal.component'

describe('DefaultConfirmationModalComponent', () => {
  let component: DefaultConfirmationModalComponent
  let fixture: ComponentFixture<DefaultConfirmationModalComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        NgbModalModule,
      ],
      declarations: [ DefaultConfirmationModalComponent ],
      providers: [
        NgbActiveModal,
      ],
    })
      .compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(DefaultConfirmationModalComponent)
    component = fixture.componentInstance
    component.setData({message: '', yesNoOptions: ['Yes', 'No']})
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
