import { RaceToptime, Player, RaceMap } from '@lib/models';
import { Sequelize } from 'sequelize';

export default async function handler(req, res) {
  try {
    const recentToptimes = await RaceToptime.findAll({
      include: [
        {
          model: Player,
          attributes: ['id', 'name', 'country', 'skinID'],
          as: "player"
        },
        {
          model: RaceMap,
          attributes: ['infoName', 'resName', 'author', 'playedCount'],
          as: "raceMap"
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
      limit: 10,
    });

    res.status(200).json(recentToptimes);
  } catch (error) {
    console.error('Error fetching recent toptimes:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}