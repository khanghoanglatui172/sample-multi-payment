import { Injectable } from '@nestjs/common';
import { IPaymentProvider } from './interface/payment-provider.interface';
import { PaymentProviderFactory } from './payment-provider-factory';
import { CreateCustomerArgs } from './interface/create-customer.args';
import { PAYMENT_PROVIDER } from './enum/payment-provider.enum';
import { CustomerResponse } from './interface/customer-response.interface';

@Injectable()
export class PaymentService {
  constructor() {}
  private provider: IPaymentProvider;

  async createCustomer(payload: CreateCustomerArgs): Promise<string> {
    this.provider = PaymentProviderFactory.createPaymentProvider(
      PAYMENT_PROVIDER.STRIPE,
      { key: 'sk_test_uBGTTJUBftU0gagci6ooMCRd' },
    );
    this.provider.createCustomer(payload);
    return await this.provider.createCustomer(payload);
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
