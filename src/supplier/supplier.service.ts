import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Supplier, SupplierDocument } from './model';

@Injectable()
export class SupplierService {
  constructor(
    @InjectModel('SupplierSchema')
    private supplierModel: Model<SupplierDocument>,
  ) {}

  async getSuppliers(): Promise<any> {
    try {
      const suppliers = await this.supplierModel.find();
      return {
        statusCode: 500,
        data: suppliers,
        error: false,
      };
    } catch (err) {
      return {
        statusCode: 500,
        message: err?.errors?.start?.message,
        error: true,
      };
    }
  }
  async createSupplier(supplier: Partial<Supplier>): Promise<any> {
    try {
      const saveSupplier = await new this.supplierModel(supplier).save();
      if (saveSupplier) {
        return {
          statusCode: 200,
          message: 'sucessfully added',
          error: false,
        };
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
