import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductSchema } from './model/ProductSchema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'ProductSchema', schema: ProductSchema },
    ]),
  ],
  providers: [ProductService],
  controllers: [ProductController],
  exports: [ProductModule],
})
export class ProductModule {}
