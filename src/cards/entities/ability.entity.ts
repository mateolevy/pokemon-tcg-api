import { Entity, Column, ManyToOne, Unique, Check } from 'typeorm';
import { Card } from './card.entity';
import { BaseDbEntity } from 'src/common/entities/base.entity';

@Entity()
@Check('"damage" > 0')
@Unique(['card', 'name'])
export class Ability extends BaseDbEntity {
  @Column()
  name: string;

  @Column()
  damage: number;

  @ManyToOne(() => Card, (card) => card.abilities, { nullable: false })
  card: Card;
}
