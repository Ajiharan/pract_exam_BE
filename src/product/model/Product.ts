import { Document } from 'mongoose';
export interface Product {
  id: string;
  name: string;
  part: number;
  label: string;
  start: number;
  received: number; 
  onHand: number;
  minimum: number;
}

export interface ProductDocument extends Document {
  id: string;
  name: string;
  part: number;
  label: string;
  start: number;
  received: number;
  onHand: number;
  minimum: number;
}
