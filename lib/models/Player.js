import { DataTypes } from 'sequelize';
import sequelize from '../db';

const Player = sequelize.define('Player', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false },
  lastOnline: { type: DataTypes.DATE, allowNull: true },
  country: { type: DataTypes.STRING, allowNull: true },
  points: { type: DataTypes.INTEGER, defaultValue: 0 },
  skinID: { type: DataTypes.INTEGER, allowNull: true },
  vehiclePrimaryColor: { type: DataTypes.STRING, allowNull: true },
  vehicleSecondaryColor: { type: DataTypes.STRING, allowNull: true },
  password: { type: DataTypes.STRING, allowNull: false },
}, { tableName: 'players', timestamps: false });

export default Player;
