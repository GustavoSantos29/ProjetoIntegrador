const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const prisma = new PrismaClient();

async function main() {
    const existingUser = await prisma.users.findUnique({
        where: { email: 'admin@admin' },
    });

    if (!existingUser) {
        const hashedPassword = bcrypt.hashSync('123', 10);
        await prisma.users.create({
            data: {
                nome: 'admin',
                email: 'admin@admin',
                senha: hashedPassword,
                active: true,
                admin: true,
                observacao: '',
            },
        });
        console.log('Usuário admin criado');
    } else {
        console.log('Usuário admin já existe');
    }

    const animalCount = await prisma.animal.count(); 
    if (animalCount > 0) {
        console.log('Animais já existem no banco. Nenhum será criado.');
        return;
    }

    const nomes = ['Leão', 'Onça', 'Tucano', 'Capivara', 'Tamanduá'];

    for (let i = 0; i < nomes.length; i++) {
        const nome = nomes[i];
        const animal = await prisma.animal.create({
            data: {
                nomePopular: nome,
                nomeCientifico: `${nome} cientifico`,
                reino: `${nome} reino`,
                filo: `${nome} filo`,
                classe: `${nome} classe`,
                ordem: `${nome} ordem`,
                familia: `${nome} familia`,
                genero: `${nome} genero`,
                especie: `${nome} especie`,
                porte: i % 2 === 0 ? 'Grande' : 'Médio',
                comportamento: i % 2 === 0 ? 'Calmo' : 'Agressivo',
                reproducao: 'Vivíparo',
                habitat: 'Floresta tropical',
                descricao: `${nome} descricao`,
                nAcervo: `${i + 1}`,
                video: 'https://www.youtube.com/watch?v=VDi520elXV4',
                foto: `${i + 1}.jpg`,
                audio: null,
                qrcode: `http://localhost:5173/animal/${i + 1}`,
                subclasse: i % 2 === 0 ? 'Subclasse A' : null,
                subordem: i % 2 !== 0 ? 'Subordem B' : null,
                subfamilia: null,
                subgenero: null,
            },
        });

        console.log(`Animal "${animal.nomePopular}" criado com ID ${animal.id}`);

        await prisma.article.create({
            data: {
                idAnimal: animal.id,
                nome: `Artigo sobre ${nome}`,
                link: `https://www.youtube.com/watch?v=VDi520elXV4`,
            },
        });

        await prisma.article.create({
            data: {
                idAnimal: animal.id,
                nome: `Artigo sobre ${nome} 2`,
                link: `https://exemplo.com/${nome.toLowerCase()}-2`,
            },
        });

        console.log(` Artigos para "${nome}" criados`);
    }
}

main()
    .catch((e) => {
        console.error(' Erro ao rodar seed:', e);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
