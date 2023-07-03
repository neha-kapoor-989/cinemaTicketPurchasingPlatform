
import { Handler, Context } from 'aws-lambda';
import dotenv from 'dotenv';
import path from 'path';
const dotenvPath = path.join(__dirname, '../', `config/.env.${process.env.NODE_ENV}`);
dotenv.config({
  path: dotenvPath,
});

import { auditorium } from './model';
import { AuditoriumController } from './modules/auditorium/auditorium.controller';

const auditoriumController = new AuditoriumController(auditorium);

export const createAuditorium: Handler = (event: any, context: Context) => {
  return auditoriumController.create(event, context);
};

export const purchaseSeat: Handler = (event: any, context: Context) => {
  return auditoriumController.createBooking(event, context);
};

export const findAvailableSeats: Handler = (event: any, context: Context) => {
  return auditoriumController.findAvailable(event, context);
};

export const deleteOne: Handler = (event: any) => auditoriumController.deleteOne(event);
