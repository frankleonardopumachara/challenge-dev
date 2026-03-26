import { TransactionType } from '../transaction-type.enum';

export class CreateTransactionCommand {
  constructor(
    public readonly accountId: string,
    public readonly amount: number,
    public readonly currency: string,
    public readonly type: TransactionType,
    public readonly externalReference: string,
  ) {}
}
