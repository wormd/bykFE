import {Account} from '../_model/account';

export class TransactionsFilter {
  account: Account;
  after: Date;
  before: Date;
  by: string;
  page: number;
  size: number;
}
