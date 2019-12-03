import { extend } from 'lodash'
import { BaseModel, IBaseModelData } from './base.model'

export interface IQuestionData extends IBaseModelData {
  name: string
  type: string
  answers: string[]
}

export class QuestionModel extends BaseModel {
  id: string
  name: string
  type: string
  answers: string[]

  constructor(data?: IQuestionData) {
    super(data)

    if (data) {
      extend(this, data)
    }
  }

  toJSON() {
    return {
      name: this.name,
      type: this.type,
      answers: this.answers,
    }
  }
}
