import { Model } from 'mongoose';
import { CreateUserDTO } from './user.schema';

export class UserService {
  private user: Model<any>;
  constructor(user: Model<any>) {
    this.user = user;
  }

  /**
   * Create users
   * @param params
   */
  protected async createUser (params: CreateUserDTO): Promise<object> {
    try {
      const result = await this.user.create({
        name: params.name,
        email: params.email,
        phoneNumber: params.phoneNumber,
      });

      return result;
    } catch (err) {
      console.error('createAuditorium', err);
      throw err;
    }
  }

  /**
   * Query user with email
   * @param id
   */
  protected findUserByEmail (email) {
    return this.user.findOne({ email :email });
  }
}
