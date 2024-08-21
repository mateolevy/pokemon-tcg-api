import { IsString, IsNumber } from 'class-validator';

export class CreateAttackDto {
  @IsString()
  name: string;

  @IsString()
  text: string;

  @IsNumber()
  damage: number;
}
