import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { CreateOrderDto } from '../dto/create-order.dto';
import { CreateOrderService } from '../use-case/create-order.service';
import { GetAllOrdersService } from '../use-case/get-all-orders.service';
import { PayOrderService } from '../use-case/pay-order.service';
import { CancelOrderService } from '../use-case/cancel-order.service';
import { UpdateInvoiceAddressOrderService } from '../use-case/update-order-invoice-address.service';
import { UpdateShippingAddressOrderService } from '../use-case/update-order-shipping-address.service';
import { UpdateOrderShippingAddressDto } from '../dto/update-order-shipping-address.dto';
import { UpdateOrderInvoiceAddressDto } from '../dto/update-order-invoice-address.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { GetUserCartService } from '../use-case/get-user-cart.service';
import { AddOrderItemToOrderDto } from '../dto/add-order-item-to-order.dto';
import { AddOrderItemToOrderService } from '../use-case/add-order-item-to-order.service';

@UseGuards(AuthGuard)
@Controller('orders')
export class OrderController {
  constructor(
    private readonly createOrderService: CreateOrderService,
    private readonly getAllOrdersService: GetAllOrdersService,
    private readonly payOrderService: PayOrderService,
    private readonly cancelOrderService: CancelOrderService,
    private readonly updateInvoiceAddressOrderService: UpdateInvoiceAddressOrderService,
    private readonly updateShippingAddressOrderService: UpdateShippingAddressOrderService,
    private readonly getUserCartService: GetUserCartService,
    private readonly addOrderItemsToOrderService: AddOrderItemToOrderService,
  ) { }

  @Get()
  getAllOrders() {
    return this.getAllOrdersService.getAllOrders();
  }

  @Post()
  createOrder(@Body() data: CreateOrderDto) {
    return this.createOrderService.createOrder(data);
  }

  @Put('/:id/pay')
  payOrder(@Param('id', ParseIntPipe) id: number,) {
    return this.payOrderService.payOrder(id);
  }

  @Put('/:id/cancel')
  cancelOrder(@Param('id', ParseIntPipe) id: number,) {
    return this.cancelOrderService.cancelOrder(id);
  }

  @Put('/:id/update-shipping-address')
  updateOrderShipppingAddress(@Param('id', ParseIntPipe) id: number, @Body() data: UpdateOrderShippingAddressDto) {
    console.log(data)
    return this.updateShippingAddressOrderService.updateOrderShippingAddress(data, id);
  }

  @Put('/:id/update-invoice-address')
  updateOrderInvoiceAddress(@Param('id', ParseIntPipe) id: number, @Body() data: UpdateOrderInvoiceAddressDto) {
    return this.updateInvoiceAddressOrderService.updateOrderInvoiceAddress(data, id);
  }

  @Get('cart/:username')
  getUserCart(@Param('username') username: string) {
    return this.getUserCartService.getUserCartService(username);
  }

  @Put('/:username/add-order-item')
  addOrderItemToItems(@Param('username') username: string, @Body() data: AddOrderItemToOrderDto) {
    return this.addOrderItemsToOrderService.addOrderItemToOrder(data,username);
  }
}
