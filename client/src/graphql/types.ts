export enum ErrorCode {
  registeredWithSocial = "REGISTERED_WITH_SOCIAL_ERROR",
}

export interface SocialProvider {
  id: string;
  token: string;
}

export interface Social {
  facebookProvider: SocialProvider;
}

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  social: Social;
  createdAt: Date;
  lastModifiedAt: Date;
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
  dateCreated: Date;
  publishedState: boolean;
  publishedDate: Date;
  publishsedBy: User;
  products: [Product];
}

export interface CartItem {
  id: string;
  product: Product;
  quantity: number;
  addedAt: Date;
}

export interface Cart {
  id: string;
  state: string;
  user: User;
  deviceId: string;
  items: [CartItem];
  createdAt: Date;
  lastModifiedAt: Date;
}

export interface AddProductToCartInput {
  productId: string;
  quantity: number;
}

export interface RemoveItemFromCartInput {
  itemId: string;
}
