import { Model, DataTypes } from 'sequelize';
import database from '../database';
import { PostModel } from './post';

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

UserModel.hasMany(PostModel, { foreignKey: 'author_id' });
User.sync();

export { UserModel };
