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
 
        // user récupéré
        // ça récupère en bdd un order lié à cet user et qui est encore en statut cart
        // s'il existe, ça le modifie
        // s'il existe pas, ça le créé (new Order)
        // récupérer le produit lié à l'id envoyé en bdd
        
        const order = new Order(createOrderData);
        return this.orderRepository.save(order);
    }
}