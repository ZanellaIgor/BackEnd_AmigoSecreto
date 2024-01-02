import { RequestHandler } from 'express-serve-static-core';
import * as people from '../services/people';
import { z } from 'zod';
export const getAll: RequestHandler = async (req, res) => {
  const { id_event, id_group } = req.params;
  const items = await people.getAll({
    id_event: parseInt(id_event),
    id_group: parseInt(id_group),
  });
  if (items) return res.json({ people: items });
  res.json({ error: 'Ocorreu um erro' });
};

export const getPerson: RequestHandler = async (req, res) => {
  const { id_event, id_group, id } = req.params;
  const personItem = await people.getOne({
    id_event: parseInt(id_event),
    id_group: parseInt(id_group),
    id: parseInt(id),
  });
  if (personItem) return res.json({ people: personItem });
  res.json({ error: 'Ocorreu um erro' });
};

export const addPerson: RequestHandler = async (req, res) => {
  const { id_event, id_group } = req.params;
  const addPersonSchema = z.object({
    name: z.string(),
    cpf: z.string().transform((val) => val.replace(/\.|-/gm, '')),
  });
  const body = addPersonSchema.safeParse(req.body);
  if (!body.success) return res.json({ error: 'Dados inválidos' });

  const newPerson = await people.add({
    name: body.data.name,
    cpf: body.data.cpf,
    id_event: parseInt(id_event),
    id_group: parseInt(id_group),
  });
  if (newPerson) return res.status(201).json({ person: newPerson });
};

export const updatePerson: RequestHandler = async (req, res) => {
  const { id_event, id_group, id } = req.params;
  const updatePersonSchema = z.object({
    name: z.string().optional(),
    cpf: z
      .string()
      .transform((val) => val.replace(/\.|-/gm, ''))
      .optional(),
    matched: z.string().optional(),
  });
  const body = updatePersonSchema.safeParse(req.body);
  if (!body.success) return res.json({ error: 'Dados inválidos' });
};
