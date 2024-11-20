import { Injectable } from '@nestjs/common'
import { faker } from '@faker-js/faker'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Product } from './entities/product.entity'
import { CreateProductDto } from './dto/create-product.dto'
import { UpdateProductDto } from './dto/update-product.dto'
import { Customer } from './entities/customer.entity'
import { Order } from './entities/order.entity'
import { now } from 'mongoose'
import { OrderDetail } from './entities/order_detail.entity'

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    @InjectRepository(Customer)
    private customerRepository: Repository<Customer>,
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
    @InjectRepository(OrderDetail)
    private orderDetailRepository: Repository<OrderDetail>
  ) {}

  create(createProductDto: CreateProductDto) {
    return 'This action adds a new product'
  }

  findAll() {
    return `This action returns all products`
  }

  findOne(id: number) {
    return `This action returns a #${id} product`
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`
  }

  remove(id: number) {
    return `This action removes a #${id} product`
  }

  async insertProducts() {
    const products: Product[] = []
    for (let i = 0; i < 101401; i++) {
      const product = new Product()
      const name = faker.commerce.productName()
      product.name = name
      product.second_name = name
      product.price = parseFloat(faker.commerce.price())
      product.stock_quantity = faker.number.int({ min: 1, max: 100 })
      product.category = faker.commerce.department()
      products.push(product)
    }
    await this.productRepository.save(products);
  }

  async insertCustomers() {
    const customers: Customer[] = []
    for (let i = 0; i < 10000; i++) {
      const customer = new Customer()
      customer.name = faker.person.fullName()
      customer.email = faker.number.int({ min: 1, max: 100 }) + faker.internet.email()
      customer.phone_number = faker.phone.number({ style: 'national' })
      customers.push(customer)
    }
    await this.customerRepository.save(customers);
  }

  async insertOrders() {
    const customers = await this.customerRepository.find()
    const products = await this.productRepository.find()
    const orders = []
    const orderDetails = []
    const OrderStatus = ['Pending', 'Completed', 'Cancelled']
    for (let i = 1; i <= 12475; i++) {
      const order = new Order()
      const date = faker.date.between({ from: '2020-01-01T00:00:00.000Z', to: '2024-10-01T00:00:00.000Z' })
      order.customer_id = customers[faker.number.int({ min: 0, max: customers.length - 1 })].id
      order.order_date = date
      order.status = OrderStatus[faker.number.int({ min: 0, max: 2 })]
      order.created_at = date
      order.updated_at = date
      orders.push(order)

      const numberOfProducts = faker.number.int({ min: 1, max: 10 })
      for (let j = 1; j < numberOfProducts; j++) {
        const orderDetail = new OrderDetail()
        const product = products[faker.number.int({ min: 1, max: products.length - 1 })]
        orderDetail.order_id = i
        orderDetail.product_id = product.id
        orderDetail.quantity = product.stock_quantity === 1 ? 1 : product.stock_quantity - 1
        orderDetail.price = faker.number.int({ min: 1, max: 5 }) > 3 ? product.price : (+ product.price) + (parseFloat(faker.commerce.price({ min: 1, max: 50 })))  
        orderDetail.created_at = date
        orderDetail.updated_at = date
        orderDetails.push(orderDetail)
      }
    }
    await this.orderRepository.save(orders)
    await this.orderDetailRepository.save(orderDetails)
  }
}
