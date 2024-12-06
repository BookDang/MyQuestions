import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  Index,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm'
import { Customer } from './customer.entity'
import { OrderDetail } from './order_detail.entity';
import { Exclude } from 'class-transformer';

@Entity('Orders')
@Index(["customer_id", "order_date"])
export class Order {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  customer_id: number

  @Column()
  not_index_customer_id: number

  @ManyToOne(() => Customer, (customer) => customer.orders, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'customer_id' })
  customer: Customer;

  @Column()
  order_date: Date

  @Column()
  status: string

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date

  @DeleteDateColumn()
  deleted_at: Date | null

  @OneToMany(() => OrderDetail, (orderDetail) => orderDetail.order)
  @Exclude()
  orderDetails: OrderDetail[];

// -- Bảng Orders: Quản lý đơn hàng
// CREATE TABLE Orders (
//     id INT AUTO_INCREMENT PRIMARY KEY, -- Primary Key Index
//     customer_id INT NOT NULL,
//     not_index_customer_id INT UNSIGNED,
//     order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
//     status ENUM('Pending', 'Completed', 'Cancelled') NOT NULL,
//     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
//     updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
//     deleted_at TIMESTAMP NULL DEFAULT NULL,
//     INDEX (customer_id, order_date), -- Composite Index
//     CONSTRAINT fk_customer FOREIGN KEY (customer_id) REFERENCES Customers (id) ON DELETE CASCADE
// );
}