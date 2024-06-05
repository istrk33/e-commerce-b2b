import { Repository } from "typeorm";
import { CreateOrderDto } from "../dto/create-order.dto";
import { Order } from "../entity/order.entity";
import { InjectRepository } from "@nestjs/typeorm";

export class GetAllOrdersService {
    constructor(
        @InjectRepository(Order)
        private readonly orderRepository: Repository<Order>
    ) { }

    async getAllOrders() {
        return await this.orderRepository.find({ relations: ["items"] });
    }
}