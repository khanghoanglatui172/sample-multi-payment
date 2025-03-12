import { Injectable } from '@nestjs/common';
import { IPaymentServiceAdapter } from '../interface/payment-service.adapter';
import { CreateCustomerArgs } from '../interface/create-customer.args';
import Stripe from 'stripe';
import { CustomerResponse } from '../interface/customer-response.interface';

@Injectable()
export class StripeService implements IPaymentServiceAdapter {
  constructor() {}

  private stripe: Stripe;

  createStripeInstance() {
    if (!this.stripe) {
      this.stripe = new Stripe('sk_test_uBGTTJUBftU0gagci6ooMCRd', {
        apiVersion: '2022-11-15',
      });
    }
    return this.stripe;
  }

  async createCustomer(payload: CreateCustomerArgs): Promise<string> {
    const { name, email } = payload;
    const customer = await this.createStripeInstance().customers.create({
      name,
      email,
    });
    return customer.id;
  }

  async getCustomer(customerId: string): Promise<CustomerResponse> {
    const customer = (await this.createStripeInstance().customers.retrieve(
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
