import { extend } from 'lodash'
import * as moment from 'moment-timezone'

export interface IBaseModelData {
  id?: string
  createdAt ?: string | Date | moment.Moment
  updatedAt ?: string | Date | moment.Moment
}

export class BaseModel {
  id: string
  createdAt: moment.Moment
  updatedAt: moment.Moment

  constructor(data?: IBaseModelData, extendAll = false) {
    if (data) {
      if (extendAll) {
        extend(this, data)
      }

      this.id = data.id

      if (data.createdAt) {
        this.createdAt = this.transformDate(data.createdAt)
      }

      if (data.updatedAt) {
        this.updatedAt = this.transformDate(data.updatedAt)
      }
    }
  }

  toJSON(): any {
    return {
      id: this.id,
    }
  }

  protected transformDate(date: string | Date | moment.Moment) {
    return moment(date, moment.ISO_8601, true).local()
  }
}
