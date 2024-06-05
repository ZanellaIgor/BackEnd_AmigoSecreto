import { Prisma, PrismaClient } from '@prisma/client';
import { encryptMatch } from '../../src/utils/match';
import * as people from './people';

const prisma = new PrismaClient();
export const getAll = async () => {
  try {
    return await prisma.event.findMany();
  } catch (err) {
    return false;
  }
};

export const getOne = async (id: number) => {
  try {
    return await prisma.event.findFirst({ where: { id } });
  } catch (err) {
    return false;
  }
};

type EventsCreateData = Prisma.Args<typeof prisma.event, 'create'>['data'];
export const add = async (data: EventsCreateData) => {
  try {
    return await prisma.event.create({
      data,
    });
  } catch (err) {
    return false;
  }
};
type EventsUpdateData = Prisma.Args<typeof prisma.event, 'update'>['data'];
export const update = async (id: number, data: EventsUpdateData) => {
  try {
    return await prisma.event.update({ where: { id }, data });
  } catch (err) {
    return false;
  }
};

export const remove = async (id: number) => {
  try {
    return await prisma.event.delete({ where: { id } });
  } catch (err) {
    return false;
  }
};

export const doMatches = async (id: number): Promise<boolean> => {
  const eventItem = await prisma.event.findFirst({
    where: { id },
    select: { grouped: true },
  });

  if (!eventItem) return false;

  const peopleList = await people.getAll({ id_event: id });
  if (!peopleList) return false;

  let sortedList: { id: number; match: number }[] = [];
  let attempts = 0;
  const maxAttempts = peopleList.length * 5;
  let success = false;

  while (!success && attempts < maxAttempts) {
    attempts++;
    sortedList = [];
    let sortable = peopleList.map((item) => item.id);
    success = true;

    for (let person of peopleList) {
      let sortableFiltered = sortable.filter((id) => {
        if (eventItem.grouped) {
          const sortablePerson = peopleList.find((item) => item.id === id);
          return person.id_group !== sortablePerson?.id_group;
        }
        return true;
      });
      if (
        sortableFiltered.length === 0 ||
        (sortableFiltered.length === 1 && person.id === sortableFiltered[0])
      ) {
        success = false;
        break;
      } else {
        const sortedIndex = Math.floor(Math.random() * sortableFiltered.length);
        const match = sortableFiltered[sortedIndex];

        sortedList.push({
          id: person.id,
          match: match,
        });

        sortable = sortable.filter((item) => item !== match);
      }
    }
  }

  if (success) {
    for (const item of sortedList) {
      await people.update(
        {
          id: item.id,
          id_event: id,
        },
        { matched: encryptMatch(item.match) }
      );
    }
    return true;
  }
  return false;
};
