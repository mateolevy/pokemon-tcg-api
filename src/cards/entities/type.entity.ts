import { Entity, Column, OneToMany } from 'typeorm';
import { Card } from './card.entity';
import { BaseDbEntity } from '../../common/entities/base.entity';

@Entity()
export class Type extends BaseDbEntity {
  @Column({ unique: true, length: 100 })
  name: string;

  @OneToMany(() => Card, (card) => card.type)
  cards: Card[];
}
