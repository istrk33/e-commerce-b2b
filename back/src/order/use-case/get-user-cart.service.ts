import { Repository } from "typeorm";
import { CreateOrderDto } from "../dto/create-order.dto";
import { Order } from "../entity/order.entity";
import { InjectRepository } from "@nestjs/typeorm";

export class GetUserCartService {
    constructor(
        @InjectRepository(Order)
        private readonly orderRepository: Repository<Order>
    ) { }

    async getUserCartService(username: string): Promise<Order | undefined> {
        return this.orderRepository.createQueryBuilder('order')
        .leftJoinAndSelect('order.items', 'items')
        .leftJoinAndSelect('items.product', 'product')
        .where('order.customer = :username', { username })
        .andWhere('order.status = :status', { status: Order.CartStatus.CART })
        .getOne();
    }
}