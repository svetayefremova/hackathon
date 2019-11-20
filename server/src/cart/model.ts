import {Document, model, Schema} from "mongoose";
import uuidv4 from "uuid/v4";

import {IUser} from "../user/model";
import CartItemSchema, {ICartItem} from "./item/model";

export enum CartState {
  active = "active",
  anonymous = "anonymous",
  ordered = "ordered",
}

export interface ICart extends Document {
  id: string;
  state: string;
  user: IUser;
  deviceId: string; // TODO make [string], user could have more then one device
  items: [ICartItem];
  createdAt: Date;
  lastModifiedAt: Date;
}

const schema: Schema = new Schema({
  id: {type: String, required: true, default: uuidv4},
  state: {
    type: String,
    required: true,
    enum: ["active", "anonymous", "ordered"],
    default: "anonymous",
  },
  deviceId: String,
  user: {type: Schema.Types.ObjectId, ref: "User"},
  items: [CartItemSchema],
  createdAt: {type: Date, required: true, default: Date.now},
  lastModifiedAt: {type: Date, required: true, default: Date.now},
});

schema.set("toObject", {getters: true, virtuals: true});

export default model<ICart>("Cart", schema);
