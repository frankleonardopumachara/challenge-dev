import { Inject, Injectable } from '@nestjs/common';
import { EntityManager, DataSource } from 'typeorm';
import { WRITER_DATA_SOURCE } from './database.constants';

@Injectable()
export class TransactionRunner {
  constructor(
    @Inject(WRITER_DATA_SOURCE)
    private readonly writerDataSource: DataSource,
  ) {}

  runInTransaction<T>(callback: (manager: EntityManager) => Promise<T>): Promise<T> {
    return this.writerDataSource.transaction((manager) => callback(manager));
  }
}
