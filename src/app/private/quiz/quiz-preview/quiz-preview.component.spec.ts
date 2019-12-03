import { async, ComponentFixture, TestBed } from '@angular/core/testing'
import { FormControl, FormGroup } from '@angular/forms'
import { RouterModule } from '@angular/router'
import { RouterTestingModule } from '@angular/router/testing'
import { QuizPreviewComponent } from './quiz-preview.component'

describe('QuizPreviewComponent', () => {
  let component: QuizPreviewComponent
  let fixture: ComponentFixture<QuizPreviewComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterModule,
        RouterTestingModule,
      ],
      declarations: [ QuizPreviewComponent ],
    })
    .compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(QuizPreviewComponent)
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
