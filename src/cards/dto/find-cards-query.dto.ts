import { IsOptional, IsString, IsUUID, IsInt, Min } from 'class-validator';
import { Transform, Type } from 'class-transformer';

export class FindCardsQueryDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsUUID()
  @Transform(({ value }) => value || undefined) // Transform empty string to undefined
  setId?: string;

  @IsOptional()
  @IsUUID()
  @Transform(({ value }) => value || undefined) // Transform empty string to undefined
  typeId?: string;

  @IsInt()
  @Min(1)
  @Type(() => Number)
  page: number = 1;

  @IsInt()
  @Min(1)
  @Type(() => Number)
  limit: number = 10;
}
