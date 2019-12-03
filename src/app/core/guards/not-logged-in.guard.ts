import { Injectable } from '@angular/core'
import { CanActivate, Router } from '@angular/router'
import { AuthService } from '../services/auth.service'

@Injectable()
export class NotLoggedInGuard implements CanActivate {
  constructor(
    private router: Router,
    private authService: AuthService,
  ) {}

  async canActivate(): Promise<boolean> {
    const currentUser = this.authService.currentUserValue
    if (currentUser) {
      this.router.navigate(['/'])
      return false
    }
    return true
  }
}
