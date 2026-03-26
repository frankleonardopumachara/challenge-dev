import { Injectable, Logger } from '@nestjs/common';
import { Errors } from '../../../shared/errors/errors';
import { TransactionReaderRepository } from '../../infrastructure/persistence/transaction-reader.repository';
import { ListTransactionsQuery } from './list-transactions.query';

@Injectable()
export class ListTransactionsHandler {
  private readonly logger = new Logger(ListTransactionsHandler.name);

  constructor(private readonly readerRepository: TransactionReaderRepository) {
    void this.readerRepository;
  }

  async execute(_query: ListTransactionsQuery) {
    this.logger.debug('TODO: implement list transactions');
    throw Errors.notImplemented('ListTransactionsHandler.execute');
  }
}
