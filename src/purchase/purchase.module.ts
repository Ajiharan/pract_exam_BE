import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { PurchaseController } from './purchase.controller';
import { PurchaseService } from './purchase.service';
import { PurchaseSchema } from './model';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'PurchaseSchema', schema: PurchaseSchema },
    ]),
  ],

  controllers: [PurchaseController],
  providers: [PurchaseService],
})
export class PurchaseModule {}
