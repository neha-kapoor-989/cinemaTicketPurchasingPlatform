import mongoose from 'mongoose';
export default mongoose.connect(process.env.DB_URL, {
  dbName: process.env.DB_NAME || 'CinemaBooking',
  useCreateIndex:true,
  useNewUrlParser: true,
});
