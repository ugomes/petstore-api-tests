const pactum = require('pactum');
const userData = require('../../data/users.json');
const userDataPut = require('../../data/user-put.json');
require('../../helpers/config');

describe('Teste - Usuários', () => {
    const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));
    const username = userData.user.username;
    
    before(() => {
        console.log(`\n🚀 Iniciando testes com USER: ${username}\n`);
    });

    it('POST - Deve criar um novo usuário', async () => {
        await pactum.spec()
            .post('/user')
            .withJson(userData.user)
            .expectStatus(200)
            .expectJsonLike({
                code: 200,
                type: "unknown",
                message: String(userData.user.id)
            })
            .inspect();
        await sleep(2000);
    });

    it('GET - Deve buscar o usuário criado', async () => {
        await sleep(1000);
        for (let attempt = 1; attempt <= 5; attempt++) {
            try {
                await pactum.spec()
                    .get(`/user/${username}`)
                    .expectStatus(200)
                    .expectJsonLike(userData.user)
                    .inspect();
                console.log(`✓ Validação bem-sucedida (tentativa ${attempt}/5)`);
                return;
            } catch (error) {
                if (attempt === 5) throw error;
                console.log(`⟳ Tentativa ${attempt}/5...`);
                await sleep(2000);
            }
        }
    });

    it('PUT - Deve Atualizar o Usuário', async () => {
        await pactum.spec()
            .put(`/user/${username}`)
            .withJson(userDataPut.user)
            .expectStatus(200)
            .expectJsonLike({
                code: 200,
                type: "unknown",
                message: String(userDataPut.user.id)
            })
            .inspect();
        await sleep(4000);
    });

    it('GET - Deve buscar o usuário atualizado', async () => {
        for (let attempt = 1; attempt <= 5; attempt++) {
            try {
                await pactum.spec()
                    .get(`/user/${userDataPut.user.username}`)
                    .expectStatus(200)
                    .expectJsonLike(userDataPut.user)
                    .inspect();
                console.log(`✓ Validação bem-sucedida (tentativa ${attempt}/5)`);
                return;
            } catch (error) {
                if (attempt === 5) throw error;
                console.log(`⟳ Tentativa ${attempt}/5...`);
                await sleep(2000);
            }
        }
    });

    it('DELETE - Deve deletar o usuário', async () => {
        await pactum.spec()
            .delete(`/user/${userDataPut.user.username}`)
            .expectStatus(200)
            .expectJsonLike({
                code: 200,
                type: "unknown",
                message: userDataPut.user.username
            })
            .inspect();
        await sleep(3000);
    });

    it('GET - Deve retornar 404 ao buscar o usuário deletado', async () => {
        for (let attempt = 1; attempt <= 3; attempt++) {
            try {
                await pactum.spec()
                    .get(`/user/${userDataPut.user.username}`)
                    .expectStatus(404)
                    .inspect();
                console.log(`✓ Validação 404 bem-sucedida (tentativa ${attempt}/3)`);
                return;
            } catch (error) {
                if (attempt === 3) throw error;
                console.log(`Tentativa ${attempt}/3...`);
                await sleep(2000);
            }
        }
    });

    after(() => {
        console.log(`Testes concluídos\n`);
    });
});

    
