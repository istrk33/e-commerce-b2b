import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';

@Controller('order_item')
export class OrderItemController {
  constructor(
    // private readonly createOrderService: CreateOrderService,
    // private readonly getAllOrdersService: GetAllOrdersService,
    // private readonly payOrderService: PayOrderService,
    // private readonly cancelOrderService: CancelOrderService,
    // private readonly updateInvoiceAddressOrderService: UpdateInvoiceAddressOrderService,
    // private readonly updateShippingAddressOrderService: UpdateShippingAddressOrderService,
  ) { }

  // @Get()
  // getAllOrders() {
  //   return this.getAllOrdersService.getAllOrders();
  // }

  // @Post()
  // createOrder(@Body() data: CreateOrderDto) {
  //   return this.createOrderService.createOrder(data);
  // }

  // @Put('/:id/pay')
  // payOrder(@Param('id', ParseIntPipe) id: number,) {
  //   return this.payOrderService.payOrder(id);
  // }

  // @Put('/:id/cancel')
  // cancelOrder(@Param('id', ParseIntPipe) id: number,) {
  //   return this.cancelOrderService.cancelOrder(id);
  // }

  // @Put('/:id/update-shipping-address')
  // updateOrderShipppingAddress(@Param('id', ParseIntPipe) id: number, @Body() data: UpdateOrderShippingAddressDto) {
  //   console.log(data)
  //   return this.updateShippingAddressOrderService.updateOrderShippingAddress(data, id);
  // }

  // @Put('/:id/update-invoice-address')
  // updateOrderInvoiceAddress(@Param('id', ParseIntPipe) id: number, @Body() data: UpdateOrderInvoiceAddressDto) {
  //   return this.updateInvoiceAddressOrderService.updateOrderInvoiceAddress(data, id);
  // }
}
