import { Toptime, Player, Map } from '@lib/models';
import { Sequelize } from 'sequelize';

export default async function handler(req, res) {
  try {
    const recentToptimes = await Toptime.findAll({
      include: [
        {
          model: Player,
          as: "player"
        },
        {
          model: Map,
          as: "map"
        },
      ],
      attributes: {
        include: [
          [
            Sequelize.literal(`
              (
                SELECT COUNT(*)
                FROM toptimes AS sub_rt
                WHERE sub_rt.mapResName = Toptime.mapResName
                AND sub_rt.timeMs < Toptime.timeMs
              ) + 1
            `),
            'position',
          ],
        ],
        exclude: ['id', 'playerId', 'mapResName']
      },
      order: [['recordedAtMs', 'DESC']],
      limit: 10,
    });

    res.status(200).json(recentToptimes);
  } catch (error) {
    console.error('Error fetching recent toptimes:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}