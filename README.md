🇧🇷 Projeto Integrador
Um projeto feito utilizando React e JavaScript, em parceria com o Jardim Botânico da UFSM.
A ideia do projeto era gerar um sistema que pudesse ser usado para cadastrar animais taxidermizados junto com suas informações, gerar um QR Code para cada animal e permitir que os visitantes pudessem escanear o QR Code e visualizar as informações desses animais.

O sistema conta com:

  .Campos opcionais de preenchimento, que caso não sejam preenchidos não são renderizados no front-end, permitindo que os animais tenham campos de informações diferentes.

  .Possibilidade de adicionar um vídeo do YouTube e o som do animal.

  .Uma lista opcional de links para artigos sobre cada animal.

🚀 Como usar
Você precisa ter o PostgreSQL e o Node.js instalados.

É necessário criar um arquivo .env na raiz da pasta backend com os seguintes dados:
  DATABASE_URL="postgresql://seu_login_postgres:sua_senha_postgres@localhost:5432/Jardim"
  LOCAL_IP=seu_ip_local
  SECRET="Uma palavra chave de criptografia para os tokens"
Execute o arquivo .bat do projeto. Ele já cadastra 5 animais pré-definidos e um usuário (login: admin@admin, senha: 123).
O sistema estará rodando em localhost.



🇺🇸 Integrative Project
A project developed using React and JavaScript, in partnership with Jardim Botânico of UFSM.
The idea of the project was to create a system to register taxidermized animals along with their information, generate a QR Code for each animal, and allow visitors to scan the QR Code to view the information about these animals.

The system includes:

  .Optional fields that, if left empty, are not rendered on the front-end, allowing animals to have different information fields.
  
 .Possibility to add a YouTube video and the animal's sound.
  
  .An optional list of links to articles about each animal.

🚀 How to use
You need to have PostgreSQL and Node.js installed.

You must create a .env file at the root of the backend folder with the following data:
  DATABASE_URL="postgresql://your_postgres_login:your_postgres_password@localhost:5432/Jardim"
  LOCAL_IP=your_local_ip
  SECRET="A secret word for token encryption"
Run the project’s .bat file. It will register 5 predefined animals and a user (login: admin@admin, password: 123).
The system will be running on localhost.

