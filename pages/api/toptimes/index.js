/* eslint-disable import/no-anonymous-default-export */
import { z } from "zod";
import { RaceMap, RaceToptime, Player } from "@lib/models";

const mapSchema = z.object({
  mapResName: z
    .string()
    .regex(
      /^[A-Z0-9]+-[A-Za-z0-9]+$/,
      "El nombre del mapa tiene un formato inválido."
    ),
});

export default async (req, res) => {
  const parsedQuery = mapSchema.safeParse(req.query);

  if (!parsedQuery.success) {
    const errorMessage = parsedQuery.error.errors[0].message;
    return res.status(400).json({ error: errorMessage });
  }

  try {
    const raceMap = await RaceMap.findOne({
      where: { resName: parsedQuery.data.mapResName },
      include: [
        {
          model: RaceToptime,
          as: "mapToptimes",
          required: false,
          attributes: ["timeMs", "dateRecorded"],
          include: [
            {
              model: Player,
              attributes: ["id", "name", "country", "skinID", "lastOnline"],
              as: "player",
            },
          ],
        },
      ],
    });

    if (!raceMap) {
      return res
        .status(404)
        .json({ error: "No se encuentra el mapa." });
    }

    raceMap.mapToptimes = raceMap.mapToptimes.sort(
      (a, b) => a.timeMs - b.timeMs
    );
    return res.status(200).json(raceMap);
  } catch (error) {
    console.error("Error interno del servidor:", error);
    return res.status(500).json({ error: "Error interno del servidor." });
  }
};
