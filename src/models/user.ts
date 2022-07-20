import { Model, DataTypes } from 'sequelize';
import database from '../database';

export default class User extends Model {
  public id!: number;

  public username!: string;

  public password!: string;
}
const UserModel = User.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: { type: DataTypes.STRING(255) },
  password: { type: DataTypes.STRING(100) },
}, {
  sequelize: database,
  modelName: 'User',
  tableName: 'users',
  timestamps: false,
});

export { UserModel };
