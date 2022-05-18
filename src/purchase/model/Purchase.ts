import { Document } from 'mongoose';

export interface Purchase {
  id: string;
  productId: string;
  purchaseDate: any;
  received: string;
  supplierId: string;
  supplierName: string;
}

export interface PurchaseDocument extends Document {
  id: string;
  productId: string;
  purchaseDate: any;
  received: string;
  supplierId: string;
  supplierName: string;
}
