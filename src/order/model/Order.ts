import { Document } from 'mongoose';

export interface Order {
  id: string;
  orderDate: string;
  productId: number;
  productName: string;
  shipped: number;
  firstName: string;
  lastName: String;
}

export interface OrderDocument extends Document {
  id: string;
  orderDate: string;
  productId: number;
  productName: string;
  shipped: number;
  firstName: string;
  lastName: String;
}
