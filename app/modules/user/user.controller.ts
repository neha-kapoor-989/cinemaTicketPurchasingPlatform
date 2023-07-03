import { Model } from 'mongoose';
import { MessageUtil } from '../../utils/message';
import { UserService } from './user.service';

export class UserController extends UserService {
  constructor (auditoriums: Model<any>) {
    super(auditoriums);
  }

  /**
   * Create user
   * @param {*} event
   */
  async create (params) {
    try {

      const result = await this.createUser({
        name: params.name,
        email: params.email,
        phoneNumber: params.phoneNumber,
      });

      return {id : result?._id};
    } catch (err) {
      return {id :null};
    }
  }
}
