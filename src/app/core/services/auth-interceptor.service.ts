import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Router } from '@angular/router'
import { Observable } from 'rxjs'
import { tap } from 'rxjs/operators'
import { NOT_FOUND, UNAUTHENTICATED } from '../../shared/data/http-status-codes'
import { AuthService } from './auth.service'

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private router: Router,
    private authService: AuthService,
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // ignore login contains "auth", since they'll likely be logging in
    if (req.url.match(/(auth|login|amazonaws)/)) {
      return next.handle(req)
    }

    // Clone the request to add the new header.
    const token = this.authService.sessionToken

    if (token) {
      const headers = req.headers
        .set('Authorization', `Bearer ${token}`)
      // .set('Pragma', 'no-cache')
      // .set('Cache-Control', 'no-cache')
      // .set('If-Modified-Since', 'Tue, 01 Jan 1980 1:00:00 GMT')

      const authReq = req.clone({ headers })

      // Pass on the cloned request instead of the original request.
      return next.handle(authReq)
        .pipe(
          tap((event: HttpEvent<any>) => {
            if (event instanceof HttpResponse) {
              const headerNames = ['authorization', 'x-amzn-remapped-authorization', 'maps.googleapis.com']
              const newToken = headerNames.reduce((acc: string, name: string) => event.headers.get(name) || acc, null)

              if (newToken) {
                // update and ratchet session token automatically
                this.authService.sessionToken = newToken
              }
            }
          }, (err: any) => {
            if (err instanceof HttpErrorResponse && err.status === NOT_FOUND) {
              this.router.navigate(['/'])
            } else if (err instanceof HttpErrorResponse && err.status === UNAUTHENTICATED) {
              this.authService.logout()
            }
          }),
        )
    } else {
      return next.handle(req)
    }
  }
}
