import { DataTypes } from "sequelize";
import sequelize from "../db";

const Map = sequelize.define(
  "Map",
  {
    resName: { type: DataTypes.STRING, primaryKey: true },
    infoName: { type: DataTypes.STRING, allowNull: false },
    raceType: { type: DataTypes.STRING, allowNull: true },
    author: { type: DataTypes.STRING, allowNull: true },
    description: { type: DataTypes.STRING, allowNull: true },
    playedCount: { type: DataTypes.BIGINT },
    lastTimePlayed: { type: DataTypes.BIGINT },
  },
  { tableName: "maps", timestamps: false }
);

export default Map;
