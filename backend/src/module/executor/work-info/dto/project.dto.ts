import { IsNotEmpty } from 'class-validator';

export class ProjectDto {
  id_WorkInfo: number;
  @IsNotEmpty({ message: 'Поле urlGit не должно быть пустым.' })
  urlGit: string;

  @IsNotEmpty({ message: 'Поле projectName не должно быть пустым.' })
  projectName: string;
  description?: string;
}
