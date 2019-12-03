import { extend } from 'lodash'
import { environment } from '../../../environments/environment'
import { BaseModel, IBaseModelData } from './base.model'
import { QuestionModel } from './question.model'

export interface IQuizData extends IBaseModelData {
  name: string
  title: string
  description: string
  action: string
  image?: string
  publish?: boolean
}

export class QuizModel extends BaseModel {
  id: string
  name: string
  title: string
  description: string
  action: string
  image: string
  publish: boolean
  questions: QuestionModel[]

  constructor(data?: IQuizData) {
    super(data)

    if (data) {
      extend(this, data)
    }
  }

  get url() {
    return `/quiz/${this.id}`
  }

  get urlImage() {
    if (this.image) {
      return `${environment.api}/${this.image}`
    }
  }

  get publishStatusText(): string {
    if (this.publish) {
      return 'publish'
    } else {
      return 'unpublish'
    }
  }

  toJSON() {
    return {
      id: this.id,
      name: this.name,
      title: this.title,
      description: this.description,
      action: this.action,
      image: this.image,
      publish: this.publish,
      questions: this.questions,
    }
  }
}
