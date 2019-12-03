import { Component, OnDestroy, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { ActivatedRoute, Params, Router } from '@angular/router'
import { FileSystemFileEntry, NgxFileDropEntry } from 'ngx-file-drop'
import { Subject } from 'rxjs'
import { takeUntil } from 'rxjs/operators'
import { QuizModel } from '../../core/model/quiz.model'
import { QuizService } from '../../core/services/quiz.service'
import { animations } from '../../shared/animations/animations'
import { ModalService } from '../../shared/services/modal.service'

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss'],
  animations: [animations],
})
export class QuizComponent implements OnInit, OnDestroy {
  readonly maxTextLength = 100
  readonly maxDescriptionLength = 200
  readonly maxActionLength = 20

  quiz: QuizModel
  quizForm: FormGroup
  submitted = false
  files: NgxFileDropEntry[] = []

  private onDestroy$: Subject<void> = new Subject<void>()

  get formControls() {
    return this.quizForm.controls
  }

  constructor(
    private modalService: ModalService,
    private quizService: QuizService,
    private fb: FormBuilder,
    private activeRoute: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit() {
    // Get quiz id
    this.activeRoute.params
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((params: Params) => {
        // Quiz already exist
        if (params['id'] && params['id'] !== 'new') {
          this.quizService.get(params['id']).subscribe((quiz) => {
            this.quiz = quiz
            this.buildForm(quiz)
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

  onSubmit() {
    this.submitted = true

    const { value, valid } = this.quizForm

    // Check form is validated
    if (valid) {

      // If quiz already exist
      if (this.quiz && this.quiz.id) {
        this.quizService.update({ ...this.quiz, ...value }).subscribe((resp) => {
          this.quiz = resp
          this.submitted = false
          this.modalService.toastSuccess(`Quizz "${this.quiz.name}" was updated successful.`)
        })
      } else {
        this.quizService.create(value).subscribe((resp) => {
          this.quiz = resp
          this.submitted = false
          this.modalService.toastSuccess(`Quizz "${this.quiz.name}" was created successful.`)

          // Change route once we create a new quiz
          this.router.navigateByUrl(this.router.url.replace('new', this.quiz.id))
        })
      }
    } else {
      return
    }
  }

  dropped(files: NgxFileDropEntry[]) {
    this.files = files
    for (const droppedFile of files) {

      // Accepting only one file at a time
      if (droppedFile.fileEntry.isFile) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry
        fileEntry.file(async (file: File) => {
          const base64 = await this.toBase64(file)
          this.quizForm.controls.image.setValue(base64)
        })
      }
    }
  }

  private toBase64(file: File): Promise<any> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => resolve(reader.result)
      reader.onerror = (error) => reject(error)
    })

  }

  // Quiz form builder
  private buildForm(quiz?: QuizModel) {
    this.quizForm = this.fb.group({
      name: [
        quiz ? quiz.name : '',
        [
          Validators.required,
          Validators.maxLength(this.maxTextLength),
        ],
      ],
      image: [quiz ? quiz.urlImage : ''],
      publish: [true],
      title: [
        quiz ? quiz.title : '',
        [
          Validators.required,
          Validators.maxLength(this.maxTextLength),
        ],
      ],
      description: [
        quiz ? quiz.description : '',
        [
          Validators.required,
          Validators.maxLength(this.maxDescriptionLength),
        ],
      ],
      action: [
        quiz ? quiz.action : '',
        [
          Validators.required,
          Validators.maxLength(this.maxActionLength),
        ],
      ],
    })
  }

}
