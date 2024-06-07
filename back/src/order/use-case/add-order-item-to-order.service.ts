import { Repository } from "typeorm";
import { Order } from "../entity/order.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { AddOrderItemToOrderDto } from "../dto/add-order-item-to-order.dto";

export class AddOrderItemToOrderService {
    constructor(
        @InjectRepository(Order)
        private readonly orderRepository: Repository<Order>,
    ) { }

    async addOrderItemToOrder(addOrderItemData: AddOrderItemToOrderDto, username: string): Promise<Order> {
        const order = await this.orderRepository.createQueryBuilder('order')
            .leftJoinAndSelect('order.items', 'items')
            .leftJoinAndSelect('items.product', 'product')
            .where('order.customer = :username', { username })
            .andWhere('order.status = :status', { status: Order.CartStatus.CART })
            .getOne();
        order.addOrderItemToItems(addOrderItemData);

        return this.orderRepository.save(order);
    }
}