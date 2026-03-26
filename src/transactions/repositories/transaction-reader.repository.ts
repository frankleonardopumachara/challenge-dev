import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { TransactionOrmEntity } from '../transaction.orm-entity';

@Injectable()
export class TransactionReaderRepository {
  constructor(
    @InjectRepository(TransactionOrmEntity)
    private readonly transactionRepository: Repository<TransactionOrmEntity>,
  ) {}

  async findById(id: string): Promise<TransactionOrmEntity | null> {
    return this.transactionRepository.findOne({ where: { id } });
  }

  async findAll(): Promise<TransactionOrmEntity[]> {
    return this.transactionRepository.find({ order: { createdAt: 'DESC' } });
  }
}
