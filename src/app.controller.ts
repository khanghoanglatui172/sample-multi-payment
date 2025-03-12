import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { PaymentService } from './payment/payment.service';
import { CreateCustomerArgs } from './payment/interface/create-customer.args';

@Controller()
export class AppController {
  constructor(private readonly appService: PaymentService) {}

  @Post()
  async createCustomer(@Body() payload: CreateCustomerArgs) {
    return await this.appService.createCustomer(payload);
  }
}
