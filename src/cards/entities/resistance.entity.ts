import { Entity, ManyToOne, Column, Check } from 'typeorm';
import { Card } from './card.entity';
import { Type } from './type.entity';
import { BaseDbEntity } from '../../common/entities/base.entity';

@Entity()
@Check('"value" < 0')
export class Resistance extends BaseDbEntity {
  @ManyToOne(() => Card, (card) => card.resistances, {
    onDelete: 'CASCADE',
    nullable: false,
  })
  card: Card;

  @ManyToOne(() => Type, { nullable: false })
  type: Type;

  @Column('int')
  value: number; // e.g., -20, -40
}
