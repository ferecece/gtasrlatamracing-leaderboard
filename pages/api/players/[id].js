import { z } from "zod";
import { Player } from "@lib/models";
import sequelize from "@lib/db";
import { Sequelize } from "sequelize";

const playerIdSchema = z.object({
  id: z
    .string()
    .transform((val) => Number(val))
    .refine((n) => Number.isInteger(n) && n > 0, {
      message: "El ID debe ser un número entero positivo.",
    }),
});


// evil
const getPlayerTimeRanks = async (playerID) => {
  const [tops] = await sequelize.query(
    `
    SELECT 
      SUM(CASE WHEN rt.timeMs = (
          SELECT MIN(sub_rt.timeMs) 
          FROM race_toptimes sub_rt 
          WHERE sub_rt.mapResName = rt.mapResName
      ) THEN 1 ELSE 0 END) AS firstPlaceCount,
      
      SUM(CASE WHEN rt.timeMs = (
          SELECT MIN(sub_rt.timeMs) 
          FROM race_toptimes sub_rt 
          WHERE sub_rt.mapResName = rt.mapResName
            AND sub_rt.timeMs > (
                SELECT MIN(sub_rt2.timeMs)
                FROM race_toptimes sub_rt2 
                WHERE sub_rt2.mapResName = rt.mapResName
            )
      ) THEN 1 ELSE 0 END) AS secondPlaceCount,
      
      SUM(CASE WHEN rt.timeMs = (
          SELECT MIN(sub_rt.timeMs) 
          FROM race_toptimes sub_rt 
          WHERE sub_rt.mapResName = rt.mapResName
            AND sub_rt.timeMs > (
                SELECT MIN(sub_rt2.timeMs)
                FROM race_toptimes sub_rt2 
                WHERE sub_rt2.mapResName = rt.mapResName
            )
            AND sub_rt.timeMs > (
                SELECT MIN(sub_rt3.timeMs)
                FROM race_toptimes sub_rt3 
                WHERE sub_rt3.mapResName = rt.mapResName
                  AND sub_rt3.timeMs > (
                      SELECT MIN(sub_rt4.timeMs)
                      FROM race_toptimes sub_rt4 
                      WHERE sub_rt4.mapResName = rt.mapResName
                  )
            )
      ) THEN 1 ELSE 0 END) AS thirdPlaceCount
    FROM 
      race_toptimes rt
    WHERE 
      rt.playerID = ?;
    `,
    {
      replacements: [playerID],
      type: sequelize.QueryTypes.SELECT,
    }
  );

  return {
    firstPlaceCount: parseInt(tops.firstPlaceCount),
    secondPlaceCount: parseInt(tops.secondPlaceCount),
    thirdPlaceCount: parseInt(tops.thirdPlaceCount)
  };
};


// eslint-disable-next-line import/no-anonymous-default-export
export default async (req, res) => {
  try {
    const parsedQuery = playerIdSchema.parse(req.query);

    const player = await Player.findByPk(parsedQuery.id, {
      attributes: [
        "id",
        "name",
        "last_online",
        "country",
        "points",
        "skinID",
        [
          Sequelize.literal(`(
            SELECT COUNT(*) + 1 
            FROM players AS p2 
            WHERE p2.points > Player.points
          )`),
          "ranking",
        ],
      ],
      raw: true
    });  

    if (!player) {
      return res.status(404).json({ error: "Jugador no encontrado." });
    }

    const timeRanks = await getPlayerTimeRanks(parsedQuery.id);
    return res.status(200).json({ ...player, timeRanks });
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errorMessage = error.errors[0].message;
      return res.status(400).json({ error: errorMessage });
    }

    console.error("Error interno del servidor:", error);
    return res.status(500).json({ error: "Error interno del servidor." });
  }
};
