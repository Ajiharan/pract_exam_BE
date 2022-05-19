import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product, ProductDocument } from './model';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel('ProductSchema') private productModel: Model<ProductDocument>,
  ) {}

  async getProducts(pagination: any): Promise<any> {
    try {
      const { productName } = pagination;
      if (productName) {
        return Promise.all([
          this.productModel
            .find({
              name: { $regex: '.*' + productName + '.*', $options: 'i' },
            })
            .count(),
          this.productModel
            .find({
              name: { $regex: '.*' + productName + '.*', $options: 'i' },
            })
            .skip(pagination.offset)
            .limit(pagination.limit),
        ]);
      }
      return Promise.all([
        this.productModel.find().count(),
        this.productModel
          .find()
          .skip(pagination.offset)
          .limit(pagination.limit),
      ]);
    } catch (err) {
      err.stack;
      return { statusCode: 500, message: err?.errors?.start?.message };
    }
  }
  async deleteOneProduct(id: string): Promise<any> {
    try {
      const deleted = await this.productModel.findByIdAndDelete(id);
      console.log(deleted);
      return {
        statusCode: 200,
        message: 'sucessfully deleted',
        error: false,
      };
    } catch (err) {
      err.stack;
      return { statusCode: 500, message: err?.errors?.start?.message };
    }
  }
  async updateProduct(id: string, product: Partial<Product>): Promise<any> {
    try {
      const isUpdated = await this.productModel.updateOne(
        { _id: id },
        {
          $set: product,
        },
      );

      if (isUpdated.modifiedCount > 0) {
        return {
          statusCode: 200,
          message: 'sucessfully updated',
          error: false,
        };
      }
      return {
        statusCode: 400,
        message: 'cannot update',
        error: true,
      };
    } catch (err) {
      err.stack;
      return { statusCode: 500, message: err?.errors?.start?.message };
    }
  }
  async createProduct(product: Partial<Product>): Promise<any> {
    try {
      const isExists = await this.productModel.findOne({ name: product.name });
      if (isExists)
        return {
          statusCode: 400,
          message: 'productName already exists',
          error: false,
        };
      const saveProduct = await new this.productModel(product).save();
      if (saveProduct) {
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
