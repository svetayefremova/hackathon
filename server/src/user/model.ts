import {Document, model, Schema} from "mongoose";
import uuidv4 from "uuid/v4";

export interface IUser extends Document {
  id: string;
  name: string;
  email: string;
  password: string;
  social: {
    facebookProvider: {
      id: string;
      token: string;
    };
  };
  createdAt: Date;
  lastModifiedAt: Date;
}

const schema: Schema = new Schema({
  id: {type: String, required: true, default: uuidv4},
  name: String,
  email: {type: String, unique: true, required: true},
  password: String,
  social: {
    facebookProvider: {
      id: String,
      token: String,
    },
  },
  createdAt: {type: Date, required: true, default: Date.now},
  lastModifiedAt: {type: Date, required: true, default: Date.now},
});

schema.set("toObject", {getters: true, virtuals: true});

export default model<IUser>("User", schema);
