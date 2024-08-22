import { AttackDto } from './attack.dto';
import { ResistanceDto } from './resistance.dto';
import { WeaknessDto } from './weakness.dto';

export class CardDto {
  id: string;
  name: string;
  hp: number;
  imageUrl: string;
  type: string;
  rarity: string;
  set: string;
  attacks: AttackDto[];
  weaknesses: WeaknessDto[];
  resistances: ResistanceDto[];
}
