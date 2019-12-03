import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Router } from '@angular/router'
import { BehaviorSubject, Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { environment } from '../../../environments/environment'
import { UserModel } from '../model/user.model'

const USER_STORAGE = 'ppc-user'
const TOKEN_STORAGE_KEY = 'ppc-token'

@Injectable({ providedIn: 'root' })
export class AuthService {

  public currentUser: Observable<UserModel>
  private currentUserSubject: BehaviorSubject<UserModel>

  constructor(
    private router: Router,
    private http: HttpClient,
  ) {
    this.currentUserSubject = new BehaviorSubject<UserModel>(JSON.parse(localStorage.getItem(USER_STORAGE)))
    this.currentUser = this.currentUserSubject.asObservable()
  }

  public get currentUserValue(): UserModel {
    return this.currentUserSubject.value
  }

  login(username, password) {
    return this.http.post<any>(`${environment.api}/login`, { username, password })
      .pipe(map((resp) => {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        this.sessionUser = resp.user
        this.sessionToken = resp.token
        this.currentUserSubject.next(resp.user)
        return resp.user
      }))
  }

  logout() {
    // remove user from local storage and set current user to null
    localStorage.removeItem(TOKEN_STORAGE_KEY)
    localStorage.removeItem(USER_STORAGE)
    this.currentUserSubject.next(null)
    this.router.navigate(['/login'])
  }

  get sessionToken() {
    return localStorage.getItem(TOKEN_STORAGE_KEY)
  }

  set sessionToken(value: string) {
    localStorage.setItem(TOKEN_STORAGE_KEY, value)
  }

  get sessionUser() {
    return localStorage.getItem(USER_STORAGE)
  }

  set sessionUser(value: string) {
    localStorage.setItem(USER_STORAGE, JSON.stringify(value))
  }

}
