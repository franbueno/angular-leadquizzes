import { HttpClientModule } from '@angular/common/http'
import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { ToastrModule } from 'ngx-toastr'
import { AppComponent } from './app.component'
import { AppRoutingModule } from './app.routing.module'
import { CoreModule } from './core/core.module'

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    CoreModule,
    HttpClientModule,
    ToastrModule.forRoot(),
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
