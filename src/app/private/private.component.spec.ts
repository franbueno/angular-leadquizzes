import { HttpClientModule } from '@angular/common/http'
import { async, ComponentFixture, TestBed } from '@angular/core/testing'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { RouterModule } from '@angular/router'
import { RouterTestingModule } from '@angular/router/testing'
import { SharedModule } from '../shared/shared.module'
import { PrivateComponent } from './private.component'

describe('PrivateComponent', () => {
  let component: PrivateComponent
  let fixture: ComponentFixture<PrivateComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        HttpClientModule,
        RouterModule,
        RouterTestingModule,
        SharedModule,
      ],
      declarations: [ PrivateComponent ],
    })
    .compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(PrivateComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
