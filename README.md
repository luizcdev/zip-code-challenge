## Zip Code Challenge

### Sobre

Api desenvolvida para busca de CEPs brasileiros. Ao informar um CEP válido a api irá realizar a consulta no serviço [Via Cep](https://viacep.com.br/) e retornará os dados do endereço ao usuário. Caso o CEP informado não seja encontrado o serviço tentará buscar o próximo CEP alterando o último dígito diferente de zero para zero e irá repetir isso até encontrar um endereço ou esgotar todas as possibilidades.
O projeto conta com persistência de logs estruturados para todas as requisições http recebidas e também para todas as exceções "levantadas" durante a execução.

### Principais pontos

- Consulta de dados reais via serviço rest;
- Autenticação por credenciais e requisição via token;
- Cache com Redis;
- Banco de dados NoSQL MongoDB;
- Senha protegida via função hash;
- Health Check;
- Logs estrutudados persistidos com elasticsearch.

### Requisitos

- [Docker](https://docs.docker.com/)

### Principais Tecnologias Utilizadas

- [Node.js](https://nodejs.org/en/)
- [TypeScript](https://www.typescriptlang.org/)
- [NestJs](https://nestjs.com/)
- [Jest](https://junit.org/junit5/)
- [MongoDB](https://www.mongodb.com/)
- [Redis](https://redis.io/)
- [JWT](https://jwt.io/)
- [Swagger](https://swagger.io/)
- [Elastic Stack](https://www.elastic.co/pt/elastic-stack)

### Instalação

1. Clone o projeto e acesse a pasta `git clone https://github.com/luizcdev/zip-code-challenge.git`
2. Renomeie copie o arquivo .env.example para um novo chamado .env e altere algum valor se necessário.
3. Rode o seguinte comando: `docker-compose up`
   - Esse processo irá buildar o projeto, rodar os testes, configurar todas as dependências do projeto, por isso pode demorar alguns minutos.
4. Após finalizar todo o processo, o sistema estará disponível para uso

### Links

- Rota Base: http://localhost:3000/api
- Documentação: http://localhost:3000/doc
- Health Check: http://localhost:3000/api/health
- Kibana: http://localhost:5601

### Utilizando o projeto

- Por padrão o serviço cria um usuário com as credenciais ``{"username": "admin", "password": "admin"}```
- Para vizualizar os logs no kibana é necessário realizar ao menos uma chamada à api e depois criar o índice do projeto dentro do kibana, por padrão o índice é zipcode.

### Criando índice no kibana

1. Primeiramente realize ao menos uma requisição http à api zip-code-challenge;
2. Acesse o kibana pelo navegador;
3. Clique no ícone do menu no canto superior esquerdo;
4. Clique em "Discover";
5. Cloque no botão "Create index pattern";
6. No campo index pattern name, digite o nome do índie, que por padrão é "zipcode";
7. O índice da aplicação irá aparecer listado abaixo e o botão "Nest step" será habilitado, clique nele;
8. No campo "Time field" escolha o campo date;
9. Por fim clique em "Create index pattern e pronto, seu índice estará criado".

### Desenvolvimento do projeto

Para o projeto foi utilizado Node.js por ser consolidado no mercado para desenvolvimento de serviços altamente escalável, TypeScrypt e NestJs por atenderem os requisitos e para realizar uma experimentação do framework NestJS.
Durante o desenvolvimento boas práticas de programação foram adotadas, seguindo os princípios de SOLID e Clean Code, também foram impregados vários conceitos, padrões de projeto e técnicas como Filter, ExceptionHandlers, Middlewares, Seeders, Injeção de dependência, Generics, Testes Unitários e Teste Coverage.

### Sugestões de melhoria

- Aumentar a cobertura de testes para próximo de 100%;
- Incluir testes e2e utilizando testcontainners para testar as integrações entre módulos e dependências do sistema;
- Enriquecer a aplicação com logs principalmente com cálculo de latência do client;
- Criação automática do índice no kibana;

</br></br>
[Meu Linkedin](https://www.linkedin.com/in/luizclaudiojau/)
