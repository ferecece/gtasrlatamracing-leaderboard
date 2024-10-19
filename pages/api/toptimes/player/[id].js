import { RaceToptime, RaceMap } from '@lib/models';
import { Sequelize } from 'sequelize';
import { z } from 'zod';

const playerIDSchema = z.string().regex(/^\d+$/).transform(Number).refine((n) => n > 0, {
  message: 'El playerID debe ser un entero positivo.',
});

export default async function handler(req, res) {
  try {
    const { id } = req.query;
    const playerID = playerIDSchema.parse(id);

    const timesByPlayer = await RaceToptime.findAll({
      where: { playerID },
      include: [
        {
          model: RaceMap,
          as: 'raceMap',
          attributes: ['infoName', 'resName', 'author', 'playedCount'],
        },
      ],
      attributes: {
        include: [
          [
            Sequelize.literal(`
              (
                SELECT COUNT(*)
                FROM race_toptimes AS sub_rt
                WHERE sub_rt.mapResName = RaceToptime.mapResName
                AND sub_rt.timeMs < RaceToptime.timeMs
              ) + 1
            `),
            'position',
          ],
        ],
        exclude: ['id', 'playerID', 'mapResName']
      },
      order: [['dateRecorded', 'DESC']],
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
