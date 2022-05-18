import { Module } from '@nestjs/common';
import { SupplierService } from './supplier.service';
import { SupplierController } from './supplier.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { SupplierSchema } from './model';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'SupplierSchema', schema: SupplierSchema },
    ]),
  ],
  providers: [SupplierService],
  controllers: [SupplierController],
})
export class SupplierModule {}
