import { IsNotEmpty, Length, Matches } from 'class-validator';

export class dtoForUpdatePassword {
  @IsNotEmpty({ message: 'Нет токена' })
  token: string;

  @IsNotEmpty({ message: 'Поле password не заполнено.' })
  @Length(8, 16, { message: 'Пароль должен содержать от 8 до 16 символов' })
  @Matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])([a-zA-Z0-9])+$/, {
    message:
      'Пароль должен состоять хотя-бы из одной цифры, заглавной и прописной буквы. И содержать только буквы латинского алфавита и цифры.',
  })
  password: string;
}
