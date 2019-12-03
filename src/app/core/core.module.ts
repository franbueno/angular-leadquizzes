import { CommonModule } from '@angular/common'
import { HTTP_INTERCEPTORS } from '@angular/common/http'
import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { SharedModule } from '../shared/shared.module'
import { NotLoggedInGuard } from './guards/not-logged-in.guard'
import { QuizGuard } from './guards/quiz.guard'
import { AuthGuard } from './guards/user-auth.guard'
import { AuthInterceptor } from './services/auth-interceptor.service'
import { QuestionService } from './services/question.service'
import { QuizService } from './services/quiz.service'
import { RestService } from './services/rest.service'

const modules = [
  RouterModule,
  CommonModule, // provides basic angular template functionality
  SharedModule,
]

const providers = [
  AuthInterceptor,
  QuestionService,
  QuizService,
  RestService,
  AuthGuard,
  NotLoggedInGuard,
  QuizGuard,
  {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true,
  },
]

@NgModule({
  imports: [
    ...modules,
  ],
  exports: [
    ...modules,
  ],
  providers: [
    ...providers,
  ],
})
export class CoreModule { }
