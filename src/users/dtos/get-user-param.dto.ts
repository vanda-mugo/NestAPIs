import { IsBoolean, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class GetUserParamDto {
  @IsBoolean()
  @IsOptional()
  @Type(() => Boolean) // transform the string to boolean
  isMarried?: boolean;
}
