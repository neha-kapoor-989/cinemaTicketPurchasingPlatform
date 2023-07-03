import { Context } from 'aws-lambda';
import { Model } from 'mongoose';
import { MessageUtil } from '../../utils/message';
import { AuditoriumService } from './auditorium.service';
import { CreateCinemaDTO } from './auditorium.schema';
import { UserController } from '../user/user.controller';
import { SeatsController } from '../seats/seats.controller';
import { BookingController } from '../booking/booking.controller';
import { seats, users, bookings } from '../../model';

const seatsController = new SeatsController(seats);
const userController = new UserController(users);
const bookingController = new BookingController(bookings);

export class AuditoriumController extends AuditoriumService {
  constructor (auditoriums: Model<any>) {
    super(auditoriums);
  }
  /**
   * Create auditorium
   * @param {*} event
   */
  async create (event: any, context?: Context) {
    console.log('functionName', context.functionName);
    const params: CreateCinemaDTO = JSON.parse(event.body);

    try {
      const result : any = await this.createAuditorium({
        name: params.name,
        id: params.id,
        totalSeats: params.totalSeats,
        description: params?.description,
      });
      console.log(result._id)
      await seatsController.createAuditoriumSeats(result._id, params.id, params.totalSeats)
      return MessageUtil.success(result);
    } catch (err) {
      return MessageUtil.error(err.code, err.message);
    }
  }

    /**
   * Create a booking
   * @param {*} event
   */
    async createBooking (event: any, context?: Context) {
      const params = JSON.parse(event.body);
  
      try {
        const result : any = await seatsController.checkSeatFree(
          event.pathParameters.id,
          params.seat
        );
        if(result) {
          //create booking now
          const userCreated = await userController.create({
            name : params.name,
            email : params.email,
            phoneNumber : params.phoneNumber,
          })
          console.log(userCreated)
          if(userCreated.id) {
            const booking = await bookingController.createBooking(
              userCreated.id 
            );
            await seatsController.update(result._id, booking?._id)
            return MessageUtil.success({ message : "Your seat is booked"});
          } else {
            return MessageUtil.error(422, "User already made a booking");
          }
        } else {
          return MessageUtil.error(422, "This seat is already booked");
        }
      } catch (err) {
        return MessageUtil.error(err.code, err.message);
      }
    }

  /**
   * Find auditorium list
   */
  async find () {
    try {
      const result = await this.findAuditoriums();

      return MessageUtil.success(result);
    } catch (err) {
      console.error(err);

      return MessageUtil.error(err.code, err.message);
    }
  }

  /**
   * Query auditorium by id
   * @param event
   */
  async findAvailable (event: any, context: Context) {
    const id: string = String(event.pathParameters.id);
    try {
      const result = await this.findOneAuditoriumById(id);
      if(result && result._id) {
        const seats = await seatsController.findAvailableSeats(id);
        return MessageUtil.success(seats);
      } else {
        return MessageUtil.error(404, 'Seat not available');
      }
    } catch (err) {
      console.error(err);

      return MessageUtil.error(err.code, err.message);
    }
  }

  /**
   * Delete auditorium by id
   * @param event
   */
  async deleteOne (event: any) {
    const id: number = event.pathParameters.id;

    try {
      const result = await this.deleteOneAuditoriumById(id);

      if (result.deletedCount === 0) {
        return MessageUtil.error(1010, 'The data was not found! May have been deleted!');
      }

      return MessageUtil.success(result);
    } catch (err) {
      console.error(err);

      return MessageUtil.error(err.code, err.message);
    }
  }
}
