import { Document } from 'mongoose';
export interface Supplier {
  id: string;
  name: string;
}

export interface SupplierDocument extends Document {
  id: string;
  name: string;
}
