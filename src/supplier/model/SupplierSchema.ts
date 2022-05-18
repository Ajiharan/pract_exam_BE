import * as mongoose from 'mongoose';

export const SupplierSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});
