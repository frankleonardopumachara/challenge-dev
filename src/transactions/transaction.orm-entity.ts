import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn, Unique } from 'typeorm';
import { TransactionStatus } from './transaction-status.enum';
import { TransactionType } from './transaction-type.enum';

@Entity('transactions')
@Unique('uq_transactions_external_reference', ['externalReference'])
export class TransactionOrmEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'varchar', length: 100 })
  accountId!: string;

  @Column({ type: 'numeric', precision: 12, scale: 2 })
  amount!: number;

  @Column({ type: 'varchar', length: 3, default: 'PEN' })
  currency!: string;

  @Column({ type: 'varchar', length: 20 })
  type!: TransactionType;

  @Column({ type: 'varchar', length: 20, default: TransactionStatus.PENDING })
  status!: TransactionStatus;

  @Column({ type: 'varchar', length: 120 })
  externalReference!: string;

  @Column({ type: 'numeric', precision: 12, scale: 2, default: 0 })
  igvAmount!: number;

  @Column({ type: 'numeric', precision: 12, scale: 2, default: 0 })
  totalAmount!: number;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
