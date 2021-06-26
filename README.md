## Zip Code Challenge

### Sobre
Api desenvolvida para busca de CEPs brasileiros. Ao informar um CEP válido a api irá realizar a consulta no serviço [Via Cep](https://viacep.com.br/) e retornará os dados do endereço ao usuário. Caso o CEP informado não seja encontrado o serviço tentará buscar o próximo CEP alterando o último dígito diferente de zero para zero e irá repetir isso até encontrar um endereço ou esgotar todas as possíbilidades.
<br><br>
Os métodos disponíveis na Api, permitem cadastrar pontos de interesse com sua localização e horário de funcionamento, listar todos os pontos de interesse cadastrados e listar apenas pontos de interesse a uma distância desejada, exibindo ainda se estão abertos ou fechados.
<br>
Para a listagem dos pontos próximos, é utilizado o método de [distância euclidiana](https://pt.wikipedia.org/wiki/Dist%C3%A2ncia_euclidiana).
<br><br>

### Principais pontos
- Consulta de dados reais serviço rest;
- Autenticação por credenciais e requisição via token;
- Cache com Redis;
- Banco de dados NoSQL MongoDB;
- Senha protegida via função hash;
- Health Check;
- Logs estrutudados persistidos com elasticsearch;

### Requisitos
 - [Docker](https://docs.docker.com/)

### Principais Tecnologias Utilizadas
 - [TypeScript](https://www.typescriptlang.org/)
 - [NestJs](https://nestjs.com/)
 - [Jest](https://junit.org/junit5/)
 - [MongoDB](https://www.mongodb.com/)
 - [Redis](https://redis.io/)
 - [JWT](https://jwt.io/)
 - [Swagger](https://swagger.io/)
 - [Elastic Stack](https://www.elastic.co/pt/elastic-stack)

### Instalação
  1) Clone o projeto e acesse a pasta ```git clone https://github.com/luizcdev/zip-code-challenge.git```
  2) Rode o seguinte comando: ```docker-compose up```
     - Esse processo irá buildar o projeto, rodar os testes, configurar todas as dependências do projeto, por isso pode demorar alguns minutos.
  3) Após finalizar todo o processo, o sistema estará disponível para uso
  
### Documentação
  - Disponível através do link http://localhost:3000/doc

[Linkedin](https://www.linkedin.com/in/luizclaudiojau/)
