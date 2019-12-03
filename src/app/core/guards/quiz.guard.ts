import { Injectable } from '@angular/core'
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router'
import { ModalService } from '../../shared/services/modal.service'
import { QuizService } from '../services/quiz.service'

@Injectable({ providedIn: 'root' })
export class QuizGuard implements CanActivate {
  constructor(
    private modalService: ModalService,
    private quizService: QuizService,
    private router: Router,
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> | boolean {
    if (route.params.id !== 'new') {
      return new Promise<boolean>((resolve, reject) => {
        this.quizService.get(route.params.id).subscribe((quiz) => {
          if (quiz.publish) {
            resolve(true)
          } else {
            this.modalService.toastInfo(`Sorry you can’t access that route until you publish "${quiz.name}".`)
            this.router.navigate(['/'])
            resolve(false)
          }
        })
      })
    } else {
      return true
    }
  }
}
