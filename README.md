# Projeto de Prática Profissional em ADS

1. Pré-requisitos
Git instalado na máquina. Baixe o Git.
Node.js instalado. Baixe o Node.js.
Banco de dados MySQL configurado localmente ou remotamente.

2. Clonando o repositório
Abra o terminal ou prompt de comando e execute o seguinte comando para clonar o repositório do seu projeto:

git clone <URL_DO_REPOSITORIO>

3. Instalando dependências
Navegue até o diretório do projeto que você acabou de clonar:

cd nome-do-repositorio
Depois, instale as dependências do projeto utilizando o npm (gerenciador de pacotes do Node.js):

npm install

4. Configurando variáveis de ambiente

O projeto pode depender de variáveis de ambiente para a configuração do banco de dados e outras credenciais. Geralmente, essas variáveis são armazenadas em um arquivo .env.

Crie um arquivo .env na raiz do projeto (se não houver um) e adicione as variáveis necessárias, como:

DB_HOST=localhost
DB_USER=seu_usuario
DB_PASSWORD=sua_senha
DB_NAME=nome_do_banco
Ajuste esses valores conforme a configuração do seu banco de dados.


5. Rodando o servidor
Agora que tudo está configurado, você pode iniciar o servidor da aplicação:

npm start
Isso iniciará o servidor, e você poderá acessar a aplicação no navegador no endereço http://localhost:3000 

7. Acessando a aplicação
Abra o navegador e vá até o endereço:

http://localhost:3000
Isso deve exibir a página principal da sua aplicação de administração escolar.
