const pactum = require('pactum');
const storeData = require('../../data/store.json');
require('../../helpers/config');

describe('Teste - Store', () => {
    const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));
    const storeId = storeData.store.id;
    
    before(() => {
        console.log(`\nIniciando testes com Store ID: ${storeId}\n`);
    });

    it('POST - Deve criar um novo store', async () => {
        await pactum.spec()
            .post('/store/order')
            .withJson(storeData.store)
            .expectStatus(200)
            .expectJsonLike({
                id: storeData.store.id,
                petId: storeData.store.petId,
                quantity: storeData.store.quantity,
                shipDate:'2025-10-19T14:58:08.449+0000',
                status: storeData.store.status,
                complete: storeData.store.complete
            })
            .inspect();
        await sleep(2000);
    });

    it('GET - Deve buscar o store criado', async () => {
        await sleep(1000);
        for (let attempt = 1; attempt <= 5; attempt++) {
            try {
                await pactum.spec()
                    .get(`/store/order/${storeId}`)
                    .expectStatus(200)
                    .expectJsonLike({
                        id: storeData.store.id,
                        petId: storeData.store.petId,
                        quantity: storeData.store.quantity,
                        shipDate:'2025-10-19T14:58:08.449+0000',
                        status: storeData.store.status,
                        complete: storeData.store.complete
                    })
                    .inspect();
                console.log(`Validação bem-sucedida (tentativa ${attempt}/5)`);
                return;
            } catch (error) {
                if (attempt === 5) throw error;
                console.log(`Tentativa ${attempt}/5...`);
                await sleep(2000);
            }
        }
    });

    it('GET - Deve Buscar todos Status da Store', async () => {
        await pactum.spec()
            .get('/store/inventory')
            .expectStatus(200)
            .expectJsonSchema({
                type: 'object',
            })
            .inspect();
    });

    it('DELETE - Deve deletar o store criado', async () => {
        await pactum.spec()
            .delete(`/store/order/${storeId}`)
            .expectStatus(200)
            .expectJsonLike({
                code: 200,
                type: "unknown",
                message: String(storeId)
            })
            .inspect();
        await sleep(3000);
    });

    it('GET - Deve retornar 404 ao buscar o store deletado', async () => {
        for (let attempt = 1; attempt <= 3; attempt++) {
            try {
                await pactum.spec()
                    .get(`/store/order/${storeId}`)
                    .expectStatus(404)
                    .inspect();
                console.log(`Validação 404 bem-sucedida (tentativa ${attempt}/3)`);
                return;
            } catch (error) {
                if (attempt === 3) throw error;
                console.log(`⟳ Tentativa ${attempt}/3...`);
                await sleep(2000);
            }
        }
    });

    after(() => {
        console.log(`Testes concluídos\n`);
    });
});
