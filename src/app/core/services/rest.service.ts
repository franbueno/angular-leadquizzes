import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http'
import { Injectable } from '@angular/core'
import * as _ from 'lodash'
import { Observable } from 'rxjs'
import { resolve as urlResolve } from 'url'
import { environment } from '../../../environments/environment'

interface IRestResponseError {
  field: string
  message?: string
}

export interface IRestResponse<T> {
  success: boolean
  data: T
  message?: string
  errors?: IRestResponseError[]
}

export interface IHttpRequestOptions {
  headers?: HttpHeaders
  params?: HttpParams
  reportProgress?: boolean
  responseType?: 'json'
  withCredentials?: boolean
  body?: any
}

@Injectable()
export class RestService {
  constructor(protected http: HttpClient) {}

  // retrieve something
  get<T>(route: string, params?: HttpParams, options: IHttpRequestOptions = {}): Observable<IRestResponse<T>> {
    const url = this.getApiUrl(route)
    options.headers = this.getDefaultHeaders(options.headers)
    options.params = params
    options = this.getDefaultOptions(options)
    return this.http.get<IRestResponse<T>>(url, options)
  }

  // create something
  post<T>(route: string, body: any, options: IHttpRequestOptions = {}): Observable<IRestResponse<T>> {
    const url = this.getApiUrl(route)
    options.headers = this.getDefaultHeaders(options.headers)
    options = this.getDefaultOptions(options)
    return this.http.post<IRestResponse<T>>(url, body, options)
  }

  // update something via replacing all of its data
  put<T>(route: string, body: any, options: IHttpRequestOptions = {}): Observable<IRestResponse<T>> {
    const url = this.getApiUrl(route)
    options.headers = this.getDefaultHeaders(options.headers)
    options = this.getDefaultOptions(options)
    return this.http.put<IRestResponse<T>>(url, body, options)
  }

  // delete something
  delete<T>(route: string,  options: IHttpRequestOptions = {}): Observable<IRestResponse<T>> {
    const url = this.getApiUrl(route)
    options.headers = this.getDefaultHeaders(options.headers)
    options = this.getDefaultOptions(options)
    return this.http.delete<IRestResponse<T>>(url, options)
  }

  getApiUrl(route: string = '') {
    return urlResolve(this.getBaseApiUrl(), route)
  }

  getUrl(route: string = '') {
    return urlResolve(this.getBaseUrl(), route)
  }

  protected getDefaultHeaders(headers?: HttpHeaders): HttpHeaders {
    if (!headers) {
      headers = new HttpHeaders()
    }

    if (!headers.has('Content-Type')) {
      headers.set('Content-Type', 'application/json')
    }

    return headers
  }

  protected getDefaultOptions(options: IHttpRequestOptions): IHttpRequestOptions {
    return _.extend({
      responseType: 'json',
    }, options)
  }

  private getBaseApiUrl() {
    return environment.api
  }

  private getBaseUrl() {
    return window.location.origin
  }
}
