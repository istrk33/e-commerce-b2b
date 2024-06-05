import { Repository } from "typeorm";
import { CreateOrderDto } from "../dto/create-order.dto";
import { Order } from "../entity/order.entity";
import { InjectRepository } from "@nestjs/typeorm";

export class CancelOrderService {
    constructor(
        @InjectRepository(Order)
        private readonly orderRepository: Repository<Order>
    ) { }

    async cancelOrder(id: number): Promise<Order> {
        const order = await this.orderRepository.findOneBy({ id });

        if (!order) {
            throw new Error(`Order with id ${id} not found`);
        }

        order.cancel();

        return await this.orderRepository.save(order);
    }
}