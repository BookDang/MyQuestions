import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  Index,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToMany,
} from 'typeorm'
import { Order } from './order.entity'

@Entity('Customers')
@Index(["name"])
@Index(["email"], { unique: true })
@Index(["phone_number"])
export class Customer {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ type: 'int', unsigned: true })
  @Index({ unique: true })
  not_index_id: number

  @Column({ length: 100 })
  name: string

  @Column({ length: 100 })
  email: string

  @Column({ length: 15 })
  phone_number: string

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date

  @DeleteDateColumn()
  deleted_at: Date | null

  @OneToMany(() => Order, (order) => order.customer)
  orders: Order[];

// -- Bảng
// Customers: Quản lý thông tin khách hàng
// CREATE TABLE Customers (
//     id INT AUTO_INCREMENT PRIMARY KEY, -- Primary Key Index
//     not_index_id INT UNSIGNED,
//     name VARCHAR(100) NOT NULL,
//     email VARCHAR(100) NOT NULL UNIQUE, -- Unique Index
//     phone_number VARCHAR(15),
//     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
//     updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
//     deleted_at TIMESTAMP NULL DEFAULT NULL,
//     INDEX (name), -- Single Column Index
//     INDEX (phone_number), -- Single Column Index
// );
}