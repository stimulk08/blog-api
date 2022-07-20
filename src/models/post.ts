import { Model, DataTypes } from 'sequelize';
import database from '../database';

class Post extends Model {
  public id?: number;

  public author_id!: number;

  public title!: string;

  public text?: string;
}

const PostModel = Post.init({
  id: {
    type: DataTypes.BIGINT.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
  },
  author_id: { type: DataTypes.BIGINT.UNSIGNED },
  title: { type: DataTypes.STRING(255) },
  text: { type: DataTypes.STRING(255) },
  imageUrl: { type: DataTypes.STRING(255), allowNull: true },
  videoUrl: { type: DataTypes.STRING(255), allowNull: true },
}, {
  sequelize: database,
  modelName: 'Post',
  tableName: 'posts',
  timestamps: false,
});

// PostModel.belongsTo(UserModel);
// Post.sync();

export { PostModel, Post };
