import mongoose from 'mongoose';

export type UserDocument = mongoose.Document & {
  name: string,
  email: string,
  phoneNumber: number,
  createdAt: Date,
};

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  phoneNumber: Number,
  createdAt: { type: Date, default: Date.now },
});

export const users = (mongoose.models.users ||
  mongoose.model<UserDocument>('users', userSchema)
);