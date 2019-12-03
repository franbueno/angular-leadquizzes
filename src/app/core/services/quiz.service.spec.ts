import { HttpClientModule } from '@angular/common/http'
import { TestBed } from '@angular/core/testing'
import { CoreModule } from '../core.module'
import { QuizService } from './quiz.service'

describe('QuizService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      CoreModule,
      HttpClientModule,
    ],
  }))

  it('should be created', () => {
    const service: QuizService = TestBed.get(QuizService)
    expect(service).toBeTruthy()
  })
})
