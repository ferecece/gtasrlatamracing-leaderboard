import { Player } from "@lib/models";
import { Op } from "sequelize";

export default async function handler(req, res) {
  try {
    const players = await Player.findAll({
      //attributes: ["id", "name", "lastOnline", "country", "points", "skinID"],
      order: [["points", "DESC"]],
      raw: true,
    });

    const rankedPlayers = players.map((player, index) => ({
      ...player,
      rank: index + 1,
    }));

    res.status(200).json(rankedPlayers);
  } catch (error) {
    console.error("Error fetching top players:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
