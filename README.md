# Party Planning Application

## Descrição

Esta é uma aplicação de planejamento de festas que permite criar, visualizar, atualizar e excluir festas e serviços relacionados. A aplicação é dividida em duas partes principais: Backend e Frontend.

### Backend

O backend é responsável por gerenciar o banco de dados e fornecer uma API para o frontend. Ele é construído com Node.js e Express, e utiliza MongoDB para armazenar dados.

#### Estrutura do Projeto

- **controllers**: Contém os controladores para as festas e serviços.
  - `partyController.js`: Gerencia as operações CRUD para festas.
  - `serviceController.js`: Gerencia as operações CRUD para serviços.
- **models**: Contém os modelos do MongoDB para festas e serviços.
  - `Party.js`: Define o esquema para festas.
  - `Service.js`: Define o esquema para serviços.
- **routes**: Define as rotas da API.
  - `parties.js`: Rotas para operações relacionadas a festas.
  - `services.js`: Rotas para operações relacionadas a serviços.
  - `router.js`: Agrupa todas as rotas e as disponibiliza na API.
- **db**: Conecta ao banco de dados MongoDB.
  - `conn.js`: Configura a conexão com o MongoDB.
  - `data.json`: Contém dados de exemplo para serviços.

#### Dependências

- `express`: Framework para criar o servidor.
- `mongoose`: Biblioteca para interagir com MongoDB.
- `cors`: Middleware para habilitar CORS.

#### Configuração

1. Clone o repositório:
   ```bash
   git clone https://github.com/usuario/repo.git
Frontend
O frontend é uma aplicação React que consome a API do backend e fornece uma interface de usuário para interação.

Estrutura do Projeto
components: Contém os componentes React da aplicação.
Navbar.js: Componente de navegação.
hooks: Contém hooks personalizados.
useToast.js: Hook para exibir mensagens de toast.
axios: Configuração para a instância do Axios.
Dependências
react: Biblioteca para construir a interface de usuário.
react-router-dom: Biblioteca para roteamento.
axios: Biblioteca para realizar requisições HTTP.
react-toastify: Biblioteca para exibir mensagens de toast.


Uso
Criar Festa: Navegue para /party/new e preencha o formulário para criar uma nova festa.
Editar Festa: Navegue para /party/:id/edit para editar uma festa existente.
Visualizar Festa: Navegue para /party/:id para visualizar os detalhes de uma festa.
Excluir Festa: Use a interface para excluir uma festa existente.

Lembrando que esta ainda é a primeira versão e ainda vou implementar mais coisar e ajustar o css e a resposividade
