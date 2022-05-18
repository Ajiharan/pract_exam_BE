import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Purchase, PurchaseDocument } from './model';

@Injectable()
export class PurchaseService {
  constructor(
    @InjectModel('PurchaseSchema')
    private purchaseModel: Model<PurchaseDocument>,
  ) {}

  async getPurchases(pagination: any): Promise<any> {
    try {
      const { productName } = pagination;

      if (productName) {
        return Promise.all([
          this.purchaseModel
            .find({
              productName: { $regex: '.*' + productName + '.*', $options: 'i' },
            })
            .count(),
          this.purchaseModel
            .find({
              productName: { $regex: '.*' + productName + '.*', $options: 'i' },
            })
            .skip(pagination.offset)
            .limit(pagination.limit),
        ]);
      }
      return Promise.all([
        this.purchaseModel.find().count(),
        this.purchaseModel
          .find()
          .skip(pagination.offset)
          .limit(pagination.limit),
      ]);
    } catch (err) {
      err.stack;
      return { statusCode: 500, message: err?.errors?.start?.message };
    }
  }

  async createPurchase(purchase: Partial<Purchase>): Promise<any> {
    try {
      const savePurchase = await new this.purchaseModel(purchase).save();
      if (savePurchase) {
        return {
          statusCode: 200,
          message: 'Created successfully',
          error: false,
        };
      }
      return {
        statusCode: 400,
        message: 'cannot create',
        error: true,
      };
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
