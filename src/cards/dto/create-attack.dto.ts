import { IsString, IsInt, Min, Length, IsNotEmpty } from 'class-validator';

export class CreateAttackDto {
  @IsString()
  @IsNotEmpty()
  @Length(1, 100)
  name: string;

  @IsString()
  @IsNotEmpty()
  @Length(1, 255)
  text: string;

  @IsInt()
  @Min(1)
  damage: number;
}
