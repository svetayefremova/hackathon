import mongoose, {Document, Schema} from "mongoose";

enum UserRole {
  admin,
  user
}

export interface IUser extends Document {
  id: string;
  role: UserRole;
  username: string;
  password: string;
  createdAt: number;
  updatedAt: number;
}

const user: Schema = new Schema({
  username: { type: String, unique: true, trim: true, required: true },
  password: { type: String },
  role: { type: String },
  createdAt: { type: Number },
  updatedAt: { type: Number }
});

export default mongoose.model<IUser>("User", user);