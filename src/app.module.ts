import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './product/product.module';
import { SupplierModule } from './supplier/supplier.module';
import { PurchaseModule } from './purchase/purchase.module';
import { OrderModule } from './order/order.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/inventory_management'),
    ProductModule,
    SupplierModule,
    PurchaseModule,
    OrderModule,
  ],
  controllers: [AppController],
  providers: [AppService],
  exports: [PurchaseModule],
})
export class AppModule {}
