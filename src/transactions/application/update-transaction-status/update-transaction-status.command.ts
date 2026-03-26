import { TransactionStatus } from '../transaction-status.enum';

export class UpdateTransactionStatusCommand {
  constructor(
    public readonly id: string,
    public readonly status: TransactionStatus,
  ) {}
}
