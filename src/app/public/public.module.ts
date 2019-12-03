import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { SharedModule } from '../shared/shared.module'
import { LoginComponent } from './login/login.component'
import { PublicRoutes } from './public.routing'

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(PublicRoutes),
    SharedModule,
  ],
})
export class PublicModule { }
