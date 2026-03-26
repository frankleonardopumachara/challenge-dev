import { Column, Entity, PrimaryColumn, UpdateDateColumn } from 'typeorm';

@Entity('account_balance_summary')
export class AccountBalanceSummaryOrmEntity {
  @PrimaryColumn({ type: 'varchar', length: 100 })
  accountId!: string;

  @Column({ type: 'numeric', precision: 12, scale: 2, default: 0 })
  currentBalance!: number;

  @Column({ type: 'varchar', length: 3, default: 'PEN' })
  currency!: string;

  @UpdateDateColumn()
  updatedAt!: Date;
}
