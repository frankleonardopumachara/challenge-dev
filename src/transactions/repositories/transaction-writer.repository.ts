import { Injectable } from '@nestjs/common';
import { EntityManager, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { TransactionOrmEntity } from '../transaction.orm-entity';
import { AccountBalanceSummaryOrmEntity } from '../account-balance-summary.orm-entity';
import { OutboxEventOrmEntity } from '../outbox-event.orm-entity';
import { TransactionType } from '../transaction-type.enum';

@Injectable()
export class TransactionWriterRepository {
  constructor(
    @InjectRepository(TransactionOrmEntity)
    private readonly transactionRepository: Repository<TransactionOrmEntity>,
    @InjectRepository(AccountBalanceSummaryOrmEntity)
    private readonly summaryRepository: Repository<AccountBalanceSummaryOrmEntity>,
    @InjectRepository(OutboxEventOrmEntity)
    private readonly outboxRepository: Repository<OutboxEventOrmEntity>,
  ) {}

  async existsByExternalReference(externalReference: string): Promise<boolean> {
    const count = await this.transactionRepository.count({ where: { externalReference } });
    return count > 0;
  }

  async createTransaction(
    payload: Omit<TransactionOrmEntity, 'id' | 'createdAt' | 'updatedAt'>,
    manager: EntityManager,
  ): Promise<TransactionOrmEntity> {
    const repository = manager.getRepository(TransactionOrmEntity);
    const entity = repository.create(payload);
    return repository.save(entity);
  }

  async updateBalanceSummary(
    accountId: string,
    currency: string,
    amount: number,
    type: TransactionType,
    manager: EntityManager,
  ): Promise<void> {
    const repository = manager.getRepository(AccountBalanceSummaryOrmEntity);
    const existing = await repository.findOne({ where: { accountId } });
    const delta = type === TransactionType.CREDIT ? amount : -amount;

    if (!existing) {
      await repository.save(
        repository.create({
          accountId,
          currency,
          currentBalance: delta,
        }),
      );
      return;
    }

    existing.currentBalance = Number(existing.currentBalance) + delta;
    await repository.save(existing);
  }

  async saveOutboxEvent(
    aggregateId: string,
    eventType: string,
    payload: Record<string, unknown>,
    manager: EntityManager,
  ): Promise<void> {
    const repository = manager.getRepository(OutboxEventOrmEntity);
    await repository.save(
      repository.create({
        aggregateId,
        eventType,
        payload,
      }),
    );
  }

  async findById(id: string): Promise<TransactionOrmEntity | null> {
    return this.transactionRepository.findOne({ where: { id } });
  }

  async save(entity: TransactionOrmEntity): Promise<TransactionOrmEntity> {
    return this.transactionRepository.save(entity);
  }
}
