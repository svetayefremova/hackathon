import mongoose, {Document, Schema} from "mongoose";

export interface IMerchant extends Document {
  name: string;
  logo: string;
  brands: [string];
  commissionFee: string;
  companyDescription: string;
  contactEmail: string;
  phone: string;
  address: string;
  dateCreated: string;
  publishedState: boolean;
  publishedDate: string;
  publishedBy: {
    userId: string;
  };
}

const merchant: Schema = new Schema({
  name: String,
  logo: String,
  brands: [String],
  commissionFee: String,
  companyDescription: String,
  contactEmail: String,
  phone: String,
  address: String,
  dateCreated: String,
  publishedState: Boolean,
  publishedDate: String,
  publishedBy: {
    userId: String,
  },
});

merchant.set("toObject", {getters: true, virtuals: true});

export default mongoose.model<IMerchant>("Merchant", merchant);
