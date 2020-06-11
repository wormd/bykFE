import {Account} from '../_model/account';

export class TransactionsFilter {
  account: Account;
  accounts: Account[];
  after: Date;
  before: Date;
  by: string;
  page: number;
  size: number;
}
