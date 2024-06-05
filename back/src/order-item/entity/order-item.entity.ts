import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { CreateOrderItemDto } from "../dto/create-order-item.dto";
import { Order } from "src/order/entity/order.entity";

@Entity()
export class OrderItem {

    constructor(createOrderItemData?: CreateOrderItemDto) {
        if (createOrderItemData) {
            this.product = createOrderItemData.product;
            this.price = 10.0;
            // this.price = createOrderItemData.price;
            // this.quantity = createOrderItemData.quantity;
            this.quantity = 1;
        }
    }

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    product: string;

    @Column()
    price: number;

    @Column()
    quantity: number;

    @ManyToOne(() => Order, (order) => order.items)
    order: Order;

    public incrementQuantity() {
        this.quantity += 1;
    }
}