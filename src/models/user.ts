import { Model, DataTypes } from 'sequelize';
import database from '../database';

export default class User extends Model {
  public id?: number;

  public username!: string;

  public password!: string;

  public country?: string;
}

export const UserModel = User.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING(255),
  },
  password: {
    type: DataTypes.STRING(100),
  },
  country: {
    type: DataTypes.STRING(50),
    allowNull: true,
  },
}, {
  sequelize: database,
  modelName: 'User',
  tableName: 'users',
  timestamps: false,
});
User.sync();
