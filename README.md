## CoreSync ERP

## 📌 Introduction

CoreSync ERP is a web-based ERP system that is designed to help businesses manage their operations more efficiently. It is a comprehensive solution that covers all aspects of a business, including accounting, inventory management, sales, and customer relationship management. CoreSync ERP is easy to use and can be customized to meet the specific needs of your business.

## 📝 Requirements

- Node.js (version 20)

## 🔍Technologies

- **PostgreSQL** for database.
- **NestJS** for server.
- **Prisma** for database connection.
- **Swagger** for API documentation.
- **Conventional Commits** for commit message convention.
- **TypeScript** for type safety.

## 📚 Environment variables

To run this project, you will need to add the following environment variables to your .env

`DATABASE_URL="file:./dev.db"`

`JWT_SECRET="SECRET KEY"`

`FRONTEND_URL="http://localhost:3001"`

## 💻 Features

- **User Management**: Create, update and delete users with different roles and permissions. Assign user to multiple companies or projects.
- **Company Management**: Create, update and delete companies. Assign users to companies. Manage company settings such as currency, language, and time zone.
- **Project Management**: Create, update and delete projects. Assign users to projects. Manage project settings such as start date, end date, and budget.
- **Customer Management**: Create, update and delete customers. Assign customers to projects. Manage customer settings such as contact information, billing address, and shipping address.
- **CRM Management**: Create, update and delete CRM records. Assign CRM records to customers. Manage CRM settings such as contact information, notes, and follow-up dates.
- **Logistics Management**: Create, update and delete logistics records. Assign logistics records to projects. Manage logistics settings such as shipping information, tracking number, and delivery date.
- **Meeting Management**: Create, update and delete meetings. Assign meetings to users. Manage meeting settings such as start date, end date, and location.
- **Product Management**: Create, update and delete products. Assign products to projects. Manage product settings such as name, description, and price.
- **Production Management**: Create, update and delete production records. Assign production records to projects. Manage production settings such as start date, end date, and quantity.
- **Role Management**: Create, update and delete roles. Assign roles to users. Manage role settings such as name, description, and permissions.

## 📘 Documentação da API

#### Retorna todas as companys

```http
  GET /api/v1/company
```

| Parâmetro | Tipo     | Descrição                           |
| :-------- | :------- | :---------------------------------- |
| `api_key` | `string` | **Obrigatório**. A chave da sua API |

#### Cria uma company

```http
  POST /api/v1/company/create
```

| Parâmetro     | Tipo     | Descrição                                      |
| :------------ | :------- | :--------------------------------------------- |
| `dataCompany` | `Objeto` | Objeto contendo todos os atributos da company. |

#### Atualizar uma company

```http
  PUT /api/v1/company/update/${id}
```

| Parâmetro     | Tipo     | Descrição                                                      |
| :------------ | :------- | :------------------------------------------------------------- |
| `id`          | `string` | **Obrigatório**. O ID do item que você quer                    |
| `dataCompany` | `Objeto` | Objeto contendo os atributos que serão atualizados de company. |

#### Deletar uma company

```http
  DELETE /api/v1/company/delete/${id}
```

| Parâmetro | Tipo     | Descrição                                            |
| :-------- | :------- | :--------------------------------------------------- |
| `id`      | `string` | **Obrigatório**. O ID do item que você quer deletar. |

#### Retorna todas as CRM

```http
  GET /api/v1/crm
```

| Parâmetro | Tipo     | Descrição                           |
| :-------- | :------- | :---------------------------------- |
| `api_key` | `string` | **Obrigatório**. A chave da sua API |

#### Retorna um item

```http
  GET /api/v1/crm/${id}
```

| Parâmetro | Tipo     | Descrição                                   |
| :-------- | :------- | :------------------------------------------ |
| `id`      | `string` | **Obrigatório**. O ID do item que você quer |

#### Cria uma CRM

```http
  POST /api/v1/crm/create
```

| Parâmetro | Tipo     | Descrição                                  |
| :-------- | :------- | :----------------------------------------- |
| `dataCRM` | `Objeto` | Objeto contendo todos os atributos da CRM. |

#### Atualizar uma CRM

```http
  PUT /api/v1/crm/update/${id}
```

| Parâmetro | Tipo     | Descrição                                                  |
| :-------- | :------- | :--------------------------------------------------------- |
| `id`      | `string` | **Obrigatório**. O ID do item que você quer                |
| `dataCRM` | `Objeto` | Objeto contendo os atributos que serão atualizados de CRM. |

#### Deletar uma CRM

```http
  DELETE /api/v1/crm/delete/${id}
```

| Parâmetro | Tipo     | Descrição                                            |
| :-------- | :------- | :--------------------------------------------------- |
| `id`      | `string` | **Obrigatório**. O ID do item que você quer deletar. |

#### Retorna todos os Customers

```http
  GET /api/v1/customer
```

| Parâmetro | Tipo     | Descrição                           |
| :-------- | :------- | :---------------------------------- |
| `api_key` | `string` | **Obrigatório**. A chave da sua API |

#### Retorna um item

```http
  GET /api/v1/customer/${id}
```

| Parâmetro | Tipo     | Descrição                                   |
| :-------- | :------- | :------------------------------------------ |
| `id`      | `string` | **Obrigatório**. O ID do item que você quer |

#### Cria um Customer

```http
  POST /api/v1/customer/create
```

| Parâmetro      | Tipo     | Descrição                                       |
| :------------- | :------- | :---------------------------------------------- |
| `dataCustomer` | `Objeto` | Objeto contendo todos os atributos do customer. |

#### Atualizar um Customer

```http
  PUT /api/v1/customer/update/${id}
```

| Parâmetro      | Tipo     | Descrição                                                       |
| :------------- | :------- | :-------------------------------------------------------------- |
| `id`           | `string` | **Obrigatório**. O ID do item que você quer                     |
| `dataCustomer` | `Objeto` | Objeto contendo os atributos que serão atualizados do customer. |

#### Deletar um Customer

```http
  DELETE /api/v1/customer/delete/${id}
```

| Parâmetro | Tipo     | Descrição                                            |
| :-------- | :------- | :--------------------------------------------------- |
| `id`      | `string` | **Obrigatório**. O ID do item que você quer deletar. |

#### Retorna todas as logisticas

```http
  GET /api/v1/logistics
```

| Parâmetro | Tipo     | Descrição                           |
| :-------- | :------- | :---------------------------------- |
| `api_key` | `string` | **Obrigatório**. A chave da sua API |

#### Retorna um item

```http
  GET /api/v1/logistics/${id}
```

| Parâmetro | Tipo     | Descrição                                   |
| :-------- | :------- | :------------------------------------------ |
| `id`      | `string` | **Obrigatório**. O ID do item que você quer |

#### Cria uma logistica

```http
  POST /api/v1/logistics/create
```

| Parâmetro      | Tipo     | Descrição                                        |
| :------------- | :------- | :----------------------------------------------- |
| `dataLogistic` | `Objeto` | Objeto contendo todos os atributos de logistica. |

#### Atualizar uma logistica

```http
  PUT /api/v1/logistics/update/${id}
```

| Parâmetro      | Tipo     | Descrição                                                        |
| :------------- | :------- | :--------------------------------------------------------------- |
| `id`           | `string` | **Obrigatório**. O ID do item que você quer                      |
| `dataLogistic` | `Objeto` | Objeto contendo os atributos que serão atualizados de logistica. |

#### Deletar uma logistica

```http
  DELETE /api/v1/logistics/delete/${id}
```

| Parâmetro | Tipo     | Descrição                                            |
| :-------- | :------- | :--------------------------------------------------- |
| `id`      | `string` | **Obrigatório**. O ID do item que você quer deletar. |

#### Retorna todas as Meetings

```http
  GET /api/v1/meeting
```

| Parâmetro | Tipo     | Descrição                           |
| :-------- | :------- | :---------------------------------- |
| `api_key` | `string` | **Obrigatório**. A chave da sua API |

#### Retorna uma meeting

```http
  GET /api/v1/meeting/${id}
```

| Parâmetro | Tipo     | Descrição                                   |
| :-------- | :------- | :------------------------------------------ |
| `id`      | `string` | **Obrigatório**. O ID do item que você quer |

#### Retorna sua meeting

```http
  GET /api/v1/meeting/user/${id}
```

| Parâmetro | Tipo     | Descrição                                   |
| :-------- | :------- | :------------------------------------------ |
| `id`      | `string` | **Obrigatório**. O ID do item que você quer |

#### Cria um Meeting

```http
  POST /api/v1/meeting/create
```

| Parâmetro     | Tipo     | Descrição                                      |
| :------------ | :------- | :--------------------------------------------- |
| `dataMeeting` | `Objeto` | Objeto contendo todos os atributos da meeting. |

#### Atualizar uma Meeting

```http
  PUT /api/v1/meeting/update/${id}
```

| Parâmetro     | Tipo     | Descrição                                                      |
| :------------ | :------- | :------------------------------------------------------------- |
| `id`          | `string` | **Obrigatório**. O ID do item que você quer                    |
| `dataMeeting` | `Objeto` | Objeto contendo os atributos que serão atualizados da meeting. |

#### Atualizar uma Meeting, Adicionar um participante

```http
  PUT /api/v1/meeting/update/addparticipant/${id}
```

| Parâmetro     | Tipo     | Descrição                                                      |
| :------------ | :------- | :------------------------------------------------------------- |
| `id`          | `string` | **Obrigatório**. O ID do item que você quer                    |
| `dataMeeting` | `Objeto` | Objeto contendo os atributos que serão atualizados da meeting. |

#### Atualizar uma Meeting, remover um participante

```http
  PUT /api/v1/meeting/update/removeparticipant/${id}
```

| Parâmetro     | Tipo     | Descrição                                                      |
| :------------ | :------- | :------------------------------------------------------------- |
| `id`          | `string` | **Obrigatório**. O ID do item que você quer                    |
| `dataMeeting` | `Objeto` | Objeto contendo os atributos que serão atualizados da meeting. |

#### Deletar uma Meeting

```http
  DELETE /api/v1/meeting/delete/${id}/${userId}
```

| Parâmetro | Tipo     | Descrição                                            |
| :-------- | :------- | :--------------------------------------------------- |
| `id`      | `string` | **Obrigatório**. O ID do item que você quer deletar. |

#### Retorna todos os Products

```http
  GET /api/v1/product
```

| Parâmetro | Tipo     | Descrição                           |
| :-------- | :------- | :---------------------------------- |
| `api_key` | `string` | **Obrigatório**. A chave da sua API |

#### Retorna um product

```http
  GET /api/v1/product/${id}
```

| Parâmetro | Tipo     | Descrição                                   |
| :-------- | :------- | :------------------------------------------ |
| `id`      | `string` | **Obrigatório**. O ID do item que você quer |

#### Cria um Product

```http
  POST /api/v1/product/create
```

| Parâmetro     | Tipo     | Descrição                                      |
| :------------ | :------- | :--------------------------------------------- |
| `dataProduct` | `Objeto` | Objeto contendo todos os atributos do product. |

#### Atualizar um Product

```http
  PUT /api/v1/product/update/${id}
```

| Parâmetro     | Tipo     | Descrição                                                      |
| :------------ | :------- | :------------------------------------------------------------- |
| `id`          | `string` | **Obrigatório**. O ID do item que você quer                    |
| `dataProduct` | `Objeto` | Objeto contendo os atributos que serão atualizados de product. |

#### Deletar um Product

```http
  DELETE /api/v1/product/delete/${id}/${userId}
```

| Parâmetro | Tipo     | Descrição                                                                |
| :-------- | :------- | :----------------------------------------------------------------------- |
| `id`      | `string` | **Obrigatório**. O ID do item que você quer deletar.                     |
| `userId`  | `string` | **Obrigatório**. O ID do usuario que você quer está deletando o product. |

#### Retorna todas as Productions

```http
  GET /api/v1/production
```

| Parâmetro | Tipo     | Descrição                           |
| :-------- | :------- | :---------------------------------- |
| `api_key` | `string` | **Obrigatório**. A chave da sua API |

#### Retorna uma Production

```http
  GET /api/v1/production/${id}
```

| Parâmetro | Tipo     | Descrição                                           |
| :-------- | :------- | :-------------------------------------------------- |
| `id`      | `string` | **Obrigatório**. O ID do item que você quer buscar. |

#### Criar uma Production

```http
  POST /api/v1/production/create
```

| Parâmetro        | Tipo     | Descrição                                         |
| :--------------- | :------- | :------------------------------------------------ |
| `dataProduction` | `Objeto` | Objeto contendo todos os atributos da production. |

#### Atualizar uma Production

```http
  PUT /api/v1/production/update/${id}
```

| Parâmetro        | Tipo     | Descrição                                                         |
| :--------------- | :------- | :---------------------------------------------------------------- |
| `id`             | `string` | **Obrigatório**. O ID do item que você quer                       |
| `dataProduction` | `Objeto` | Objeto contendo os atributos que serão atualizados de production. |

#### Deletar uma Production

```http
  DELETE /api/v1/production/delete/${id}/${userId}/${companyId}
```

| Parâmetro   | Tipo     | Descrição                                                                                           |
| :---------- | :------- | :-------------------------------------------------------------------------------------------------- |
| `id`        | `string` | **Obrigatório**. O ID do item que você quer deletar.                                                |
| `userId`    | `string` | **Obrigatório**. O ID do usuario para verificar se possui permissão de está deletando a production. |
| `companyId` | `string` | **Obrigatório**. O ID da company que você quer está deletando a production.                         |

#### Retorna todos os Projects

```http
  GET /api/v1/project
```

| Parâmetro | Tipo     | Descrição                           |
| :-------- | :------- | :---------------------------------- |
| `api_key` | `string` | **Obrigatório**. A chave da sua API |

#### Retorna um project

```http
  GET /api/v1/project/${id}
```

| Parâmetro | Tipo     | Descrição                                           |
| :-------- | :------- | :-------------------------------------------------- |
| `id`      | `string` | **Obrigatório**. O ID do item que você quer buscar. |

#### Criar um project

```http
  POST /api/v1/project/create
```

| Parâmetro     | Tipo     | Descrição                                      |
| :------------ | :------- | :--------------------------------------------- |
| `dataProject` | `Objeto` | Objeto contendo todos os atributos do project. |

#### Atualizar um project

```http
  PUT /api/v1/project/update/${id}
```

| Parâmetro     | Tipo     | Descrição                                                      |
| :------------ | :------- | :------------------------------------------------------------- |
| `id`          | `string` | **Obrigatório**. O ID do item que você quer                    |
| `dataProject` | `Objeto` | Objeto contendo os atributos que serão atualizados do project. |

#### Deletar uma project

```http
  DELETE /api/v1/project/delete/${id}
```

| Parâmetro | Tipo     | Descrição                                            |
| :-------- | :------- | :--------------------------------------------------- |
| `id`      | `string` | **Obrigatório**. O ID do item que você quer deletar. |

#### Retorna todos os Roles

```http
  GET /api/v1/role
```

| Parâmetro | Tipo     | Descrição                           |
| :-------- | :------- | :---------------------------------- |
| `api_key` | `string` | **Obrigatório**. A chave da sua API |

#### Retorna um Role

```http
  GET /api/v1/getRolesCompany/${id}
```

| Parâmetro | Tipo     | Descrição                                           |
| :-------- | :------- | :-------------------------------------------------- |
| `id`      | `string` | **Obrigatório**. O ID do item que você quer buscar. |

#### Criar um Role

```http
  POST /api/v1/role/create
```

| Parâmetro  | Tipo     | Descrição                                   |
| :--------- | :------- | :------------------------------------------ |
| `dataRole` | `Objeto` | Objeto contendo todos os atributos do role. |

#### Atualizar um Role

```http
  PUT /api/v1/role/update/${id}
```

| Parâmetro  | Tipo     | Descrição                                                   |
| :--------- | :------- | :---------------------------------------------------------- |
| `id`       | `string` | **Obrigatório**. O ID do item que você quer                 |
| `dataRole` | `Objeto` | Objeto contendo os atributos que serão atualizados do role. |

#### Deletar um Role

```http
  DELETE /api/v1/role/delete/${id}
```

| Parâmetro | Tipo     | Descrição                                            |
| :-------- | :------- | :--------------------------------------------------- |
| `id`      | `string` | **Obrigatório**. O ID do item que você quer deletar. |
