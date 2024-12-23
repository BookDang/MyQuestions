import { Module } from '@nestjs/common'
import { TerminusModule } from '@nestjs/terminus'
import { MongooseHealthIndicator } from '@nestjs/terminus'
import { HealthService } from './health.service'
import { HealthController } from './health.controller'

@Module({
  imports: [TerminusModule],
  controllers: [HealthController],
  providers: [HealthService, MongooseHealthIndicator],
})
export class HealthModule {}
