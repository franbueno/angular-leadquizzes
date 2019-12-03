import { Injectable } from '@angular/core'
import { map as _map } from 'lodash'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { QuizModel } from '../model/quiz.model'
import { RestService } from './rest.service'

@Injectable()
export class QuizService {

  constructor(private restService: RestService) {}

  getAll(): Observable<QuizModel[]> {
    const route = `/api/quiz`

    return this.restService.get<QuizModel[]>(route).pipe(
      map((resp) => {
        return _map(resp, (quiz) => new QuizModel(quiz))
      }),
    )
  }

  get(id: string): Observable<QuizModel> {
    const route = `/api/quiz/${id}`

    return this.restService.get<QuizModel>(route).pipe(
      map((resp) => {
        return new QuizModel(resp.data)
      }),
    )
  }

  create(quiz: QuizModel): Observable<QuizModel> {
    const route = `/api/quiz`

    return this.restService.post<QuizModel>(route, quiz).pipe(
      map((resp) => {
        return new QuizModel(resp.data)
      }),
    )
  }

  update(quiz: QuizModel): Observable<any> {
    const route = `/api/quiz/${quiz.id}`

    return this.restService.put<QuizModel>(route, quiz).pipe(
      map((resp) => {
        return new QuizModel(resp.data)
      }),
    )
  }

  delete(id: string): Observable<any> {
    const route = `/api/quiz/${id}`

    return this.restService.delete<QuizModel>(route)
  }

}
