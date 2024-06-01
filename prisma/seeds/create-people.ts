import { prismaSeed } from './prisma-Seed';

export async function CreatePeopleEvent() {
  const Peoples = [
    {
      id: 1,
      id_event: 1,
      id_group: 1,
      name: 'Paula Santos',
      cpf: '123456789',
    },

    {
      id: 2,
      id_event: 1,
      id_group: 1,
      name: 'Roberta',
      cpf: '223456789',
    },
    {
      id: 3,
      id_event: 1,
      id_group: 1,
      name: 'Francisca S',
      cpf: '323456789',
    },
    {
      id: 4,
      id_event: 1,
      id_group: 1,
      name: 'Joandra',
      cpf: '423456789',
    },
    {
      id: 5,
      id_event: 1,
      id_group: 2,
      name: 'Cleiton',
      cpf: '523456789',
    },
    {
      id: 6,
      id_event: 1,
      id_group: 2,
      name: 'Paulo S',
      cpf: '623456789',
    },
    {
      id: 7,
      id_event: 1,
      id_group: 2,
      name: 'Eduardo',
      cpf: '723456789',
    },
    {
      id: 8,
      id_event: 1,
      id_group: 2,
      name: 'Guilherme',
      cpf: '823456789',
    },
  ];

  await prismaSeed.eventPeople.createMany({
    data: Peoples,
  });
}
