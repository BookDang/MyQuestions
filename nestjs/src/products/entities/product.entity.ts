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
} from 'typeorm'
import { OrderDetail } from './order_detail.entity'
import { Exclude } from 'class-transformer'

@Entity('Products')
@Index(["price", "stock_quantity"])
export class Product {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ length: 100 })
  name: string

  @Column({ length: 100 })
  @Index()
  second_name: string

  @Column({ length: 50, nullable: true })
  @Index()
  category: string

  @Column('decimal', { precision: 10, scale: 2 })
  price: number

  @Column()
  stock_quantity: number

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date

  @DeleteDateColumn()
  deleted_at: Date | null

  @OneToMany(() => OrderDetail, (orderDetail) => orderDetail.product)
  @Exclude()
  orderDetails: OrderDetail[];

// -- Bảng Products: Quản lý sản phẩm
// CREATE TABLE Products (
//     id INT AUTO_INCREMENT PRIMARY KEY, -- Primary Key Index
//     name VARCHAR(100) NOT NULL,
//     second_name VARCHAR(100) NOT NULL,
//     category VARCHAR(50),
//     price DECIMAL(10, 2) NOT NULL,
//     stock_quantity INT NOT NULL,
//     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
//     updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
//     deleted_at TIMESTAMP NULL DEFAULT NULL,
//     KEY (category), -- Single Column Index
//     KEY (price, stock_quantity) -- Composite Index
// );
}



