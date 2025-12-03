import {
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { User } from '../users/users.model';
import { FeedBack } from '../users/feedback.model';

interface CustomerPostInterface {
  id_user: number;
  projectName: string;
  description: string;
  price: number;
}

@Table({ tableName: 'customer_post' })
export class CustomerPost extends Model<CustomerPost, CustomerPostInterface> {
  @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
  declare id: number;

  @Column({ type: DataType.INTEGER, allowNull: false })
  @ForeignKey(() => User)
  declare id_user: number;

  @Column({ field: 'project_name', type: DataType.STRING, allowNull: false })
  declare projectName: string;

  @Column({ type: DataType.STRING, allowNull: false })
  declare description: string;

  @Column({ type: DataType.INTEGER, allowNull: false })
  declare price: number;

  @HasMany(() => FeedBack, { foreignKey: 'postId', onDelete: 'CASCADE' })
  feedBack: FeedBack[];
}
