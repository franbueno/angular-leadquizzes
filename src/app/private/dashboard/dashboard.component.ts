import { Component, OnDestroy, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { remove } from 'lodash'
import { Subject } from 'rxjs'
import { takeUntil } from 'rxjs/operators'
import { QuizModel } from '../../core/model/quiz.model'
import { QuizService } from '../../core/services/quiz.service'
import { animations } from '../../shared/animations/animations'
import { DefaultConfirmModel } from '../../shared/modules/modal/confirmation-modal/confirmation-modal.component'
import { ModalService } from '../../shared/services/modal.service'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  animations: [animations],
})
export class DashboardComponent implements OnInit, OnDestroy {
  quizzes: QuizModel[]

  private onDestroy$: Subject<void> = new Subject<void>()

  constructor(
    private quizService: QuizService,
    private modalService: ModalService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.quizService.getAll()
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((quizzes) => {
        this.quizzes = quizzes
      })
  }

  ngOnDestroy(): void {
    this.onDestroy$.next()
    this.onDestroy$.complete()
  }

  changePublishState(quiz: QuizModel) {
    const confirmModalModel = new DefaultConfirmModel()

    quiz.publish = !quiz.publish
    confirmModalModel.message = `Are you sure that you want to ${quiz.publishStatusText} quiz <strong>${quiz.name}</strong>?`
    confirmModalModel.footerButtons = [{
      text: 'No',
    }, {
      text: 'Yes',
      class: 'btn-success',
    }]

    this.modalService.openConfirmModal(confirmModalModel).then(
      (res) => {
        if (res) {
          this.quizService.update(quiz).subscribe(() => {
            this.modalService.toastSuccess(`Quizz "${quiz.name}" was updated successful.`)
          })
        } else {
          quiz.publish = !quiz.publish
        }
      },
    )
  }

  editQuiz(quiz: QuizModel) {
    if (quiz.publish) {
      this.router.navigate([quiz.url])
    } else {
      this.modalService.toastInfo(`Sorry you can’t access that route until you publish "${quiz.name}".`)
    }
  }

  deleteQuiz(quiz: QuizModel) {
    const confirmModalModel = new DefaultConfirmModel()

    confirmModalModel.message = `Are you sure that you want to delete quiz <strong>${quiz.name}</strong>?`
    confirmModalModel.footerButtons = [{
      text: 'No',
    }, {
      text: 'Yes',
      class: 'btn-danger',
    }]

    this.modalService.openConfirmModal(confirmModalModel).then(
      (res) => {
        if (res) {
          this.quizService.delete(quiz.id).subscribe(() => {
            remove(this.quizzes, {id: quiz.id})
            this.modalService.toastSuccess(`Quizz "${quiz.name}" was deleted successful.`)
          })
        }
      },
    )
  }

}
