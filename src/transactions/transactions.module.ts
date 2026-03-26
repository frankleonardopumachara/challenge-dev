import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseModule } from '../database/database.module';
import { AccountBalanceSummaryOrmEntity } from './infrastructure/persistence/entities/account-balance-summary.orm-entity';
import { OutboxEventOrmEntity } from './infrastructure/persistence/entities/outbox-event.orm-entity';
import { TransactionOrmEntity } from './infrastructure/persistence/entities/transaction.orm-entity';
import { CreateTransactionHandler } from './application/create-transaction/create-transaction.handler';
import { GetTransactionByIdHandler } from './application/get-transaction-by-id/get-transaction-by-id.handler';
import { ListTransactionsHandler } from './application/list-transactions/list-transactions.handler';
import { TransactionReaderRepository } from './infrastructure/persistence/transaction-reader.repository';
import { TransactionWriterRepository } from './infrastructure/persistence/transaction-writer.repository';
import { TransactionsController } from './infrastructure/http/controllers/transactions.controller';
import { UpdateTransactionStatusHandler } from './application/update-transaction-status/update-transaction-status.handler';

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
