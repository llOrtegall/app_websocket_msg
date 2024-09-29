import { Model, DataTypes, Optional  } from 'sequelize';
import { connection } from '../connection'

interface MessagesAttributes {
  id: string;
  sender: string;
  recipient: string;
  text: string;
  createdAt: Date;
  updatedAt: Date;
}

interface MessagesCreationAttributes extends Optional<MessagesAttributes, 'id' | 'createdAt' | 'updatedAt'> {}

class MessageModel extends Model<MessagesAttributes, MessagesCreationAttributes> {
  declare id: string;
  declare sender: string;
  declare recipient: string;
  declare text: string;

  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;
}

MessageModel.init({
  id: { type: DataTypes.STRING, primaryKey: true, defaultValue: DataTypes.UUIDV4},
  sender: { type: DataTypes.STRING, allowNull: false },
  recipient: { type: DataTypes.STRING, allowNull: false },
  text: { type: DataTypes.STRING, allowNull: false },
  createdAt: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
  updatedAt: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW }
}, {
  sequelize: connection,
  tableName: 'messages',
  underscored: true
})

export { MessageModel }