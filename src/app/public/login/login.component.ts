import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router'
import { first } from 'rxjs/operators'
import { AuthService } from '../../core/services/auth.service'
import { animations } from '../../shared/animations/animations'
import { ModalService } from '../../shared/services/modal.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [animations],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup
  loading = false
  submitted = false
  returnUrl: string

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthService,
    private modalService: ModalService,
  ) {
    // redirect to home if already logged in
    if (this.authenticationService.currentUserValue) {
      this.router.navigate(['/'])
    }
  }

  ngOnInit() {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    })

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/dashboard'
  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls }

  onSubmit() {
    this.submitted = true

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return
    }

    this.loading = true
    this.authenticationService.login(this.f.username.value, this.f.password.value)
      .pipe(first())
      .subscribe(
        (data) => {
          this.modalService.toastSuccess(`User logged successfully`)
          this.router.navigate([this.returnUrl])
        },
        (error) => {
          this.modalService.toastError(`Error trying to login`)
          this.loading = false
        })
  }
}
