import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AppController } from '@/app.controller'
import { AppService } from '@/app.service'
import { HealthModule } from './health/health.module';

@Module({
  imports: [
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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
