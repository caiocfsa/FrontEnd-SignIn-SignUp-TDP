


<h2 align="center">
    Pagina de Login e Cadastro TDP
</h2>


# Clonando Este Projeto

```
$ git clone https://github.com/caiocfsa/FrontEnd-SignIn-SignUp-TDP
```

# :warning: Requisitos 

Para executar este projeto todo, você precisa ter os pacotes instalados:

- [Node.js](https://nodejs.org/en/)
- [Yarn](https://legacy.yarnpkg.com/en/)

# :pushpin: Backend

- API  criada com Node.js

- Para o Banco de Dados usado PostgresSQL com TypeOrm

## ⚡️ 

- Para Usar está API você precisa ter o PostgresSQL, instalador[Docker](https://www.docker.com/)

-Se você não deseja instalar o DOCKER, use o convencional [Postgres](https://www.postgresql.org/download/)

### Rodando Postgres com DOCKER: 🐋

```
$ docker run --name some-postgres -e POSTGRES_PASSWORD=suasenha -d postgres
```

#### Se você já possui um contêiner no Postgres, execute:

```
$ docker start "NOME DO CONTAINER"
```

### Em um novo Terminal Execute:

```
$ cd api

$ yarn

$ yarn typeorm migration:run

$ yarn dev:server
```

### :boom: FrontEnd


- Para rodar o FrontEnd

```
$ cd web

$ yarn

$ yarn start
```
(Obs: Lembre de Deixar em Services/api a mesma do BackEnd)


###  Imagens da Aplicação
SignIn ( Login )
![enter image description here](https://i.imgur.com/24newGE.png)
SignUp ( Cadastro )
![enter image description here](https://i.imgur.com/zqgfRXS.png)

Feito por **Caio Fernando**
