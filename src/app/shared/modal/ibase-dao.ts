import { Observable } from 'rxjs'

export interface IBaseDao<T> {

  create(body: T): Observable<T>

  update(body: T): Observable<T>

  delete(id: number): Observable<boolean>

  getById(id: number): Observable<T>

  getAll(): Observable<T[]>
}
