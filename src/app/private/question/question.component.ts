import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop'
import { Component, OnDestroy, OnInit } from '@angular/core'
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms'
import { ActivatedRoute, Params } from '@angular/router'
import { findIndex, isEmpty } from 'lodash'
import { Subject } from 'rxjs'
import { takeUntil } from 'rxjs/operators'
import { QuestionModel } from '../../core/model/question.model'
import { QuizModel } from '../../core/model/quiz.model'
import { QuestionService } from '../../core/services/question.service'
import { QuizService } from '../../core/services/quiz.service'
import { animations } from '../../shared/animations/animations'
import { ModalService } from '../../shared/services/modal.service'

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss'],
  animations: [animations],
})
export class QuestionComponent implements OnInit, OnDestroy {
  readonly maxTextLength = 100

  quiz: QuizModel
  question: QuestionModel
  questionForm: FormGroup
  submitted = false
  answerType: string[] = ['Text Answers'] // We could add more answers types

  private onDestroy$: Subject<void> = new Subject<void>()

  get formControls() {
    return this.questionForm.controls
  }

  get answers() {
    return this.questionForm.get('answers') as FormArray
  }

  constructor(
    private modalService: ModalService,
    private questionService: QuestionService,
    private quizService: QuizService,
    private fb: FormBuilder,
    private activeRoute: ActivatedRoute,
  ) {}

  ngOnInit() {
    // Get quiz id
    this.activeRoute.params
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((params: Params) => {
        if (params['id']) {
          this.quizService.get(params['id']).subscribe((quiz) => {
            this.quiz = quiz
            if (!isEmpty(this.quiz.questions)) {
              // Show always first question
              this.question = this.quiz.questions[0]
              this.buildForm(this.quiz.questions[0])
            } else {
              this.buildForm()
            }
          })
        } else {
          this.buildForm()
        }
      })

  }

  ngOnDestroy(): void {
    this.onDestroy$.next()
    this.onDestroy$.complete()
  }

  showQuestion(question?: QuestionModel) {
    if (question) {
      this.question = question
      this.buildForm(question)
    } else {
      this.question = new QuestionModel()
      this.buildForm()
    }
  }

  onSubmit() {
    this.submitted = true

    const { value, valid } = this.questionForm

    value.quiz = this.quiz.id
    // Check form is validated
    if (valid) {

      // If question already exist
      if (this.question && this.question.id) {
        this.questionService.update({ ...this.question, ...value }).subscribe((resp) => {
          // Update questions selector
          const indexOfQuizQuestions = this.quiz.questions.indexOf(this.question)
          if (indexOfQuizQuestions > -1) {
            this.quiz.questions.splice(indexOfQuizQuestions, 1, resp)
          }

          this.question = resp
          this.submitted = false
          this.modalService.toastSuccess(`Question ${this.question.name} was updated successful.`)
        })
      } else {
        // New question
        this.questionService.create(value).subscribe((resp) => {
          this.question = resp
          // Added to update questions selector
          this.quiz.questions.push(resp)
          this.submitted = false
          this.modalService.toastSuccess(`Question ${this.question.name} was created successful.`)
        })
      }
    } else {
      return
    }
  }

  onDrop(event: CdkDragDrop<string[]>) {
    // Change order position
    moveItemInArray(this.answers.controls, event.previousIndex, event.currentIndex)
    this.answers.updateValueAndValidity()
  }

  addAnswer() {
    this.answers.push(this.fb.control('', [Validators.required]))
    this.answers.updateValueAndValidity()
    this.answers.clearValidators()
  }

  removeAnswer(i) {
    this.answers.removeAt(i)
  }

  onChangeQuestion(data: any) {
    const indexOfQuestions = findIndex(this.quiz.questions, { name: data.name })
    if (indexOfQuestions > -1) {
      const pos = data.type ? 1 : -1
      this.question = this.quiz.questions[indexOfQuestions + pos]
      this.buildForm(this.quiz.questions[indexOfQuestions + pos])
    }
  }

  // Question form builder
  private buildForm(question?: QuestionModel) {
    this.questionForm = this.fb.group({
      name: [
        question ? question.name : '',
        [
          Validators.required,
          Validators.maxLength(this.maxTextLength),
        ],
      ],
      type: [
        question ? question.type : '',
        [
          Validators.required,
        ],
      ],
      answers: this.fb.array(
        question ? question.answers : ['', ''],
        [Validators.required, Validators.minLength(2)]),
    })
  }
}
