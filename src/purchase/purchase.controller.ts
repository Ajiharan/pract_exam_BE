import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { Purchase } from './model';
import { PurchaseService } from './purchase.service';

@Controller('purchase')
export class PurchaseController {
  constructor(private purchaseService: PurchaseService) {}

  @Post('/create')
  async purchaseProduct(
    @Body() purchase: Partial<Purchase>,
    @Res() response: Response,
  ) {
    const result = await this.purchaseService.createPurchase(purchase);
    return response.status(result.statusCode).json(result.message);
  }

  @Get('/lists')
  async getProducts(@Req() request: Request, @Res() response: Response) {
    const { limit, offset, productName } = request.query;

    const result = await this.purchaseService.getPurchases({
      limit,
      offset,
      productName,
    });
    return response.status(200).json(result);
  }
}
