import { Model, InferAttributes, InferCreationAttributes, DataTypes, CreationOptional  } from 'sequelize';
import { connection } from '../connection'

class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
  declare id: CreationOptional<string>;
  declare names: string;
  declare lastnames: string;
  declare email: string;
  declare password: string;

  declare readonly createdAt: CreationOptional<Date>;
  declare readonly updatedAt: CreationOptional<Date>;
}

User.init({
  id: { type: DataTypes.UUIDV4, primaryKey: true },
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

export { User }