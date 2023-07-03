import mongoose, { ObjectId } from 'mongoose';
import { Model } from 'mongoose';
import { CreateSeatDTO } from './seats.schema';

export class SeatsService {
  private seats: Model<any>;
  constructor(seats: Model<any>) {
    this.seats = seats;
  }

  /**
   * Create seat for a auditorium
   * @param data
   */
  protected async createSeat(dataSet: CreateSeatDTO): Promise<object> {
    try {
      const result = await this.seats.create(dataSet);

      return result;
    } catch (err) {
      console.error('createSeats', err);
      throw err;
    }
  }

   /**
   * Query auditorium by id
   * @param id
   */
    protected findSeats (id) {
      return this.seats.find({ auditoriumId :id, booked : false });
    }


    /**
   * Query for seat available
   * @param id
   */
    protected checkSeatAvailable (auditoriumId, seatId) {
      return this.seats.findOne({ auditoriumId : auditoriumId, id : seatId, booked : false  });
    }

    
  /**
   * Update  by id
   * @param id
   * @param data
   */
  protected updateSeat (_id, bookingId) {
    return this.seats.findOneAndUpdate(
      { _id },
      { bookingId, booked : true },
    );
  }
}
