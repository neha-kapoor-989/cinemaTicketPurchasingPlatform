import mongoose, { Schema } from 'mongoose';

export type BookingDocument = mongoose.Document & {
  userId: string,
  reserved: boolean,
  paid: boolean,
  createdAt: Date,
};

const bookingSchema = new mongoose.Schema({
  userId: {
    type : Schema.Types.ObjectId,
    ref : "users"
  },
  reserved: Boolean,
  paid: Boolean,
  createdAt: { type: Date, default: Date.now },
});

export const bookings = (mongoose.models.bookings ||
  mongoose.model<BookingDocument>('bookings', bookingSchema)
);