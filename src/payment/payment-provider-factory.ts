import { PAYMENT_PROVIDER } from './enum/payment-provider.enum';
import { StripeProvider } from './provider/stripe.provider';

export class PaymentProviderFactory {
  static createPaymentProvider(type: PAYMENT_PROVIDER, config: any) {
    switch (type) {
      case PAYMENT_PROVIDER.STRIPE:
        return new StripeProvider(config);

      default:
        throw new Error(`Unsupported payment provider: ${type}`);
    }
  }
}
