# Aplicação que faz requisições para API em [REQRES](https://reqres.in)

A aplicação faz requisições HTTP para API [REQRES](https://reqres.in), que é uma API pública de testes para desenvolvedores.


## Installation

1. Certifique-se de ter o Node.js instalado na sua máquina.
2. Faça o download da aplicação e abra em um editor de códigos como o Visual Studio Code
3. Acesse o console do editor e acesse o diretório raiz do projeto
4. Execute o comando: npm install
5. Na pasta raiz do projeto existe um arquivo chamado 'API.postman_collection.json'. Import este arquivo para seu Postman para poder executar as requisições HTTP.
6. Após finalizar a instalação da pasta 'node_modules', no console do editor de códigos inicie a aplicação executando o comando: npm run start
7. Caso pretenda adicionar breakpoints na aplicação, inicie a mesma com: npm run start:dev

### Obs

1. A aplicação será executada na porta 3000 (http://localhost:3000). Caso deseje, você pode definir uma nova porta em 'src/main.ts', na raiz do projeto.
2. Utilize o MongoDB Compass para visualizar o banco de dados. O caminho para o banco de dados pode ser alterdo no arquivo 'app.module.ts' em 'src/app.module.ts', na raiz do projeto.


## Uso da aplicação

Uma vez iniciada a aplicação, podemos utilizar o Postman para executar as requisições. O projeto possui 4 endpoints com as seguintes funcionalidades:

### @Post('/users')

Essa requisição faz uma chamada a API [REQRES](https://reqres.in) utilizando a biblioteca Axios. A API por sua vez retorna uma lista de usuários com seus respectivos dados. Os dados do usuário são guardados em um banco de dados não relacional, que é o MongoDB. O avatar do usuário também é guardado em base 64 no banco de dados e um arquivo com o avatar do usuário é criado no diretório 'Assets/AvatarImg', na raiz do projeto.

### @Get('/users/:id')

Neste caso é feita uma requisição a API [REQRES](https://reqres.in) informando o id de um usuário. A API em resposta retorna os dados do usuário requisitado. Os dados restornados podem ser visualizados no Postman

### @Get('/users/:id/avatar')

Esta requisição faz uma consulta ao banco de dados passando um id de usuário. Os dados do usuário são retornados, incluindo o avatar em base 64. Os dados podem ser visualizados no Postman

### @Delete('/users/:id/avatar')

Esta requisição apaga um usuário do banco de dados usando como critério o id informado. O arquivo com o avatar do usuário que havia sido criado no diretório em 'Assets/AvatarImg', na raiz do projeto, também é apagado.


## Test

Os testes unitários da aplicação foram alocados no diretório 'test', na raiz do projeto. O comando para executar os testes unitários é: npm run test

Também é possível criar um arquivo 'coverage' para visualizar a cobertura de testes utilizando o comando 'npm run test:cov' no console do editor de códigos.

## Support

E-mail: dionefernandes@gmail.com
Telegram: @dioneRfernandes
