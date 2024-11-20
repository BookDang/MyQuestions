import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  Index,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm'
import { Order } from './order.entity'
import { Product } from './product.entity'

@Entity('OrderDetails')
@Index(["order_id", "product_id"])
export class OrderDetail {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  quantity: number

  @Column('decimal', { precision: 12, scale: 2 })
  price: number

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date

  @DeleteDateColumn()
  deleted_at: Date | null

  @Column()
  order_id: number

  @ManyToOne(() => Order, (order) => order.orderDetails, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'order_id' })
  order: Order;

  @Column()
  @Index()
  product_id: number

  @ManyToOne(() => Product, (product) => product.orderDetails, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'product_id' })
  product: Product;

// -- Bảng OrderDetails: Chi tiết sản phẩm trong đơn hàng
// CREATE TABLE OrderDetails (
//     id INT AUTO_INCREMENT PRIMARY KEY, -- Primary Key Index
//     order_id INT NOT NULL,
//     product_id INT NOT NULL,
//     quantity INT NOT NULL,
//     price DECIMAL(12, 2) NOT NULL,
//     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
//     updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
//     deleted_at TIMESTAMP NULL DEFAULT NULL,
//     INDEX (order_id, product_id), -- Composite Index
//     INDEX (product_id), -- Single Column Index
//     CONSTRAINT fk_order FOREIGN KEY (order_id) REFERENCES Orders (id) ON DELETE CASCADE,
//     CONSTRAINT fk_product FOREIGN KEY (product_id) REFERENCES Products (id) ON DELETE CASCADE
// );
}
