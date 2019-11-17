import mongoose, {Document, Schema} from "mongoose";

export enum UserRole {
  admin,
  user,
}

export interface IUser extends Document {
  id: string;
  username: string;
  email: string;
  password: string;
  facebookId: string;
  role: UserRole;
  createdAt: number;
  updatedAt: number;
}

const user: Schema = new Schema({
  username: {type: String, trim: true},
  email: {type: String, unique: true, required: true},
  password: {type: String},
  facebookId: {type: String},
  role: {type: String},
  createdAt: {type: Number},
  updatedAt: {type: Number},
});

user.set("toObject", {getters: true, virtuals: true});

export default mongoose.model<IUser>("User", user);
