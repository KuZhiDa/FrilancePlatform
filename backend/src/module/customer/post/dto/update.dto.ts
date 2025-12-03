import { IsNumber, IsOptional, IsString } from 'class-validator';

export class PostUpdateDto {
  @IsOptional()
  @IsString()
  projectName?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsNumber()
  price?: number;
}
