import * as mongoose from 'mongoose';

export const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    part: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      required: true,
    },
    start: {
      type: Number,
      required: true,
    },
    received: {
      type: Number,
      required: true,
    },
    onHand: {
      type: Number,
      required: true,
    },
    minimum: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true },
);
