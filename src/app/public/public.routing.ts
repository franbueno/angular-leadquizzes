import { Routes } from '@angular/router'
import { NotLoggedInGuard } from '../core/guards/not-logged-in.guard'
import { LoginComponent } from './login/login.component'

export const PublicRoutes: Routes = [
  {
    path: '',
    component: LoginComponent,
    canActivate: [NotLoggedInGuard],
  },
]
