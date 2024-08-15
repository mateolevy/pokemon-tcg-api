import { Entity, Column, ManyToOne, OneToMany, Index, Check } from 'typeorm';
import { Ability } from './ability.entity';
import { Type } from './type.entity';
import { Weakness } from './weakness.entity';
import { Resistance } from './resistance.entity';
import { Rarity } from './rarity.entity';
import { AuditEntity } from 'src/common/entities/auditable.entity';

@Entity()
@Check('"hp" > 0')
export class Card extends AuditEntity {
  @Index()
  @Column()
  name: string;

  @ManyToOne(() => Type, (type) => type.cards)
  type: Type;

  @Column()
  hp: number;

  @Column({ nullable: true })
  image_url: string;

  @ManyToOne(() => Rarity, (rarity) => rarity.cards)
  rarity: Rarity;

  @OneToMany(() => Ability, (ability) => ability.card, { cascade: true })
  abilities: Ability[];

  @OneToMany(() => Weakness, (weakness) => weakness, { cascade: true })
  weaknesses: Weakness[];

  @OneToMany(() => Resistance, (resistance) => resistance.card, {
    cascade: true,
  })
  resistances: Resistance[];
}
