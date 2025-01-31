import { DataTypes } from "sequelize";
import sequelize from "../db";

const Player = sequelize.define(
  "Player",
  {
    id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
    country: { type: DataTypes.STRING, allowNull: true },
    points: { type: DataTypes.INTEGER, defaultValue: 0 },
    skinId: { type: DataTypes.INTEGER, allowNull: true },
    vehiclePrimaryColor: { type: DataTypes.STRING, allowNull: true },
    vehicleSecondaryColor: { type: DataTypes.STRING, allowNull: true },
    lastOnlineMs: { type: DataTypes.STRING, allowNull: true },
  },
  { tableName: "players", timestamps: false }
);

export default Player;
