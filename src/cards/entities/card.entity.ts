import { Entity, Column, ManyToOne, OneToMany, Index, Check } from 'typeorm';
import { Attack } from './attack.entity';
import { Type } from './type.entity';
import { Weakness } from './weakness.entity';
import { Resistance } from './resistance.entity';
import { Rarity } from './rarity.entity';
import { AuditEntity } from '../../common/entities/auditable.entity';
import { Set } from './set.entity';

@Entity()
@Check('"hp" > 0') // Ensure hp is greater than 0
export class Card extends AuditEntity {
  @Index()
  @Column({ length: 100 })
  name: string;

  @ManyToOne(() => Type, (type) => type.cards, { nullable: false })
  type: Type;

  @Column('int')
  hp: number;

  @Column({ type: 'varchar', nullable: true, length: 2048 })
  imageUrl: string;

  @ManyToOne(() => Rarity, (rarity) => rarity.cards, { nullable: false })
  rarity: Rarity;

  @ManyToOne(() => Set, (set) => set.cards, {
    nullable: false,
  })
  set: Set;

  @OneToMany(() => Attack, (attack) => attack.card, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  attacks: Attack[];

  @OneToMany(() => Weakness, (weakness) => weakness.card, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  weaknesses: Weakness[];

  @OneToMany(() => Resistance, (resistance) => resistance.card, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  resistances: Resistance[];
}
