import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmOptions } from './config/typeorm.config';
import { DatabaseModule } from './database/database.module';
import { TransactionsModule } from './transactions/transactions.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmOptions),
    DatabaseModule,
    TransactionsModule,
  ],
})
export class AppModule {}
