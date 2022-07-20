import { Model, DataTypes } from 'sequelize';
import database from '../database';

class Post extends Model {
}

const PostModel = database.define('Post', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  author_id: { type: DataTypes.INTEGER },
  title: { type: DataTypes.STRING(255) },
  text: { type: DataTypes.STRING(255) },
  imageUrl: { type: DataTypes.STRING(255), allowNull: true },
  videoUrl: { type: DataTypes.STRING(255), allowNull: true },
}, {
  modelName: 'Post',
  tableName: 'posts',
  timestamps: false,
});

// PostModel.belongsTo(User, { foreignKey: 'author_id', targetKey: 'author_id' });

export { PostModel, Post };
