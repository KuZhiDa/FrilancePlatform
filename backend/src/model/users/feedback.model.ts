import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { CustomerPost } from '../customer/post.model';
import { User } from '../users/users.model';

export interface FeedBackInterface {
  postId: number;
  userId: number;
}

@Table({ tableName: 'feedback' })
export class FeedBack extends Model<FeedBack, FeedBackInterface> {
  @ForeignKey(() => CustomerPost)
  @Column({ field: 'post_id', type: DataType.INTEGER, allowNull: false })
  declare postId: number;

  @ForeignKey(() => User)
  @Column({ field: 'user_id', type: DataType.INTEGER, allowNull: false })
  declare userId: number;

  @Column({
    field: 'suggested_price',
    type: DataType.INTEGER,
    allowNull: false,
  })
  declare suggestedPrice: number;

  @BelongsTo(() => User, 'userId')
  executor: User;

  @BelongsTo(() => CustomerPost, 'postId')
  post: CustomerPost;
}
