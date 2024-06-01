import { CreateEvents } from './create-events';
import { CreateGroupsEvents } from './create-groups';
import { CreatePeopleEvent } from './create-people';
import { prismaSeed } from './prisma-Seed';

async function main() {
  await CreateEvents();
  console.log(tableCreated('Events'));
  await CreateGroupsEvents();
  console.log(tableCreated('GroupsEvents'));
  await CreatePeopleEvent();
  console.log(tableCreated('People Events'));
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prismaSeed.$disconnect();
  });

function tableCreated(table: string) {
  return `Tabela ${table} criada com sucesso`;
}
