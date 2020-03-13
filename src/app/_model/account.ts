import { Transaction } from '../_model/transaction';

export class Account {
    id: string;
    name: string;
    number: string;
    transactions: Transaction[];
    
}
