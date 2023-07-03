import mongoose from 'mongoose';

export type AuditoriumDocument = mongoose.Document & {
  id: string,
  name: string,
  totalSeats: number,
  description: String,
  createdAt: Date,
};

const auditoriumSchema = new mongoose.Schema({
  id: { 
    type: String, 
    index: true, 
    unique: true 
  },
  name: String,
  totalSeats: Number,
  description: Number,
  createdAt: { type: Date, default: Date.now },
});

export const auditorium = (mongoose.models.cinema ||
  mongoose.model<AuditoriumDocument>('cinema', auditoriumSchema)
);