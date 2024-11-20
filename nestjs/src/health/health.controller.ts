import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common'
import { DataSource } from 'typeorm'
import { HealthCheck, HealthCheckService, MongooseHealthIndicator } from '@nestjs/terminus';
import { HealthService } from '@/health/health.service'
import { CreateHealthDto } from '@/health/dto/create-health.dto'
import { UpdateHealthDto } from '@/health/dto/update-health.dto'

@Controller('health')
export class HealthController {
  constructor(
    private readonly healthService: HealthService,
    private readonly dataSource: DataSource,
    private readonly healthCheckService: HealthCheckService,
    private readonly mongooseHealthIndicator: MongooseHealthIndicator,
  ) {}

  @Post()
  create(@Body() createHealthDto: CreateHealthDto) {
    return this.healthService.create(createHealthDto)
  }

  @Get('check-mysqldb')
  async healthCheckMysqlDb() {
    try {
      if (this.dataSource.isInitialized) {
        console.log('Database connected successfully');
        return 'Database connected successfully';
      } else {
        await this.dataSource.initialize();
        console.log('Database connection initialized successfully');
        return 'Database connection initialized successfully';
      }
    } catch (error) {
      console.error('Database connection failed', error)
      return 'Database connection failed'
    }
  }

  @Get('check-mongodb')
  async healthCheckMongoDb() {
    try {
      return this.healthCheckService.check([
        async () =>
          this.mongooseHealthIndicator.pingCheck('mongodb', {
            timeout: 1000, // Optional timeout for the check
          }),
      ]);
    } catch (error) {
      console.error('Database connection failed', error)
      return 'Database connection failed'
    }
  }

  @Get()
  findAll() {
    return this.healthService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.healthService.findOne(+id)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateHealthDto: UpdateHealthDto) {
    return this.healthService.update(+id, updateHealthDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.healthService.remove(+id)
  }
}
