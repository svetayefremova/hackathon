import mongoose, {Document, Schema} from "mongoose";

export interface IMerchant extends Document {
  index: string;
  guid: string;
  logo: string;
  dateCreated: string;
  publishedState: string;
  brands: [string];
  name: string;
  commissionFee: string;
  contactEmail: string;
  phone: string;
  address: string;
  publishedDate: string;
  publishedBy: {
    userId: string;
  };
  companyDescription: string;
}

const merchant = new Schema({
  index: Number,
  guid: String,
  logo: String,
  dateCreated: String,
  publishedState: Boolean,
  brands: [String],
  name: String,
  commissionFee: String,
  contactEmail: String,
  phone: String,
  address: String,
  publishedDate: String,
  publishedBy: {
    userId: String,
  },
  companyDescription: String,
});

export default mongoose.model<IMerchant>("Merchant", merchant);
