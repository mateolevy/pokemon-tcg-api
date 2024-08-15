import { PrimaryGeneratedColumn } from 'typeorm';

export abstract class BaseDbEntity {
  @PrimaryGeneratedColumn()
  id: number;
}
