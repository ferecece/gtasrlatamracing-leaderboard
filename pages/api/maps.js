import { Map } from '@lib/models';
import { Op } from 'sequelize';
import { z } from 'zod';

const searchSchema = z
  .object({
    search: z
      .string()
      .max(50, 'El parámetro search no puede tener más de 50 caracteres.')
      .optional(),
  })
  .refine((data) => !data.search || data.search.trim().length > 0, {
    message: 'El parámetro search no puede ser una cadena vacía.',
  });

export default async function handler(req, res) {
  try {
    const { search } = searchSchema.parse(req.query);

    const whereClause = search
      ? { infoName: { [Op.like]: `%${search}%` } }
      : {};

    const maps = await Map.findAll({
      where: whereClause,
      raw: true
    });

    res.status(200).json(maps);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.errors[0].message });
    }
    console.error('Error fetching maps:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}