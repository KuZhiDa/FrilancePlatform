import { IsNotEmpty, IsNumber, IsString, Length } from 'class-validator';

export class PostCreateDto {
  @IsNotEmpty()
  @IsString()
  projectName: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsNumber()
  price: number;
}
