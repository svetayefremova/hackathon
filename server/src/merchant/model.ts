import {Document, model, Schema} from "mongoose";
import uuidv4 from "uuid/v4";

export interface IMerchant extends Document {
  id: string;
  name: string;
  logo: string;
  brands: [string];
  commissionFee: string;
  companyDescription: string;
  contactEmail: string;
  phone: string;
  address: string;
  dateCreated: Date;
  publishedState: boolean;
  publishedDate: Date;
  publishedBy: {
    userId: string;
  };
}

const schema: Schema = new Schema({
  id: {type: String, required: true, default: uuidv4},
  name: {type: String, required: true, trim: true},
  logo: String,
  brands: [String],
  commissionFee: String,
  companyDescription: String,
  contactEmail: String,
  phone: String,
  address: String,
  dateCreated: {type: Date, required: true, default: Date.now},
  publishedState: Boolean,
  publishedDate: Date,
  publishedBy: {
    userId: String,
  },
});

schema.set("toObject", {getters: true, virtuals: true});

export default model<IMerchant>("Merchant", schema);
