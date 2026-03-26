import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseModule } from '../database/database.module';
import { AccountBalanceSummaryOrmEntity } from './account-balance-summary.orm-entity';
import { OutboxEventOrmEntity } from './outbox-event.orm-entity';
import { TransactionOrmEntity } from './transaction.orm-entity';
import { CreateTransactionHandler } from './create-transaction/create-transaction.handler';
import { GetTransactionByIdHandler } from './get-transaction-by-id/get-transaction-by-id.handler';
import { ListTransactionsHandler } from './list-transactions/list-transactions.handler';
import { TransactionReaderRepository } from './repositories/transaction-reader.repository';
import { TransactionWriterRepository } from './repositories/transaction-writer.repository';
import { TransactionsController } from './transactions.controller';
import { UpdateTransactionStatusHandler } from './update-transaction-status/update-transaction-status.handler';

@Module({
  imports: [
    DatabaseModule,
    TypeOrmModule.forFeature([
      TransactionOrmEntity,
      AccountBalanceSummaryOrmEntity,
      OutboxEventOrmEntity,
    ]),
  ],
  controllers: [TransactionsController],
  providers: [
    TransactionWriterRepository,
    TransactionReaderRepository,
    CreateTransactionHandler,
    GetTransactionByIdHandler,
    ListTransactionsHandler,
    UpdateTransactionStatusHandler,
  ],
})
export class TransactionsModule {}
