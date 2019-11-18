export enum ErrorCode {
  registeredWithSocial = "REGISTERED_WITH_SOCIAL_ERROR",
}

export interface User {
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

export interface Product {
  id: string;
  name: string;
  belongsToBrand: number;
  description: string;
  price: number;
  color: string;
  size: string;
  quantity: number;
  image: string;
  merchant: Merchant;
}

export interface Merchant {
  id: string;
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
