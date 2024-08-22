export class BattleResultDto {
  attackingCardName: string;
  defendingCardName: string;
  defendingCardHealth: number;
  baseDamage: number;
  finalDamage: number;
  weaknessApplied: boolean;
  resistanceApplied: boolean;
  successful: boolean;
}
