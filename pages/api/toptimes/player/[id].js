import { Toptime, Map } from '@lib/models';
import { Sequelize } from 'sequelize';
import { z } from 'zod';

const playerIdSchema = z.string().regex(/^\d+$/).transform(Number).refine((n) => n > 0, {
  message: 'El ID del Jugador debe ser un número entero positivo.',
});

export default async function handler(req, res) {
  try {
    const { id } = req.query;
    const playerId = playerIdSchema.parse(id);

    const timesByPlayer = await Toptime.findAll({
      where: { playerId },
      include: [
        {
          model: Map,
          as: 'map'
        },
      ],
      attributes: {
        include: [
          [
            Sequelize.literal(`
              (
                SELECT COUNT(*)
                FROM toptimes AS sub_t
                WHERE sub_t.mapResName = Toptime.mapResName
                AND sub_t.timeMs < Toptime.timeMs
              ) + 1
            `),
            'position',
          ],
        ],
        exclude: ['id', 'playerId', 'mapResName']
      },
      order: [['recordedAtMs', 'DESC']],
      raw: true,
      nest: true
    });

    res.status(200).json(timesByPlayer);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.errors[0].message });
    }
    console.error('Error fetching times by player:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
