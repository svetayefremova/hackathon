import mongoose, {Document, Schema} from "mongoose";

import {IMerchant} from "./MerchantModel";

export interface IProduct extends Document {
  name: string;
  belongsToBrand: number;
  description: string;
  price: number;
  color: string;
  size: string;
  quantity: number;
  image: string;
  merchant: IMerchant;
}

const product: Schema = new Schema({
  name: String,
  belongsToBrand: Number,
  description: String,
  price: Number,
  color: String,
  size: String,
  quantity: Number,
  image: String,
  merchant: {type: Schema.Types.ObjectId, ref: "Merchant"},
});

product.set("toObject", {getters: true, virtuals: true});

export default mongoose.model<IProduct>("Product", product);
