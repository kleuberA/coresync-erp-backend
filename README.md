# CoreSync ERP

## Introduction

CoreSync ERP is a web-based ERP system that is designed to help businesses manage their operations more efficiently. It is a comprehensive solution that covers all aspects of a business, including accounting, inventory management, sales, and customer relationship management. CoreSync ERP is easy to use and can be customized to meet the specific needs of your business.

## Features

- **User Management**: Create, update and delete users with different roles and permissions. Assign user to multiple companies or projects.
- **Company Management**: Create, update and delete companies. Assign users to companies. Manage company settings such as currency, language, and time zone.
- **Project Management**: Create, update and delete projects. Assign users to projects. Manage project settings such as start date, end date, and budget.

## Documentação da API

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
