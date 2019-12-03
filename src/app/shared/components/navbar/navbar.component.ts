import { Component, OnInit } from '@angular/core'
import { UserModel } from '../../../core/model/user.model'
import { AuthService } from '../../../core/services/auth.service'
import { animations } from '../../animations/animations'

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  animations: [animations],
})
export class NavbarComponent implements OnInit {
  isCollapsed: boolean
  user: UserModel

  constructor(
    private authService: AuthService,
  ) { }

  ngOnInit() {
    this.isCollapsed = true
    this.authService.currentUser.subscribe((user) => {
      this.user = user
    })
  }

  logout() {
    this.authService.logout()
  }

}
