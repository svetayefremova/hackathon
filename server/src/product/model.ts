import {Document, model, Schema} from "mongoose";
import uuidv4 from "uuid/v4";

import {IMerchant} from "../merchant/model";

export interface IProduct extends Document {
  id: string;
  name: number;
  belongsToBrand: number;
  description: string;
  price: number;
  color: string;
  size: string;
  quantity: number;
  image: string;
  merchant: IMerchant;
}

const schema: Schema = new Schema({
  id: {type: String, required: true, default: uuidv4},
  name: {type: String, required: true, trim: true},
  belongsToBrand: {type: Number, required: true},
  description: String,
  price: {type: Number, required: true},
  color: String,
  size: {
    type: String,
    required: true,
    enum: ["XS", "S", "M", "L", "XL"],
  },
  quantity: {type: Number, required: true},
  image: String,
  merchant: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "Merchant",
  },
});

schema.set("toObject", {getters: true, virtuals: true});

export default model<IProduct>("Product", schema);
