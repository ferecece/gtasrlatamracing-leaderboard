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
const getPlayerTimeRanks = async (playerId) => {
  const [tops] = await sequelize.query(
    `
    SELECT 
      SUM(CASE WHEN t.timeMs = (
          SELECT MIN(sub_t.timeMs) 
          FROM toptimes sub_t 
          WHERE sub_t.mapResName = t.mapResName
      ) THEN 1 ELSE 0 END) AS firstPlaceCount,
      
      SUM(CASE WHEN t.timeMs = (
          SELECT MIN(sub_t.timeMs) 
          FROM toptimes sub_t 
          WHERE sub_t.mapResName = t.mapResName
            AND sub_t.timeMs > (
                SELECT MIN(sub_t2.timeMs)
                FROM toptimes sub_t2 
                WHERE sub_t2.mapResName = t.mapResName
            )
      ) THEN 1 ELSE 0 END) AS secondPlaceCount,
      
      SUM(CASE WHEN t.timeMs = (
          SELECT MIN(sub_t.timeMs) 
          FROM toptimes sub_t 
          WHERE sub_t.mapResName = t.mapResName
            AND sub_t.timeMs > (
                SELECT MIN(sub_t2.timeMs)
                FROM toptimes sub_t2 
                WHERE sub_t2.mapResName = t.mapResName
            )
            AND sub_t.timeMs > (
                SELECT MIN(sub_t3.timeMs)
                FROM toptimes sub_t3 
                WHERE sub_t3.mapResName = t.mapResName
                  AND sub_t3.timeMs > (
                      SELECT MIN(sub_t4.timeMs)
                      FROM toptimes sub_t4 
                      WHERE sub_t4.mapResName = t.mapResName
                  )
            )
      ) THEN 1 ELSE 0 END) AS thirdPlaceCount
    FROM 
      toptimes t
    WHERE 
      t.playerId = ?;
    `,
    {
      replacements: [playerId],
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
        "country",
        "points",
        "skinId",
        "lastOnlineMs",
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
