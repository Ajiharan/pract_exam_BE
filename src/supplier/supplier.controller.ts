import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { Supplier } from './model';
import { SupplierService } from './supplier.service';

@Controller('supplier')
export class SupplierController {
  constructor(private supplierService: SupplierService) {}

  @Post('/create')
  async createSupplier(
    @Body() supplier: Partial<Supplier>,
    @Res() response: Response,
  ) {
    const result = await this.supplierService.createSupplier(supplier);
    return response.status(result.statusCode).json(result.message);
  }

  @Get('/lists')
  async getSupplier(@Res() response: Response) {
    const result = await this.supplierService.getSuppliers();
    return response.status(result.statusCode).json(result.data);
  }
}
