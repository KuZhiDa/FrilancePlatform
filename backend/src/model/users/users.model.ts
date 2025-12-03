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

  @HasMany(() => RefreshToken, { foreignKey: 'id_user', onDelete: 'CASCADE' })
  refreshToken: RefreshToken[];

  @HasMany(() => orderProject, {
    foreignKey: 'executorId',
    onDelete: 'CASCADE',
  })
  projectAsExecutor: orderProject[];

  @HasMany(() => orderProject, {
    foreignKey: 'customerId',
    onDelete: 'CASCADE',
  })
  projectAsCustomer: orderProject[];

  @HasOne(() => Images, { foreignKey: 'id_user', onDelete: 'CASCADE' })
  image: Images;

  @HasOne(() => ProfilesExecutor, {
    foreignKey: 'id_user',
    onDelete: 'CASCADE',
  })
  profileExecutor: ProfilesExecutor;

  @HasMany(() => WorkInfoExecutor, {
    foreignKey: 'id_user',
    onDelete: 'CASCADE',
  })
  workInfoExecutor: WorkInfoExecutor[];

  @HasMany(() => FeedBack, { foreignKey: 'userId', onDelete: 'CASCADE' })
  feedBack: FeedBack[];
}
