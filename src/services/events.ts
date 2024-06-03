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
  if (eventItem) {
    const peopleList = await people.getAll({ id_event: id });
    if (peopleList) {
      let sortedList: { id: number; match: number }[] = [];
      let sortable: number[] = [];
      let attemtps = 0;
      let maxAttempts = peopleList.length * 5;
      let keepTryng = true;
      while (keepTryng && attemtps < maxAttempts) {
        keepTryng = false;
        attemtps++;
        sortedList = [];
        sortable = peopleList.map((item) => item.id);

        for (let i in peopleList) {
          let sortableFiltered: number[] = sortable;
          if (eventItem.grouped) {
            sortableFiltered = sortableFiltered.filter((sortableItem) => {
              let sortablePerson = peopleList.find(
                (item) => item.id === sortableItem
              );
              return peopleList[i].id_group !== sortablePerson?.id_group;
            });
          }
          if (
            sortableFiltered.length === 0 ||
            (sortableFiltered.length === 1 &&
              peopleList[i].id === sortableFiltered[0])
          ) {
            keepTryng = true;
          } else {
            let sortedIndex = Math.floor(
              Math.random() * sortableFiltered.length
            );
            while (sortableFiltered[sortedIndex] === peopleList[i].id) {
              sortedIndex = Math.floor(Math.random() * sortableFiltered.length);
            }
            sortedList.push({
              id: peopleList[id].id,
              match: sortableFiltered[sortedIndex],
            });
            sortable = sortable.filter(
              (item) => item !== sortableFiltered[sortedIndex]
            );
          }
        }
      }

      if (attemtps < maxAttempts) {
        for (let i in sortedList) {
          await people.update(
            {
              id: sortedList[i].id,
              id_event: id,
            },
            { matched: encryptMatch(sortedList[i].match) }
          );
          return true;
        }
      }
    }
  }
  return false;
};
