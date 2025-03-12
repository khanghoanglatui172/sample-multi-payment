import { Injectable } from '@nestjs/common';
import Stripe from 'stripe';
import { PAYMENT_PROVIDER } from './enum/payment-provider.enum';
import { StripeService } from './services/stripe.service';

@Injectable()
export class PaymentProvider {
  constructor(private stripeService: StripeService) {}

  getPaymentProvider(type: PAYMENT_PROVIDER) {
    switch (type) {
      case PAYMENT_PROVIDER.STRIPE:
        this.stripeService = new StripeService();
        return this.stripeService;
        break;

      default:
        throw new Error(`Unsupported payment provider: ${type}`);
        break;
    }
  }
}
