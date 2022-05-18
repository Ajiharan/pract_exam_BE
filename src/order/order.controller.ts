import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { Order } from './model';
import { OrderService } from './order.service';

@Controller('order')
export class OrderController {
  constructor(private orderService: OrderService) {}
  @Post('/create')
  async addOrder(@Body() product: Partial<Order>, @Res() response: Response) {
    const result = await this.orderService.createOrder(product);

    return response.status(result.statusCode).json(result.message);
  }
  @Get('/lists')
  async getProducts(@Req() request: Request, @Res() response: Response) {
    const { limit, offset, productName } = request.query;

    const result = await this.orderService.getOrders({
      limit,
      offset,
      productName,
    });
    return response.status(200).json(result);
  }
}
