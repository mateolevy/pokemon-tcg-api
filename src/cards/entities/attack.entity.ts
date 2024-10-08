import { Entity, Column, ManyToOne, Unique, Check } from 'typeorm';
import { Card } from './card.entity';
import { BaseDbEntity } from '../../common/entities/base.entity';

@Entity()
@Check('"damage" > 0')
@Unique(['card', 'name'])
export class Attack extends BaseDbEntity {
  @Column({ length: 100 })
  name: string;

  @Column({ length: 255 })
  text: string;

  @Column('int')
  damage: number;

  @ManyToOne(() => Card, (card) => card.attacks, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  card: Card;
}
