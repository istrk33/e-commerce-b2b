import { Repository } from "typeorm";
import { CreateOrderDto } from "../dto/create-order.dto";
import { Order } from "../entity/order.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { UpdateOrderShippingAddressDto } from "../dto/update-order-shipping-address.dto";

export class UpdateShippingAddressOrderService {
    constructor(
        @InjectRepository(Order)
        private readonly orderRepository: Repository<Order>
    ) { }

    async updateOrderShippingAddress(updateOrderShippingAddressDto: UpdateOrderShippingAddressDto, id: number): Promise<Order> {
        const order = await this.orderRepository.findOneBy({ id });

        if (!order) {
            throw new Error(`Order with id ${id} not found`);
        }

        order.updateShippingAddress(updateOrderShippingAddressDto);

        return await this.orderRepository.save(order);
    }
}