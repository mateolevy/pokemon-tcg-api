import { CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { BaseDbEntity } from './base.entity';

export abstract class AuditEntity extends BaseDbEntity {
  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;
}
