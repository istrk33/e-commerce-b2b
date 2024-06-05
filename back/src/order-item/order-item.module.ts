import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderItem } from './entity/order-item.entity';
import {  OrderItemController } from './controller/order-item.controller';

@Module({
    imports: [TypeOrmModule.forFeature([OrderItem])],
    controllers: [OrderItemController],
    providers: [
    ],
})
export class OrderItemModule { }
