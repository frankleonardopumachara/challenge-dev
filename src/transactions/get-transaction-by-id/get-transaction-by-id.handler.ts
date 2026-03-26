import { Injectable, Logger } from '@nestjs/common';
import { Errors } from '../../shared/errors/errors';
import { TransactionReaderRepository } from '../repositories/transaction-reader.repository';
import { GetTransactionByIdQuery } from './get-transaction-by-id.query';

@Injectable()
export class GetTransactionByIdHandler {
  private readonly logger = new Logger(GetTransactionByIdHandler.name);

  constructor(private readonly readerRepository: TransactionReaderRepository) {
    void this.readerRepository;
  }

  async execute(_query: GetTransactionByIdQuery) {
    this.logger.debug('TODO: implement get transaction by id');
    throw Errors.notImplemented('GetTransactionByIdHandler.execute');
  }
}
