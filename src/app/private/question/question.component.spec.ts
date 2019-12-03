import { HttpClientModule } from '@angular/common/http'
import { async, ComponentFixture, TestBed } from '@angular/core/testing'
import { FormArray, FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { RouterTestingModule } from '@angular/router/testing'
import { NgxFileDropModule } from 'ngx-file-drop'
import { ToastrModule } from 'ngx-toastr'
import { QuestionService } from '../../core/services/question.service'
import { QuizService } from '../../core/services/quiz.service'
import { RestService } from '../../core/services/rest.service'
import { ModalService } from '../../shared/services/modal.service'
import { QuestionPreviewComponent } from './question-preview/question-preview.component'
import { QuestionComponent } from './question.component'

describe('QuestionComponent', () => {
  let component: QuestionComponent
  let fixture: ComponentFixture<QuestionComponent>

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
        QuestionComponent,
        QuestionPreviewComponent,
      ],
      providers: [
        ModalService,
        QuestionService,
        QuizService,
        RestService,
      ],
    })
      .compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('forms fields validity', () => {
    const name = component.formControls['name']
    const type = component.formControls['type']
    const answers = component.answers

    expect(name.valid).toBeFalsy()
    expect(type.valid).toBeFalsy()
    expect(answers.valid).toBeFalsy()

    name.setValue('')
    expect(name.hasError('required')).toBeTruthy()

    type.setValue('')
    expect(type.hasError('required')).toBeTruthy()

    // Workaround for FormGroup errors is null when invalid
    // https://github.com/angular/angular/issues/10530
    answers.setValue(['', ''])
    expect(answers.status).toBe('INVALID')
  })
})
