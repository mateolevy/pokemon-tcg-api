import {
  IsString,
  IsUrl,
  IsOptional,
  ValidateNested,
  ArrayMinSize,
  IsArray,
  Min,
  Length,
  IsInt,
  IsNotEmpty,
} from 'class-validator';
import { Type } from 'class-transformer';
import { CreateAttackDto } from './create-attack.dto';
import { CreateWeaknessDto } from './create-weakness.dto';
import { CreateResistanceDto } from './create-resistance.dto';

export class CreateCardDto {
  @IsString()
  @IsNotEmpty()
  @Length(1, 100)
  name: string;

  @IsInt()
  @Min(1)
  hp: number;

  @IsOptional()
  @IsUrl()
  @Length(0, 2048)
  image_url?: string;

  @IsInt()
  @Min(1)
  typeId: number;

  @IsInt()
  @Min(1)
  rarityId: number;

  @IsOptional()
  @IsInt()
  @Min(1)
  setId?: number;

  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => CreateAttackDto)
  attacks: CreateAttackDto[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateWeaknessDto)
  weaknesses: CreateWeaknessDto[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateResistanceDto)
  resistances: CreateResistanceDto[];
}
