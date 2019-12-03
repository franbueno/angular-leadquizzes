import { Component, Input, OnInit } from '@angular/core'
import { FormGroup } from '@angular/forms'

@Component({
  selector: 'app-quiz-preview',
  templateUrl: './quiz-preview.component.html',
  styleUrls: ['./quiz-preview.component.scss'],
})
export class QuizPreviewComponent implements OnInit {
  @Input() form: FormGroup

  get isFormValues() {
    return this.form.value.title || this.form.value.description || this.form.value.action
  }

  get background() {
    if (this.form.value.image) {
      return this.form.value.image
    } else {
      return './assets/dashboard-no-image.jpg'
    }
  }

  constructor() { }

  ngOnInit() {
  }

}
