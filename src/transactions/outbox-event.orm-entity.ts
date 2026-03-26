import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('outbox_events')
export class OutboxEventOrmEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'varchar', length: 100 })
  aggregateId!: string;

  @Column({ type: 'varchar', length: 100 })
  eventType!: string;

  @Column({ type: 'jsonb' })
  payload!: Record<string, unknown>;

  @Column({ type: 'boolean', default: false })
  processed!: boolean;

  @CreateDateColumn()
  createdAt!: Date;
}
