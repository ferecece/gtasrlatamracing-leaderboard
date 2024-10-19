import { DataTypes } from 'sequelize';
import sequelize from '../db';

const RaceMap = sequelize.define('RaceMap', {
  resName: { type: DataTypes.STRING, primaryKey: true },
  infoName: { type: DataTypes.STRING, allowNull: false },
  author: { type: DataTypes.STRING, allowNull: true },
  playedCount: { type: DataTypes.INTEGER, defaultValue: 0 },
  lastTimePlayed: { type: DataTypes.BIGINT, defaultValue: 0 },
}, { tableName: 'race_maps', timestamps: false });

export default RaceMap;
