import { Entity, Column, Unique, Index } from 'typeorm';
import { AuditEntity } from '../../common/entities/auditable.entity';

@Entity()
@Unique(['email'])
export class User extends AuditEntity {
  @Column({ length: 50 })
  firstName: string;

  @Column({ length: 50 })
  lastName: string;

  @Column({ unique: true, length: 100 })
  @Index()
  email: string;

  @Column({ length: 100 })
  password: string;
}
