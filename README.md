# Projeto Frontend - Top 5 Músicas Tião Carreiro & Pardinho

## Descrição

Este é o frontend da aplicação que exibe a lista das 5 músicas mais tocadas de Tião Carreiro & Pardinho, permitindo que usuários autenticados sugiram novas músicas via link do YouTube. O projeto também permite que administradores gerenciem as sugestões e a lista de músicas.

## Tecnologias utilizadas

- **Frontend**: ReactJS
- **Autenticação**: JWT via API Laravel
- **Containerização**: Docker

---

## Instalação do projeto

> **Requisitos:** Docker instalado na máquina.

### Passo 1 - Clonar o repositório

```bash
  git clone git@github.com:samuelvinib/projeto-Techpines-frontend.git
  cd projeto-Techpines-frontend
``` 

### Passo 2 - Configurar e iniciar os containers

```bash
  docker-compose up -d --build
```

---

## Funcionalidades

- Exibe o ranking das 5 músicas mais populares.
- Exibe todas as músicas, com paginação.
- Usuários autenticados podem sugerir novas músicas via link do YouTube.
- Administradores podem aprovar/reprovar sugestões e gerenciar a lista de músicas.
- Sistema de autenticação e autorização integrado ao backend Laravel.
- Comunicação via API REST.

---

## Acesso à aplicação

Após a instalação e execução dos containers, a aplicação estará disponível em:

```bash
  http://localhost:3000
```

Boa sorte e bom desenvolvimento! 😄

