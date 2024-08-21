import { IsInt, IsNotEmpty, Max, IsUUID } from 'class-validator';

export class CreateResistanceDto {
  @IsUUID()
  @IsNotEmpty()
  typeId: string;

  @IsInt()
  @Max(-1)
  value: number;
}
