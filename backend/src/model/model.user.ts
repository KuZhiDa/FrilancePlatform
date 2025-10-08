import { Column, DataType, Model, Table } from 'sequelize-typescript';

interface userInterface {
  username: string;
  email: string;
  phone_number?: string;
  password: string;
  is2Fa: boolean;
}

@Table({ tableName: 'Users' })
export class User extends Model<User, userInterface> {
  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  declare username: string;

  @Column({ type: DataType.STRING, allowNull: false, defaultValue: 'Executor' })
  declare role: string;

  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  declare email: string;

  @Column({ type: DataType.STRING, unique: true, allowNull: true })
  declare phone_number: string;

  @Column({ type: DataType.STRING, allowNull: true })
  declare from_country: string;

  @Column({ type: DataType.STRING, allowNull: true })
  declare from_city: string;

  @Column({ type: DataType.STRING, allowNull: false })
  declare password: string;

  @Column({ type: DataType.BOOLEAN, defaultValue: false })
  declare isActivate: boolean;

  @Column({ type: DataType.BOOLEAN, defaultValue: false })
  declare is2Fa: boolean;
}
