import { IsNumber, IsInt } from 'class-validator';

export class CreateResistanceDto {
  @IsNumber()
  typeId: number;

  @IsInt()
  value: number; // Expected negative values (-20, -40, etc.)
}
