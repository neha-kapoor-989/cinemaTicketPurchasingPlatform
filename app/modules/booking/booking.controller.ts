import { Model } from 'mongoose';
import { BookingService } from './booking.service';

export class BookingController extends BookingService {
  constructor (bookings: Model<any>) {
    super(bookings);
  }

  /**
   * Create bookings
   * @param {*} event
   */
  async createBooking (params : any) {
    try {
      const result = await this.create(params);

      return result?._id;
    } catch (err) {
      return null;
    }
  }
}
