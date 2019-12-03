import { HttpClientModule } from '@angular/common/http'
import { async, ComponentFixture, TestBed } from '@angular/core/testing'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { RouterTestingModule } from '@angular/router/testing'
import { CoreModule } from '../../core/core.module'
import { DashboardComponent } from './dashboard.component'

describe('DashboardComponent', () => {
  let component: DashboardComponent
  let fixture: ComponentFixture<DashboardComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        CoreModule,
        HttpClientModule,
        RouterTestingModule,
      ],
      declarations: [ DashboardComponent ],
    })
    .compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should render title in a h1 tag', () => {
    const compiled = fixture.debugElement.nativeElement
    expect(compiled.querySelector('h1').textContent).toContain('Dashboard')
  })
})
