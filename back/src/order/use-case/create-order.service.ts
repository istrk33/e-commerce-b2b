import { Repository } from "typeorm";
import { CreateOrderDto } from "../dto/create-order.dto";
import { Order } from "../entity/order.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { OrderItem } from "src/order-item/entity/order-item.entity";

export class CreateOrderService {
    constructor(
        @InjectRepository(Order)
        private readonly orderRepository: Repository<Order>,
        // private readonly orderItemRepository: Repository<OrderItem>
    ) { }

    async createOrder(createOrderData: CreateOrderDto): Promise<Order> {
        const order = new Order(createOrderData);
        return this.orderRepository.save(order);
    }
}