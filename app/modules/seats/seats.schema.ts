import { ObjectId } from "mongoose";

export class CreateSeatDTO {
  id: string;
  row: string;
  auditoriumRefId: ObjectId;
  auditoriumId: string;
}