import { Routes } from '@angular/router'
import { QuizGuard } from '../core/guards/quiz.guard'
import { AuthGuard } from '../core/guards/user-auth.guard'
import { DashboardComponent } from './dashboard/dashboard.component'
import { PrivateComponent } from './private.component'
import { QuestionComponent } from './question/question.component'
import { QuizComponent } from './quiz/quiz.component'

export const PrivateRoutes: Routes = [
  {
    path: '',
    component: PrivateComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: DashboardComponent,
      },
      {
        path: 'quiz/:id',
        component: QuizComponent,
        canActivate: [QuizGuard],
      },
      {
        path: 'quiz/question/:id',
        component: QuestionComponent,
        canActivate: [QuizGuard],
      },
    ],
  },

]
