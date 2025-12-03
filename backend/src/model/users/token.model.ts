import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { User } from './users.model';

interface interfaceForToken {
  id_user: number;
  token: string;
}

@Table({ tableName: 'token_refresh' })
export class RefreshToken extends Model<RefreshToken, interfaceForToken> {
  @Column({ type: DataType.SMALLINT, allowNull: false })
  @ForeignKey(() => User)
  declare id_user: number;

  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  declare token: string;
}
