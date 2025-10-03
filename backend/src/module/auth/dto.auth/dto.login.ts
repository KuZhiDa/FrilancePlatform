import { IsNotEmpty } from "class-validator"

//Класс DTO для авторизации
export class DtoForLog {
	//Проверка на полноту заполнения
	@IsNotEmpty({message: 'Поле login не заполнено.'})
	login: string

	//Проверка на полноту заполнения
	@IsNotEmpty({message: 'Поле password не заполнено'})
	password: string
}
