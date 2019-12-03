import { HttpClientModule } from '@angular/common/http'
import { async, ComponentFixture, TestBed } from '@angular/core/testing'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { RouterTestingModule } from '@angular/router/testing'
import { NgxFileDropModule } from 'ngx-file-drop'
import { ToastrModule } from 'ngx-toastr'
import { QuizService } from '../../core/services/quiz.service'
import { RestService } from '../../core/services/rest.service'
import { ModalService } from '../../shared/services/modal.service'
import { QuizPreviewComponent } from './quiz-preview/quiz-preview.component'
import { QuizComponent } from './quiz.component'

describe('QuizComponent', () => {
  let component: QuizComponent
  let fixture: ComponentFixture<QuizComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        FormsModule,
        HttpClientModule,
        RouterTestingModule,
        NgxFileDropModule,
        ReactiveFormsModule,
        ToastrModule.forRoot(),
      ],
      declarations: [
        QuizComponent,
        QuizPreviewComponent,
      ],
      providers: [
        ModalService,
        QuizService,
        RestService,
      ],
    })
    .compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(QuizComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('form fields validity', () => {
    const name = component.quizForm.controls['name']
    const title = component.quizForm.controls['title']
    const description = component.quizForm.controls['description']
    const action = component.quizForm.controls['action']

    expect(name.valid).toBeFalsy()
    expect(title.valid).toBeFalsy()
    expect(description.valid).toBeFalsy()
    expect(action.valid).toBeFalsy()

    name.setValue('')
    expect(name.hasError('required')).toBeTruthy()

    title.setValue('')
    expect(title.hasError('required')).toBeTruthy()

    description.setValue('')
    expect(description.hasError('required')).toBeTruthy()

    action.setValue('')
    expect(action.hasError('required')).toBeTruthy()
  })
})
