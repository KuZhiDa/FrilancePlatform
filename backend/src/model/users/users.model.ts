import {
  Column,
  DataType,
  HasMany,
  HasOne,
  Model,
  Table,
} from 'sequelize-typescript';
import { RefreshToken } from './token.model';
import { orderProject } from './project.model';
import { Images } from './image.model';
import { ProfilesExecutor } from '../executor/profiles.model';
import { WorkInfoExecutor } from '../executor/work_Info/work_info.model';
import { FeedBack } from '../users/feedback.model';
import { CustomerPost } from '../customer/post.model';

interface userInterface {
  username: string;
  email: string;
  phoneNumber?: string;
  password: string;
  is2Fa: boolean;
}

@Table({ tableName: 'users' })
export class User extends Model<User, userInterface> {
  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  declare username: string;

  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  declare email: string;

  @Column({
    field: 'phone_number',
    type: DataType.STRING,
    unique: true,
    allowNull: true,
  })
  declare phoneNumber: string;

  @Column({ type: DataType.STRING, allowNull: false })
  declare password: string;

  @Column({ field: 'is_activate', type: DataType.BOOLEAN, defaultValue: false })
  declare isActivate: boolean;

  @Column({ field: 'is_2fa', type: DataType.BOOLEAN, defaultValue: false })
  declare is2Fa: boolean;

  @Column({ type: DataType.INTEGER, defaultValue: 0 })
  declare rating_count: number;

  @Column({ type: DataType.INTEGER, defaultValue: 0 })
  declare rating_sum: number;

  @HasMany(() => RefreshToken, {
    foreignKey: 'id_user',
    onDelete: 'CASCADE',
    hooks: true,
  })
  refreshToken: RefreshToken[];

  @HasMany(() => orderProject, {
    foreignKey: 'id_executor',
    onDelete: 'CASCADE',
    hooks: true,
  })
  projectAsExecutor: orderProject[];

  @HasMany(() => orderProject, {
    foreignKey: 'id_customer',
    onDelete: 'CASCADE',
    hooks: true,
  })
  projectAsCustomer: orderProject[];

  @HasOne(() => Images, {
    foreignKey: 'id_user',
    onDelete: 'CASCADE',
    hooks: true,
  })
  image: Images;

  @HasOne(() => ProfilesExecutor, {
    foreignKey: 'id_user',
    onDelete: 'CASCADE',
    hooks: true,
  })
  profileExecutor: ProfilesExecutor;

  @HasMany(() => WorkInfoExecutor, {
    foreignKey: 'id_user',
    onDelete: 'CASCADE',
    hooks: true,
  })
  workInfoExecutor: WorkInfoExecutor[];

  @HasMany(() => FeedBack, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE',
    hooks: true,
  })
  feedBack: FeedBack[];

  @HasMany(() => CustomerPost, {
    foreignKey: 'id_user',
    onDelete: 'CASCADE',
    hooks: true,
  })
  customerPost: CustomerPost[];
}
