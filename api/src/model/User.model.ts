import { Model, DataTypes, Optional  } from 'sequelize';
import { User } from '../schemas/User.schema'
import { connection } from '../connection'

interface UserAttributes extends User {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

type UserCreationAttributes = Optional<UserAttributes, 'id' | 'createdAt' | 'updatedAt'>;

class UserModel extends Model<UserAttributes, UserCreationAttributes> {
  declare id: string;
  declare names: string;
  declare lastnames: string;
  declare email: string;
  declare password: string;

  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;
}

UserModel.init({
  id: { type: DataTypes.STRING, primaryKey: true, defaultValue: DataTypes.UUIDV4},
  names: { type: DataTypes.STRING(40), allowNull: false },
  lastnames: { type: DataTypes.STRING(40), allowNull: false,  },
  email: { type: DataTypes.STRING(150), allowNull: false, unique: true },
  password: { type: DataTypes.STRING(120), allowNull: false },
  createdAt: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
  updatedAt: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW }
}, {
  sequelize: connection,
  tableName: 'users',
  underscored: true
})

export { UserModel }