import { DataTypes } from "sequelize";
import sequelize from "../db";
import Player from "./Player";
import Map from "./Map";

const Toptime = sequelize.define(
  "Toptime",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    mapResName: {
      type: DataTypes.STRING,
      references: { model: Map, key: "resName" },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    playerId: {
      type: DataTypes.BIGINT,
      references: { model: Player, key: "id" },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    timeMs: { type: DataTypes.BIGINT, allowNull: false },
    recordedAtMs: { type: DataTypes.BIGINT },
  },
  { tableName: "toptimes", timestamps: false }
);

export default Toptime;