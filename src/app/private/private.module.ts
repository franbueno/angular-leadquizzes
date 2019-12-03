import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { SharedModule } from '../shared/shared.module'
import { DashboardComponent } from './dashboard/dashboard.component'
import { PrivateComponent } from './private.component'
import { PrivateRoutes } from './private.routing'
import { QuestionPreviewComponent } from './question/question-preview/question-preview.component'
import { QuestionComponent } from './question/question.component'
import { QuizPreviewComponent } from './quiz/quiz-preview/quiz-preview.component'
import { QuizComponent } from './quiz/quiz.component'

@NgModule({
  declarations: [
    PrivateComponent,
    DashboardComponent,
    QuizComponent,
    QuizPreviewComponent,
    QuestionPreviewComponent,
    QuestionComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(PrivateRoutes),
    SharedModule,
  ],
})
export class PrivateModule { }
