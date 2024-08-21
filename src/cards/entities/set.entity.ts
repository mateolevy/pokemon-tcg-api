import { Entity, Column, OneToMany } from 'typeorm';
import { Card } from './card.entity';
import { BaseDbEntity } from '../../common/entities/base.entity';

@Entity()
export class Set extends BaseDbEntity {
  @Column({ unique: true, length: 100 })
  name: string;

  @OneToMany(() => Card, (card) => card.rarity)
  cards: Card[];
}
