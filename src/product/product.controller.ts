import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  Res,
} from '@nestjs/common';
import { Product } from './model';
import { Request, Response } from 'express';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Post('/create')
  async addProduct(
    @Body() product: Partial<Product>,
    @Res() response: Response,
  ) {
    const result = await this.productService.createProduct(product);

    return response.status(result.statusCode).json(result.message);
  }
  @Put('/update/:id')
  async updateProduct(
    @Param() params,
    @Body() product: Partial<Product>,
    @Res() response: Response,
  ) {
    const result = await this.productService.updateProduct(params.id, product);

    return response.status(result.statusCode).json(result.message);
  }

  @Get('/lists')
  async getProducts(@Req() request: Request, @Res() response: Response) {
    const { limit, offset, productName } = request.query;

    const result = await this.productService.getProducts({
      limit,
      offset,
      productName,
    });
    return response.status(200).json(result);
  }

  @Delete('/delete/:id')
  async deleteProduct(@Param() params, @Res() response: Response) {
    const result = await this.productService.deleteOneProduct(params.id);

    return response.status(result.statusCode).json(result.message);
  }
}
