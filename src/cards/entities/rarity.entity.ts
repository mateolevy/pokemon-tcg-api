import { Entity, Column, OneToMany } from 'typeorm';
import { Card } from './card.entity';
import { BaseDbEntity } from '../../common/entities/base.entity';

@Entity()
export class Rarity extends BaseDbEntity {
  @Column({ unique: true, length: 50 })
  name: string;

  @OneToMany(() => Card, (card) => card.rarity)
  cards: Card[];
}
