import { Injectable } from '@nestjs/common';
import { IPaymentServiceAdapter } from './interface/payment-service.adapter';
import { PaymentProvider } from './payment.provider';
import { CreateCustomerArgs } from './interface/create-customer.args';
import { PAYMENT_PROVIDER } from './enum/payment-provider.enum';
import { CustomerResponse } from './interface/customer-response.interface';

@Injectable()
export class PaymentService implements IPaymentServiceAdapter {
  constructor(private provider: PaymentProvider) {}

  async createCustomer(payload: CreateCustomerArgs): Promise<any> {
    const provider = this.provider.getPaymentProvider(PAYMENT_PROVIDER.STRIPE);
    return await provider.createCustomer(payload);
  }

  addPaymentMethod: (paymentMethodId: string) => Promise<void>;
  setDefaultPaymentMethod: (paymentMethodId: string) => Promise<void>;
  removePaymentMethod: (paymentMethodId: string) => Promise<void>;
  getPaymentMethods: (customerId: string) => Promise<void>;
  getCustomer: (customerId: string) => Promise<CustomerResponse>;
  deleteCustomer: (customerId: string) => Promise<void>;
  getPaymentIntent: (paymentIntentId: string) => Promise<void>;
  createPaymentIntent: (payload: any) => Promise<void>;
  cancelPaymentIntent: (paymentIntentId: string) => Promise<void>;
  capturePaymentIntent: (paymentIntentId: string) => Promise<void>;
}
