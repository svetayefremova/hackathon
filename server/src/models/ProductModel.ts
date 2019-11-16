import mongoose, {Document, Schema} from "mongoose";

import {IMerchant} from "./MerchantModel";

export interface IProduct extends Document {
  belongsToBrand: number;
  id: string;
  name: number;
  price: number;
  description: string;
  color: string;
  size: string;
  quantity: number;
  image: string;
  merchant: IMerchant;
}

const product: Schema = new Schema({
  belongsToBrand: Number,
  name: String,
  price: Number,
  description: String,
  color: String,
  size: String,
  quantity: Number,
  image: String,
  merchant: {type: Schema.Types.ObjectId, ref: "Merchant"},
});

product.set("toObject", {getters: true, virtuals: true});

export default mongoose.model<IProduct>("Product", product);
