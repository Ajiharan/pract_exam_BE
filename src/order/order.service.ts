import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order, OrderDocument } from './model';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel('OrderSchema') private orderModel: Model<OrderDocument>,
  ) {}

  async getOrders(pagination: any): Promise<any> {
    try {
      const { productName } = pagination;
      if (productName) {
        return Promise.all([
          this.orderModel
            .find({
              name: { $regex: '.*' + productName + '.*', $options: 'i' },
            })
            .count(),
          this.orderModel
            .find({
              userName: { $regex: '.*' + productName + '.*', $options: 'i' },
            })
            .skip(pagination.offset)
            .limit(pagination.limit),
        ]);
      }
      return Promise.all([
        this.orderModel.find().count(),
        this.orderModel.find().skip(pagination.offset).limit(pagination.limit),
      ]);
    } catch (err) {
      err.stack;
      return { statusCode: 500, message: err?.errors?.start?.message };
    }
  }

  async createOrder(order: Partial<Order>) {
    try {
      const saveOrder = await new this.orderModel(order).save();
      if (saveOrder) {
        return { statusCode: 200, message: 'sucessfully added', error: false };
      }
    } catch (err) {
      err.stack;
      return {
        statusCode: 500,
        message: err?.errors?.start?.message,
        error: true,
      };
    }
  }
}
