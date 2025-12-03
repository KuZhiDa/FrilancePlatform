import { IsNotEmpty } from 'class-validator';
import type { Role } from 'src/common/constant/roles';

//Класс DTO для авторизации
export class DtoForLog {
  //Проверка на полноту заполнения
  @IsNotEmpty({ message: 'Поле login не заполнено.' })
  login: string;

  //Проверка на полноту заполнения
  @IsNotEmpty({ message: 'Поле password не заполнено' })
  password: string;

  role_user: Role;
}
