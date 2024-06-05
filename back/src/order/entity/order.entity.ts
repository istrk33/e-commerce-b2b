import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { CreateOrderDto } from "../dto/create-order.dto";
import { UpdateOrderInvoiceAddressDto } from "../dto/update-order-invoice-address.dto";
import { UpdateOrderShippingAddressDto } from "../dto/update-order-shipping-address.dto";
import { OrderItem } from "src/order-item/entity/order-item.entity";

@Entity()
export class Order {

    static CartStatus = {
        CART: 'Cart',
        CANCELLED: 'Cancelled',
        PAID: 'Paid',
        DELIVERED: 'Delivered',
    }

    constructor(createOrderData?: CreateOrderDto) {
        if (createOrderData) {
            if (createOrderData.items.length > 3) {
                throw new Error("trop d'items");
            }

            this.createOrderItems(createOrderData);
            this.createdAt = new Date();
            this.updatedAt = new Date();
            this.customer = 'tetetete';
            this.paidAt = null;
            this.status = Order.CartStatus.CART;
            this.total = 10 * createOrderData.items.length;
        }
    }


    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    createdAt: Date;

    @Column()
    updatedAt: Date;

    @Column()
    customer: string;

    @Column({ nullable: true })
    paidAt: Date;

    // @Column({ type: 'json' })
    // items: string[];

    @Column()
    status: string;

    @Column({ nullable: true })
    shippingAddress: string;

    @Column({ nullable: true })
    shippingMethod: string;

    @Column({ nullable: true })
    invoiceAddress: string;

    @Column({ nullable: true })
    invoiceAddressSetAt: Date;

    @Column({ nullable: true })
    shippingMethodSetAt: Date;

    @Column()
    total: number;

    // @OneToMany(() => OrderItem, (orderItem) => orderItem.order,{ cascade: ['insert', 'update'] })
    @OneToMany(() => OrderItem, (orderItem) => orderItem.order, { cascade: true, })
    items: OrderItem[];


    cancel(): void {
        this.status = Order.CartStatus.CANCELLED;
        this.updatedAt = new Date();
    }

    pay(): void {
        this.status = Order.CartStatus.PAID;
        this.updatedAt = new Date();
        this.paidAt = new Date();
    }

    updateInvoiceAddress(updateInvoiceAddressDto: UpdateOrderInvoiceAddressDto): void {
        if (this.status !== Order.CartStatus.PAID) {
            this.updatedAt = new Date();
            this.invoiceAddressSetAt = new Date();
            this.invoiceAddress = updateInvoiceAddressDto.invoice_address;
        } else {
            throw new Error("Cette commande ne peut pas être modifiée !");
        }
    }

    updateShippingAddress(updateShippingAddressDto: UpdateOrderShippingAddressDto): void {
        if (this.status !== Order.CartStatus.PAID) {
            this.updatedAt = new Date();
            this.shippingAddress = updateShippingAddressDto.shipping_address;
            this.shippingMethod = updateShippingAddressDto.shipping_method;
            this.shippingMethodSetAt = new Date();
            if (this.invoiceAddress == null) {
                this.invoiceAddress = updateShippingAddressDto.shipping_address;
                this.invoiceAddressSetAt = new Date();
            }
        } else {
            throw new Error("Cette commande ne peut pas être modifiée !");
        }
    }

    private createOrderItems(createOrderData: CreateOrderDto) {
        this.items = [];


        createOrderData.items.map(product => {
            const existingOrderItem = this.getOrderItemWithProduct(product.product);
            if (existingOrderItem) {
                existingOrderItem.quantity += 1;
            } else {
                const newOrderItem = (new OrderItem(product));
                this.items.push(newOrderItem)
            }
        });
    }

    private getOrderItemWithProduct(product: string): OrderItem {
        return this.items.find((item) => {
            return item.product === product;
        });
    }
}