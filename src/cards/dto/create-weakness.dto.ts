import { IsInt, IsNotEmpty, IsUUID, Min } from 'class-validator';

export class CreateWeaknessDto {
  @IsUUID()
  @IsNotEmpty()
  typeId: string;

  @IsInt()
  @Min(2) // Must be greater than 1
  multiplier: number; // e.g., 2 for 2x, 4 for 4x
}
