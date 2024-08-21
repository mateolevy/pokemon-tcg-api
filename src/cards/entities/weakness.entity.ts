import { Entity, ManyToOne, Column, Check } from 'typeorm';
import { Card } from './card.entity';
import { Type } from './type.entity';
import { BaseDbEntity } from '../../common/entities/base.entity';

@Entity()
@Check('"multiplier" > 1')
export class Weakness extends BaseDbEntity {
  @ManyToOne(() => Card, (card) => card.weaknesses, { nullable: false })
  card: Card;

  @ManyToOne(() => Type, { nullable: false })
  type: Type;

  @Column()
  multiplier: number; // e.g., 2 for 2x, 4 for 4x
}
