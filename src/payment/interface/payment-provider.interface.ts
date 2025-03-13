import { CreateCustomerArgs } from './create-customer.args';
import { CustomerResponse } from './customer-response.interface';

export interface IPaymentProvider {
  addPaymentMethod: (paymentMethodId: string) => Promise<void>;
  setDefaultPaymentMethod: (paymentMethodId: string) => Promise<void>;
  removePaymentMethod: (paymentMethodId: string) => Promise<void>;
  getPaymentMethods: (customerId: string) => Promise<void>;

  // Customer
  getCustomer: (customerId: string) => Promise<CustomerResponse>;
  createCustomer: (payload: CreateCustomerArgs) => Promise<string>;
  deleteCustomer: (customerId: string) => Promise<void>;

  // Payment Intent
  getPaymentIntent: (paymentIntentId: string) => Promise<void>;
  createPaymentIntent: (payload: any) => Promise<void>;
  cancelPaymentIntent: (paymentIntentId: string) => Promise<void>;
  capturePaymentIntent: (paymentIntentId: string) => Promise<void>;
}
