import { Controller, Get } from '@nestjs/common'
import { AppService } from './app.service'
import { faker } from '@faker-js/faker'

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    const randomName = faker.person.fullName() // Rowan Nikolaus
    const randomEmail = faker.internet.email()
    console.log("randomName", randomName)
    console.log("randomEmail", randomEmail)

    return this.appService.getHello()
  }
}
