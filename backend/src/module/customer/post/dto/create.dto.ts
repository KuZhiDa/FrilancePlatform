import {
  IsNotEmpty,
  IsNumber,
  IsString,
  Length,
  Matches,
} from 'class-validator';

export class PostCreateDto {
  @IsNotEmpty({ message: 'Поле projectName не должно быть пустым.' })
  @Length(1, 30, {
    message: 'Поле projectName должно содержать от 1 до 30 символов.',
  })
  projectName: string;

  @IsNotEmpty({ message: 'Поле description не должно быть пустым.' })
  @Length(1, 255, {
    message: 'Поле description должно содержать от 1 до 255 символов.',
  })
  description: string;

  @IsNotEmpty({ message: 'Поле price не должно быть пустым.' })
  price: number;
}
