import { PrimaryGeneratedColumn } from 'typeorm';

export abstract class BaseDbEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
}
