import { CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { BaseDbEntity } from './base.entity';

export abstract class AuditEntity extends BaseDbEntity {
  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
