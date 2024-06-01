import { prismaSeed } from './prisma-Seed';

export async function CreateEvents() {
  const Events = [
    {
      id: 1,
      status: true,
      title: 'Aniversário do Fred',
      description: 'Amigo Secredo em comemoração ao Fred',
      grouped: true,
    },
    {
      id: 2,
      status: true,
      title: 'Natal da Paula',
      description: 'Natal em família - Paula',
      grouped: true,
    },
    {
      id: 3,
      status: false,
      title: 'Aniver João',
      description: 'Aniversário dos brothers',
      grouped: false,
    },
  ];
  await prismaSeed.event.createMany({
    data: Events,
  });
}
