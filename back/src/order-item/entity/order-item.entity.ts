import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { CreateOrderItemDto } from "../dto/create-order-item.dto";
import { Order } from "src/order/entity/order.entity";
import { Product } from "src/product/entity/product.entity";

@Entity()
export class OrderItem {

    constructor(createOrderItemData?: CreateOrderItemDto) {
        if (createOrderItemData) {
            this.productId = createOrderItemData.productId;
            this.quantity = createOrderItemData.quantity;
        }
    }

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    quantity: number;

    @Column()
    productId: number;

    @ManyToOne(() => Order, (order) => order.items)
    order: Order;

    @ManyToOne(() => Product, (product) => product.id)
    @JoinColumn({ name: "productId" })
    product: Product;

    public incrementQuantity() {
        this.quantity += 1;
    }
}