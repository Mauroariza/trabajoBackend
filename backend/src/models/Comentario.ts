// models/Comentario.ts
import { Sequelize, DataTypes, Model, Optional } from 'sequelize';

interface CommentAttributes {
  id: number;
  content: string;
  deviceId: number;
  createdAt?: Date; // Hacer que createdAt sea opcional
}

class Comment extends Model<CommentAttributes, Optional<CommentAttributes, 'id'>> implements CommentAttributes {
  public id!: number;
  public content!: string;
  public deviceId!: number;
  public createdAt!: Date;
}

export default function CommentFactory(sequelize: Sequelize) {
  Comment.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      deviceId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'devices',
          key: 'id'
        }
      },
      createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
      }
    },
    {
      sequelize,
      modelName: 'comment',
      timestamps: true // Asegúrate de que Sequelize maneje automáticamente createdAt y updatedAt
    }
  );

  return Comment;
}
