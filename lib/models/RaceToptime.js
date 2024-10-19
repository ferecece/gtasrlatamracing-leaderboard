import { DataTypes } from 'sequelize';
import sequelize from '../db';
import Player from './Player';
import RaceMap from './RaceMap';

const RaceToptime = sequelize.define('RaceToptime', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  mapResName: {
    type: DataTypes.STRING,
    references: { model: RaceMap, key: 'resName' },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  },
  playerID: {
    type: DataTypes.INTEGER,
    references: { model: Player, key: 'id' },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  },
  timeMs: { type: DataTypes.INTEGER, allowNull: false },
  dateRecorded: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
}, { tableName: 'race_toptimes', timestamps: false });

export default RaceToptime;
