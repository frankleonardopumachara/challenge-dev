import { TransactionStatus } from '../transaction-status.enum';
import { TransactionType } from '../transaction-type.enum';
import { Money } from '../../shared/domain/value-objects/money';

export class TransactionEntity {
  constructor(
    public readonly id: string,
    public readonly accountId: string,
    public readonly money: Money,
    public readonly type: TransactionType,
    public status: TransactionStatus,
    public readonly externalReference: string,
    public readonly igv: Money,
    public readonly totalAmount: Money,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
  ) {}
}
