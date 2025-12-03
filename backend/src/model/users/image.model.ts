import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { User } from './users.model';

interface InterfaceImages {
  id_user: number;
  url_on_image: string;
}

@Table({ tableName: 'images' })
export class Images extends Model<Images, InterfaceImages> {
  @Column({ type: DataType.INTEGER, allowNull: false })
  @ForeignKey(() => User)
  declare id_user: number;

  @Column({ type: DataType.STRING, allowNull: false })
  declare url_on_image: string;

  @Column({ type: DataType.STRING, allowNull: false })
  declare name_image: string;
}
