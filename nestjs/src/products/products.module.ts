import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Customer } from './entities/customer.entity';
import { Order } from './entities/order.entity';
import { OrderDetail } from './entities/order_detail.entity';

@Module({
  controllers: [ProductsController],
  providers: [ProductsService],
  imports: [TypeOrmModule.forFeature([
    Product,
    Customer,
    Order,
    OrderDetail
  ])],
})
export class ProductsModule {}
