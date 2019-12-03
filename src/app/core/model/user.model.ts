import { extend } from 'lodash'
import { BaseModel, IBaseModelData } from './base.model'

export interface IUserData extends IBaseModelData {
  username: string
  email: string
  password: string
}

export class UserModel extends BaseModel {
  id: string
  username: string
  email: string
  password: string

  constructor(data?: IUserData) {
    super(data)

    if (data) {
      extend(this, data)
    }
  }

  toJSON() {
    return {
      id: this.id,
      username: this.username,
      email: this.email,
      password: this.password,
    }
  }
}
