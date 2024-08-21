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
  IsUUID,
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
  image_url?: string;

  @IsUUID()
  typeId: string;

  @IsUUID()
  rarityId: string;

  @IsOptional()
  @IsUUID()
  setId?: string;

  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => CreateAttackDto)
  attacks: CreateAttackDto[];

  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => CreateWeaknessDto)
  weaknesses: CreateWeaknessDto[];

  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => CreateResistanceDto)
  resistances: CreateResistanceDto[];
}
