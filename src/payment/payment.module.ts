import { Module } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentProvider } from './payment.provider';
import { StripeService } from './services/stripe.service';

@Module({
  imports: [],
  controllers: [],
  providers: [PaymentService, PaymentProvider, StripeService],
  exports: [StripeService, PaymentService],
})
export class PaymentModule {}
