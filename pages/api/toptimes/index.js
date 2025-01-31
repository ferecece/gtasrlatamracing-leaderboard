/* eslint-disable import/no-anonymous-default-export */
import { z } from "zod";
import { Map, Player, Toptime } from "@lib/models";

const mapSchema = z.object({
  mapResName: z
    .string()
    .regex(
      /^([A-Z][a-zA-Z0-9]*)(-[A-Z][a-zA-Z0-9]*)*$/,
      "El nombre del mapa debe estar en PascalCase y seguir el formato correcto."
    ),
});

export default async (req, res) => {
  try {
    const map = await Map.findOne({
      where: { resName: req.query.mapResName },
      include: [
        {
          model: Toptime,
          as: "mapToptimes",
          required: false,
          attributes: ["timeMs", "recordedAtMs"],
          include: [
            {
              model: Player,
              attributes: ["id", "name", "country", "skinId", "lastOnlineMs"],
              as: "player",
            },
          ],
        },
      ],
    });

    if (!map) {
      return res.status(404).json({ error: "No se encuentra el mapa." });
    }

    map.mapToptimes = map.mapToptimes.sort((a, b) => a.timeMs - b.timeMs);
    return res.status(200).json(map);
  } catch (error) {
    console.error("Error interno del servidor:", error);
    return res.status(500).json({ error: "Error interno del servidor." });
  }
};
