# Backoffice Angular com Biblioteca Customizada

Este projeto é uma aplicação de **backoffice** desenvolvida em **Angular**, utilizando uma **biblioteca própria** para construção da interface (`<ds-input>`). A aplicação permite **CRUD completo** (Criar, Ler, Atualizar e Deletar) de clientes, com uma interface pensada para uma boa experiência de backoffice.

---

## 📄 Sobre a aplicação

Trata-se de uma tela de backoffice com Angular, garantindo:

- Uso de Angular como framework principal;
- Desenvolvimento de uma biblioteca própria para UI (não usar frameworks externos);
- Implementação de todas as operações de CRUD;
- Layout organizado e funcional para backoffice;
- Integração com API mockada (JSON-Server) para demonstração da integração do front com back-end;
- Sistema de autenticação com Google.

---

## 🏗 Estrutura do projeto

```
/src
 ├─ /app
 │   ├─ /backoffice
 │   │   ├─ backoffice.component.ts
 │   │   ├─ backoffice.component.html
 │   │   └─ backoffice.component.css
 │   ├─ /lib
 │   │   └─ /ds-input
 │   │       ├─ ds-input.component.ts
 │   │       └─ ds-input.component.html
 │   └─ app.component.ts
 └─ main.ts
 ```

- **backoffice.component.ts** → componente principal da tela de backoffice, implementa CRUD e integração com `ClienteService`.
- **ds-input.component.ts** → componente da biblioteca, oferece inputs customizados.
- **ClienteService** → serviço Angular que realiza chamadas HTTP para o backend (mockado).

---

## ⚡ Funcionalidades

### Backoffice

- Listagem de clientes (`GET` e `GET/:id`);
- Criação de novos clientes (`POST`);
- Edição de clientes existentes (`PUT`);
- Exclusão de clientes (`DELETE`);
- Pesquisa por nome;
- Modal dinâmico para criação/edição de clientes.

### Biblioteca DS Input

- Componente `<ds-input>`;
- Inputs com label, placeholder e validação;
- Suporte a eventos `valueChange`;
- Facilita padronização de inputs na aplicação.

### Autenticação

- Integração com **Google Identity Services**;
- Botão de login renderizado dinamicamente;
- Flag de autenticação para condicionar a exibição da aplicação.

---

## 💻 Rodando a aplicação

```bash
npm install 
npm start
npm run start:json-server
```
---

## 🧪 Testes

- Carrega clientes no init;
- Cria, edita e exclui clientes via HTTP mockado;
- Filtra clientes por nome;
- Testa emissão de eventos valueChange;

```bash
ng test
```



