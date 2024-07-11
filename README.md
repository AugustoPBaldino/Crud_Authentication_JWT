# Projeto Node.js com Express e MongoDB

## Arquitetura utilizada: RESTful

A arquitetura RESTful (Representational State Transfer) é um estilo de arquitetura de software que utiliza princípios da web para criar serviços web escaláveis, eficientes e interoperáveis. Baseada em uma série de restrições, RESTful promove a comunicação entre sistemas distribuídos de maneira padronizada e simplificada, onde cada recurso é identificado por um URI (Uniform Resource Identifier) e manipulado através de suas representações em formatos como JSON ou XML. Utiliza métodos HTTP convencionais, como GET, POST, PUT e DELETE, e adota uma abordagem stateless, onde cada requisição contém todas as informações necessárias para seu processamento, sem dependências de estado entre as requisições. A arquitetura RESTful oferece vantagens significativas, como escalabilidade, simplicidade, interoperabilidade e flexibilidade, tornando-se uma escolha popular para o desenvolvimento de APIs e serviços web modernos.

## Acesso para a documentação

### [Swagger](http://localhost:3000/api-docs/#/)

Obs: Biblioteca Postman na pasta Routes!

## Dependências

### [bcrypt](https://www.npmjs.com/package/bcrypt)
- **Versão:** ^5.1.1
- **Descrição:** Utilizado para hashing de senhas antes de armazená-las no banco de dados.

### [csv-writer](https://www.npmjs.com/package/csv-writer)
- **Versão:** ^1.6.0
- **Descrição:** Utilizado para gerar relatórios em formato CSV com dados dos usuários.

### [express](https://www.npmjs.com/package/express)
- **Versão:** ^4.19.2
- **Descrição:** Framework web para Node.js que facilita a criação de aplicações web e APIs.

### [express-validator](https://www.npmjs.com/package/express-validator)
- **Versão:** ^7.1.0
- **Descrição:** Middleware para validação e sanitização de dados de entrada em aplicações Express.

### [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)
- **Versão:** ^9.0.2
- **Descrição:** Utilizado para criar e verificar tokens JWT (JSON Web Tokens) para autenticação e autorização.

### [mongoose](https://www.npmjs.com/package/mongoose)
- **Versão:** ^8.5.0
- **Descrição:** Biblioteca de modelagem de dados para MongoDB e Node.js, proporcionando uma estrutura de schema para o banco de dados.

### [mongoose-sequence](https://www.npmjs.com/package/mongoose-sequence)
- **Versão:** ^6.0.1
- **Descrição:** Plugin para Mongoose que adiciona um campo de auto-incremento aos schemas.

### [nodemon](https://www.npmjs.com/package/nodemon)
- **Versão:** ^3.1.4
- **Descrição:** Ferramenta que reinicia automaticamente a aplicação Node.js quando detecta mudanças nos arquivos durante o desenvolvimento.

## Instalação

Para instalar todas as dependências listadas acima, execute:

```sh
npm install bcrypt csv-writer express express-validator jsonwebtoken mongoose mongoose-sequence nodemon

