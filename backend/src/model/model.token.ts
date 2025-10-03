import { Column, DataType, ForeignKey, Model, PrimaryKey, Table } from "sequelize-typescript";
import { User } from "./model.user";

interface interfaceForToken{
    id_user: number
    token: string
}

@Table({ tableName: 'RefreshToken' })
export class RefreshToken extends Model<RefreshToken, interfaceForToken> {
	@Column({ type: DataType.SMALLINT, allowNull: false })
	@ForeignKey(() => User)
	declare id_user: number

	@Column({ type: DataType.STRING, unique: true, allowNull: false })
	declare token: string
}