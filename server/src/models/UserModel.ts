import mongoose, {Document, Schema} from "mongoose";

export enum UserRole {
  admin,
  user,
}

export interface Social {
  id: string;
  token: string;
}

export interface IUser extends Document {
  id: string;
  username: string;
  email: string;
  password: string;
  role: UserRole;
  social: {
    facebookProvider: Social;
    googleProvider: Social;
  };
  createdAt: number;
  updatedAt: number;
}

const user: Schema = new Schema({
  username: {type: String, trim: true},
  email: {type: String, unique: true, required: true},
  password: {type: String},
  role: {type: String},
  social: {
    facebookProvider: {
      id: String,
      token: String,
    },
    googleProvider: {
      id: String,
      token: String,
    },
  },
  createdAt: {type: Number},
  updatedAt: {type: Number},
});

user.set("toObject", {getters: true, virtuals: true});

export default mongoose.model<IUser>("User", user);
