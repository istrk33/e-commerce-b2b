import { Repository } from "typeorm";
import { Order } from "../entity/order.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { UpdateOrderInvoiceAddressDto } from "../dto/update-order-invoice-address.dto";

export class UpdateInvoiceAddressOrderService {
    constructor(
        @InjectRepository(Order)
        private readonly orderRepository: Repository<Order>
    ) { }

    async updateOrderInvoiceAddress(updateInvoiceAddressDto: UpdateOrderInvoiceAddressDto, id: number): Promise<Order> {
        const order = await this.orderRepository.findOneBy({ id });

        if (!order) {
            throw new Error(`Order with id ${id} not found`);
        }

        order.updateInvoiceAddress(updateInvoiceAddressDto);
        
        return await this.orderRepository.save(order);
    }
}