import { Model } from 'mongoose';
import { CreateCinemaDTO } from './auditorium.schema';

export class AuditoriumService {
  private auditorium: Model<any>;
  constructor(auditorium: Model<any>) {
    this.auditorium = auditorium;
  }

  /**
   * Create auditorium
   * @param params
   */
  protected async createAuditorium (params: CreateCinemaDTO): Promise<object> {
    try {
      const result = await this.auditorium.create({
        name: params.name,
        id: params.id,
        totalSeats: params.totalSeats,
        description: params?.description,
      });

      return result;
    } catch (err) {
      console.error('createAuditorium', err);
      throw err;
    }
  }

  /**
   * Find auditorium
   */
  protected findAuditoriums () {
    return this.auditorium.find();
  }

  /**
   * Query auditorium by id
   * @param id
   */
  protected findOneAuditoriumById (id: number) {
    return this.auditorium.findOne({ id });
  }

  /**
   * Delete auditorium by id
   * @param id
   */
  protected deleteOneAuditoriumById (id: number) {
    return this.auditorium.deleteOne({ id });
  }
}
