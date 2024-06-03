# Amigo Secreto - Sistema de Sorteio Dinâmico

Projeto desenvolvido durante o curso da B7Web. Com um Front-End desenvolvido em Next.js, e um Backend Utilizando nodeJs com Prisma.
O sistema permite o cadastro de eventos de sorteio, que podem ser separados por grupos, ou não e também o cadastro de participantes com cpf para identificação, após isso, é possível realizar o sorteio, e após a geração do evento, é possível enviar o link para cada participante que devem digitar seu CPF para ter acesso à pessoa que tiraram no Amigo Secreto.

### Tecnologias Utilizadas no Back-End

-NodeJs
-Typescript
-Prisma
-Docker

### Requisitos

-Versão Node 18 ou superior;
-Docker Composer;

## Primeiros Passos

1. **Instale as Dependências**: Execute `npm install` ou `yarn` para instalar todas as dependências necessárias.

2. **Construa o Projeto**: Use `npm run build` ou `yarn build` para compilar o projeto.

3. **Inicie o Servidor de Desenvolvimento**: Execute `npm run dev` ou `yarn dev` para iniciar o servidor de desenvolvimento usando nodemon.

4. **Migração de Banco de Dados**: Para migrar o banco de dados, execute `npm run migrate:dev` ou `yarn migrate:dev`.

5. **Seed de Banco de Dados**: Para seed o banco de dados, execute `npm run migrate:seed` ou `yarn migrate:seed`.

6. **Acessar o Aplicativo**: Agora, você pode acessar o aplicativo no navegador ou através de ferramentas de teste como Postman ou Insomnia.

OBS: Para executar este projeto completamente, é necessário baixar também o projeto Front-End da aplicação, que fará a requisições com o este serviço..
Você pode baixar o projeto na área de repositórios do meu portfólio do github.

## ⏭️ Próximos passos

- Melhorar a documentação.
- Implementar validações de erros aprimoradas.
