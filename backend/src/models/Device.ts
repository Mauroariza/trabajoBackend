import { Sequelize, DataTypes, Model, Optional } from 'sequelize';

// Definimos los atributos del modelo
interface DeviceAttributes {
  id: number;
  name: string;
  description: string;
  details: string;
  imageUrl: string;
}

// Extendemos la clase Model con los atributos definidos
class Device extends Model<DeviceAttributes, Optional<DeviceAttributes, 'id'>> implements DeviceAttributes {
  public id!: number;
  public name!: string;
  public description!: string;
  public details!: string;
  public imageUrl!: string;
}

export default function DeviceFactory(sequelize: Sequelize) {
  Device.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false // Campo obligatorio
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false // Campo obligatorio
      },
      details: {
        type: DataTypes.TEXT,
        allowNull: false // Campo obligatorio
      },
      imageUrl: {
        type: DataTypes.STRING,
        allowNull: false // Campo obligatorio
      }
    },
    {
      sequelize,
      modelName: 'device'
    }
  );

  return Device;
}