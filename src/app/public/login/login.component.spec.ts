import { HttpClientModule } from '@angular/common/http'
import { async, ComponentFixture, TestBed } from '@angular/core/testing'
import { ReactiveFormsModule } from '@angular/forms'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { RouterModule } from '@angular/router'
import { RouterTestingModule } from '@angular/router/testing'
import { ToastrModule } from 'ngx-toastr'
import { ModalService } from '../../shared/services/modal.service'
import { LoginComponent } from './login.component'

describe('LoginComponent', () => {
  let component: LoginComponent
  let fixture: ComponentFixture<LoginComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        HttpClientModule,
        RouterModule,
        RouterTestingModule,
        ReactiveFormsModule,
        ToastrModule.forRoot(),
      ],
      declarations: [ LoginComponent ],
      providers: [ ModalService ],
    })
    .compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should render title in a h3 tag', () => {
    const compiled = fixture.debugElement.nativeElement
    expect(compiled.querySelector('h3').textContent).toContain('Welcome')
  })

  it('form fields validity', () => {
    const username = component.loginForm.controls['username']
    const password = component.loginForm.controls['password']

    expect(username.valid).toBeFalsy()
    expect(password.valid).toBeFalsy()

    username.setValue('')
    expect(username.hasError('required')).toBeTruthy()

    password.setValue('')
    expect(password.hasError('required')).toBeTruthy()
  })
})
