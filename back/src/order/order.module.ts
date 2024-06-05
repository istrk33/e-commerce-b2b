import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entity/order.entity';
import { OrderController } from './controller/order.controller';
import { CreateOrderService } from './use-case/create-order.service';
import { GetAllOrdersService } from './use-case/get-all-orders.service';
import { PayOrderService } from './use-case/pay-order.service';
import { CancelOrderService } from './use-case/cancel-order.service';
import { UpdateInvoiceAddressOrderService } from './use-case/update-order-invoice-address.service';
import { UpdateShippingAddressOrderService } from './use-case/update-order-shipping-address.service';

@Module({
    imports: [TypeOrmModule.forFeature([Order])],
    controllers: [OrderController],
    providers: [
        CreateOrderService,
        GetAllOrdersService,
        PayOrderService,
        CancelOrderService,
        UpdateInvoiceAddressOrderService,
        UpdateShippingAddressOrderService
    ],
})
export class OrderModule { }
