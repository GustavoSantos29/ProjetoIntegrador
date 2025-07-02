@echo off
setlocal

echo Instalando dependências do back-end...
cd backend
call npm install

echo Aplicando migrations com Prisma...
call npx prisma generate
call npx prisma db push

echo Rodando seed...
call npm run seed

start cmd /k "node ./index.js"

cd ..
echo Instalando dependências do front-end...
cd frontend/jardim-botanico
call npm install

echo Iniciando front-end...
start cmd /k "npm run dev"

echo Sistema iniciado!
pause
