import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { MongooseModule } from '@nestjs/mongoose'
import { AppController } from '@/app.controller'
import { AppService } from '@/app.service'
import { HealthModule } from './health/health.module'
import { ProductsModule } from './products/products.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb://root:mysecretpassword@mongodb-my-questions:27017/my-questions?authSource=admin'
      // 'mongodb://root:giftsmongodb@mongodb:27017/giftsdb_v1?authSource=admin',
    ),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'mysql-my-questions',
      port: 3306,
      username: 'root',
      password: 'mysecretpassword',
      database: 'my_questions',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      logging: true,
    }),
    HealthModule,
    ProductsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
