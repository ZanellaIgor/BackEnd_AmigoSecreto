import { prismaSeed } from './prisma-Seed';

export async function CreateGroupsEvents() {
  const Groups = [
    {
      id: 1,
      id_event: 1,
      name: 'Meninos',
    },
    {
      id: 2,
      id_event: 1,
      name: 'Meninas',
    },
    {
      id: 3,
      id_event: 2,
      name: 'Familia do Paulo',
    },
    {
      id: 4,
      id_event: 2,
      name: 'Grupo da Franciele',
    },
    {
      id: 5,
      id_event: 3,
      name: 'Grupo da Franciele',
    },
  ];
  await prismaSeed.eventGroup.createMany({
    data: Groups,
  });
}
