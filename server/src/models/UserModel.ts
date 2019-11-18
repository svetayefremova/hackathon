import mongoose, {Document, Schema} from "mongoose";

export interface IUser extends Document {
  id: string;
  username: string;
  email: string;
  password: string;
  social: {
    facebookProvider: {
      id: string;
      token: string;
    };
  };
  createdAt: number;
  updatedAt: number;
}

const user: Schema = new Schema({
  username: String,
  email: {type: String, unique: true, required: true},
  password: String,
  social: {
    facebookProvider: {
      id: String,
      token: String,
    },
  },
  createdAt: Number,
  updatedAt: Number,
});

user.set("toObject", {getters: true, virtuals: true});

export default mongoose.model<IUser>("User", user);
