import { RequestHandler } from 'express';
import * as groups from '../services/groups';
import { z } from 'zod';
export const getAll: RequestHandler = async (req, res) => {
  const { id_event } = req.params;
  const decodedIdEvent = decodeURIComponent(id_event);
  const items = await groups.getAll(parseInt(decodedIdEvent));

  if (items) return res.json({ groups: items });

  res.json({ error: 'Ocorreu um erro' });
};

export const getGroup: RequestHandler = async (req, res) => {
  const { id, id_event } = req.params;
  const goupItem = await groups.getOne({
    id: parseInt(id),
    id_event: parseInt(id_event),
  });

  if (goupItem) return res.json({ group: goupItem });

  res.json({ error: 'Ocorreu um erro' });
};

export const addGroup: RequestHandler = async (req, res) => {
  const { id_event } = req.params;
  const addGroupSchema = z.object({
    name: z.string(),
  });
  const body = addGroupSchema.safeParse(req.body);
  if (!body.success) return res.json({ error: 'Dados inválidos' });

  const newGroup = await groups.add({
    ...body.data,
    id_event: parseInt(id_event),
  });

  if (newGroup) return res.status(201).json({ group: newGroup });
  res.json({ error: 'Ocorreu um erro' });
};

export const updateGroup: RequestHandler = async (req, res) => {
  const { id, id_event } = req.params;
  const updateGroupSchema = z.object({
    name: z.string().optional(),
  });
  const body = updateGroupSchema.safeParse(req.body);
  if (!body.success) return res.json({ error: 'Dados inválidos' });
  const updatedGroup = await groups.update(
    { id: parseInt(id), id_event: parseInt(id_event) },
    body.data
  );
  if (updatedGroup) return res.json({ group: updatedGroup });
  res.json({ error: 'Ocorreu um erro' });
};

export const deleteGroup: RequestHandler = async (req, res) => {
  const { id, id_event } = req.params;
  const deltedGroup = await groups.remove({
    id: parseInt(id),
    id_event: parseInt(id_event),
  });
  if (deltedGroup) return res.json({ groups: deltedGroup });
  res.json({ error: 'Ocorreu um erro' });
};
