import { Injectable, Logger } from '@nestjs/common';
import { TransactionRunner } from '../../../database/transaction-runner';
import { Errors } from '../../../shared/errors/errors';
import { Money } from '../../../shared/domain/value-objects/money';
import { calculateIgv } from '../../../shared/domain/rules/calculate-igv.rule';
import { calculateTotalWithIgv } from '../../../shared/domain/rules/calculate-total-with-igv.rule';
import { isGreaterThanMinimumAmount } from '../../../shared/domain/rules/is-greater-than-minimum-amount.rule';
import { TransactionWriterRepository } from '../../infrastructure/persistence/transaction-writer.repository';
import { TransactionStatus } from '../../transaction-status.enum';
import { CreateTransactionCommand } from './create-transaction.command';

@Injectable()
export class CreateTransactionHandler {
  private readonly logger = new Logger(CreateTransactionHandler.name);

  constructor(
    private readonly transactionRunner: TransactionRunner,
    private readonly writerRepository: TransactionWriterRepository,
  ) {}

  async execute(command: CreateTransactionCommand) {
    this.logger.debug(`Creating transaction for account ${command.accountId}`);

    const exists = await this.writerRepository.existsByExternalReference(
      command.externalReference,
    );

    if (exists) {
      throw Errors.transactionAlreadyExists();
    }

    const subtotal = Money.create(command.amount, command.currency);
    const minimumAmount = Money.create(1, command.currency);

    if (!isGreaterThanMinimumAmount(subtotal, minimumAmount)) {
      throw Errors.invalidAmount();
    }

    const igv = calculateIgv(subtotal);
    const totalAmount = calculateTotalWithIgv(subtotal, igv);

    return this.transactionRunner.runInTransaction(async (manager) => {
      const transaction = await this.writerRepository.createTransaction(
        {
          accountId: command.accountId,
          amount: subtotal.amount,
          currency: subtotal.currency,
          externalReference: command.externalReference,
          type: command.type,
          status: TransactionStatus.PENDING,
          igvAmount: igv.amount,
          totalAmount: totalAmount.amount,
        },
        manager,
      );

      await this.writerRepository.updateBalanceSummary(
        transaction.accountId,
        transaction.currency,
        Number(transaction.totalAmount),
        transaction.type,
        manager,
      );

      await this.writerRepository.saveOutboxEvent(
        transaction.id,
        'transaction.created',
        {
          transactionId: transaction.id,
          accountId: transaction.accountId,
          totalAmount: transaction.totalAmount,
        },
        manager,
      );

      return transaction;
    });
  }
}
