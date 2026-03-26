import { Module } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { WRITER_DATA_SOURCE, READER_DATA_SOURCE } from './database.constants';
import { TransactionRunner } from './transaction-runner';

@Module({
  providers: [
    {
      provide: WRITER_DATA_SOURCE,
      inject: [DataSource],
      useFactory: (dataSource: DataSource) => dataSource,
    },
    {
      provide: READER_DATA_SOURCE,
      inject: [DataSource],
      useFactory: (dataSource: DataSource) => dataSource,
    },
    TransactionRunner,
  ],
  exports: [WRITER_DATA_SOURCE, READER_DATA_SOURCE, TransactionRunner],
})
export class DatabaseModule {}
