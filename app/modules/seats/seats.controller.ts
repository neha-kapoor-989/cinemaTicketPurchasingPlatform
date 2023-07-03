import { Model } from 'mongoose';
import { SeatsService } from './seats.service';
import { MessageUtil } from '../../utils/message';

export class SeatsController extends SeatsService {
  constructor (seats: Model<any>) {
    super(seats);
  }

  async createAuditoriumSeats (auditoriumId, id, totalSeats : number) {
    const rowCount = Math.round(totalSeats/10);
    const rowName = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S'];

    for (let i = 0; i < rowCount; i++) {
      [...Array(10)].forEach((_, j) => {
        let createRow = {id: rowName[i]+j, row : rowName[i], auditoriumRefId : auditoriumId, auditoriumId: id };
        if(j==0 || j===9) {
          createRow['corner'] = true;
        }
        this.createSeat(createRow);
      });
    }
  }

  /**
   * Find all available seats list
   */
  async findAvailableSeats (id) {
    try {
      const result = await this.findSeats(id);
      return result;
    } catch (err) {
      console.log(err)
      return [];
    }
  }

  
  /**
   * Update a book by id
   * @param event
   */
  async update (_id, bookingId) {
    try {
      const result = await this.updateSeat(_id, bookingId);
      return MessageUtil.success(result);
    } catch (err) {
      console.error('updateSeat', err);

      return MessageUtil.error(err.code, err.message);
    }
  }

  /**
   * Find for one seat
   */
  async checkSeatFree (auditoriumId, seatId) {
    try {
      const result = await this.checkSeatAvailable(auditoriumId, seatId);
      return result;
    } catch (err) {
      console.log(err)
      return [];
    }
  }

}
