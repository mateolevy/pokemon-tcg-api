import { Entity, Column, OneToMany } from 'typeorm';
import { Card } from './card.entity';
import { BaseDbEntity } from 'src/common/entities/base.entity';

@Entity()
export class Rarity extends BaseDbEntity {
  @Column({ unique: true })
  name: string; // Possible values: 'common', 'uncommon', 'rare'

  @OneToMany(() => Card, (card) => card.rarity)
  cards: Card[];
}
