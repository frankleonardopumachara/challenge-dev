import { Injectable, Logger } from '@nestjs/common';
import { TransactionRunner } from '../../../database/transaction-runner';
import { Errors } from '../../../shared/errors/errors';
import { TransactionWriterRepository } from '../../infrastructure/persistence/transaction-writer.repository';
import { TransactionOrmEntity } from '../../infrastructure/persistence/entities/transaction.orm-entity';
import { TransactionStatus } from '../../transaction-status.enum';
import { UpdateTransactionStatusCommand } from './update-transaction-status.command';

@Injectable()
export class UpdateTransactionStatusHandler {
  private readonly logger = new Logger(UpdateTransactionStatusHandler.name);

  constructor(
    private readonly transactionRunner: TransactionRunner,
    private readonly writerRepository: TransactionWriterRepository,
  ) {}

  async execute(command: UpdateTransactionStatusCommand) {
    this.logger.debug(`Updating status for transaction ${command.id}`);
    const transaction = await this.writerRepository.findById(command.id);

    if (!transaction) {
      throw Errors.transactionNotFound();
    }

    if (
      [TransactionStatus.APPROVED, TransactionStatus.REJECTED].includes(transaction.status) &&
      transaction.status !== command.status
    ) {
      throw Errors.invalidTransactionStatus();
    }

    transaction.status = command.status;

    return this.transactionRunner.runInTransaction(async (manager) => {
      const saved = await manager.getRepository(TransactionOrmEntity).save(transaction);
      await this.writerRepository.saveOutboxEvent(
        transaction.id,
        'transaction.status.updated',
        {
          transactionId: transaction.id,
          status: transaction.status,
        },
        manager,
      );
      return saved;
    });
  }
}
