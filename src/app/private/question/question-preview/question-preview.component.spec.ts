import { async, ComponentFixture, TestBed } from '@angular/core/testing'
import { FormControl, FormGroup } from '@angular/forms'
import { QuestionPreviewComponent } from './question-preview.component'

describe('QuestionPreviewComponent', () => {
  let component: QuestionPreviewComponent
  let fixture: ComponentFixture<QuestionPreviewComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionPreviewComponent ],
    })
    .compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionPreviewComponent)
    component = fixture.componentInstance
    component.form = new FormGroup({
      test: new FormControl('test'),
    })
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
