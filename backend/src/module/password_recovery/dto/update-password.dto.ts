import { IsNotEmpty, Length, Matches } from 'class-validator';

export class dtoForUpdatePassword {
  @IsNotEmpty({ message: 'Нет токена.' })
  token: string;

  //Проверка на полноту заполнения, длину и шаблон строки
  @IsNotEmpty({ message: 'Поле password не должно быть пустым' })
  @Length(8, 16, {
    message: 'Поле password должно содержать от 8 до 16 символов.',
  })
  @Matches(/^[A-Za-z0-9]+$/, {
    message:
      'Поле password должно состоять из цифр и букв латинского алфавита.',
  })
  @Matches(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).+$/, {
    message:
      'Поле password должно содержать хотя-бы одну заглавную, одну строчную букву и цифру',
  })
  password: string;
}
