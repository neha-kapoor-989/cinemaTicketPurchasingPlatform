import { Model, ObjectId } from 'mongoose';

export class BookingService {
  private bookings: Model<any>;
  constructor(bookings: Model<any>) {
    this.bookings = bookings;
  }
  /**
   * Create cooking
   * @param params
   */
  protected async create (userId: ObjectId): Promise<object> {
    try {
      console.log('userId', userId)
      const result = await this.bookings.create({
        userId,
        reserved: true,
        paid: true,
      });
      console.log('createBooking', result)
      return result;
    } catch (err) {
      console.log('createBooking', err)
      throw err;
    }
  }
}
