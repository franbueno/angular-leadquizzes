import { HttpClientModule } from '@angular/common/http'
import { TestBed } from '@angular/core/testing'
import { CoreModule } from '../core.module'
import { QuestionService } from './question.service'

describe('QuestionService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      CoreModule,
      HttpClientModule,
    ],
  }))

  it('should be created', () => {
    const service: QuestionService = TestBed.get(QuestionService)
    expect(service).toBeTruthy()
  })
})
