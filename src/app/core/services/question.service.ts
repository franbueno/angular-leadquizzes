import { Injectable } from '@angular/core'
import { map as _map } from 'lodash'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { QuestionModel } from '../model/question.model'
import { RestService } from './rest.service'

@Injectable()
export class QuestionService {

  constructor(private restService: RestService) {}

  getAll(): Observable<QuestionModel[]> {
    const route = `/api/question`

    return this.restService.get<QuestionModel[]>(route).pipe(
      map((resp) => {
        return _map(resp, (question) => new QuestionModel(question))
      }),
    )
  }

  get(id: string): Observable<QuestionModel> {
    const route = `/api/question/${id}`

    return this.restService.get<QuestionModel>(route).pipe(
      map((resp) => {
        return new QuestionModel(resp.data)
      }),
    )
  }

  create(question: QuestionModel): Observable<QuestionModel> {
    const route = `/api/question`

    return this.restService.post<QuestionModel>(route, question).pipe(
      map((resp) => {
        return new QuestionModel(resp.data)
      }),
    )
  }

  update(question: QuestionModel): Observable<any> {
    const route = `/api/question/${question.id}`

    return this.restService.put<QuestionModel>(route, question).pipe(
      map((resp) => {
        return new QuestionModel(resp.data)
      }),
    )
  }

  delete(id: string): Observable<any> {
    const route = `/api/question/${id}`

    return this.restService.delete<QuestionModel>(route)
  }

}
