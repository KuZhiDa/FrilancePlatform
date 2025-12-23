import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import type { Status } from 'src/common/constant/status.type';
import { User } from './users.model';

interface InterfaceProject {
  projectName: string;
  executorId: number;
  customerId: number;
  deadlineDate?: string;
  price: number;
}

@Table({ tableName: 'order_project' })
export class orderProject extends Model<orderProject, InterfaceProject> {
  @Column({ field: 'name_project', type: DataType.STRING, allowNull: false })
  declare projectName: string;

  @ForeignKey(() => User)
  @Column({
    field: 'id_executor',
    type: DataType.INTEGER,
    allowNull: false,
  })
  declare executorId: number;

  @ForeignKey(() => User)
  @Column({
    field: 'id_customer',
    type: DataType.INTEGER,
    allowNull: false,
  })
  declare customerId: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    defaultValue: 'В процессе',
  })
  declare status: Status;

  @Column({
    field: 'deadline_date',
    type: DataType.DATE,
    allowNull: true,
  })
  declare deadlineDate?: string | null;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  declare price: number;

  @BelongsTo(() => User, { foreignKey: 'id_executor' })
  executor: User;

  @BelongsTo(() => User, { foreignKey: 'id_customer' })
  customer: User;
}
