import { Component, EventEmitter, Input, Output } from '@angular/core'
import { FormGroup } from '@angular/forms'
import { findIndex } from 'lodash'
import { QuestionModel } from '../../../core/model/question.model'

@Component({
  selector: 'app-question-preview',
  templateUrl: './question-preview.component.html',
  styleUrls: ['./question-preview.component.scss'],
})
export class QuestionPreviewComponent {
  @Input() questions: QuestionModel[]
  @Input() form: FormGroup
  @Output() next = new EventEmitter<any>()

  get questionPosition(): number {
    const indexOfQuestions = findIndex(this.questions, { id: this.form.value.id })

    if (indexOfQuestions > -1) {
      return indexOfQuestions + 1
    } else {
      return
    }
  }

  constructor() { }

  changeQuestion(type?: boolean) {
    this.next.emit({
      id: this.form.value.id,
      type,
    })
  }
}
