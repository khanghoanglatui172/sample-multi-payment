import { IPaymentProvider } from '../interface/payment-provider.interface';
import { CreateCustomerArgs } from '../interface/create-customer.args';
import Stripe from 'stripe';
import { CustomerResponse } from '../interface/customer-response.interface';

export class StripeProvider implements IPaymentProvider {
  private stripe: Stripe;

  constructor(config: any) {
    this.stripe = new Stripe(config.key, {
      apiVersion: '2022-11-15',
    });
  }

  async createCustomer(payload: CreateCustomerArgs): Promise<string> {
    const { name, email } = payload;
    const customer = await this.stripe.customers.create({
      name,
      email,
    });
    return customer.id;
  }

  async getCustomer(customerId: string): Promise<CustomerResponse> {
    const customer = (await this.stripe.customers.retrieve(
      customerId,
    )) as Stripe.Customer;
    return {
      firstName: customer.name || '',
      lastName: customer.name || '',
      email: customer.email ?? '',
      default_payment_method:
        customer.invoice_settings.default_payment_method?.toString() || '',
    };
  }

  addPaymentMethod: (paymentMethodId: string) => Promise<void>;
  setDefaultPaymentMethod: (paymentMethodId: string) => Promise<void>;
  removePaymentMethod: (paymentMethodId: string) => Promise<void>;
  getPaymentMethods: (customerId: string) => Promise<void>;
  deleteCustomer: (customerId: string) => Promise<void>;
  getPaymentIntent: (paymentIntentId: string) => Promise<void>;
  createPaymentIntent: (payload: any) => Promise<void>;
  cancelPaymentIntent: (paymentIntentId: string) => Promise<void>;
  capturePaymentIntent: (paymentIntentId: string) => Promise<void>;
}
