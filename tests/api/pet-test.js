const pactum = require('pactum');
const petData = require('../../data/pet.json');
const petDataPut = require('../../data/pet-put.json');
require('../../helpers/config');

describe('Teste - Pets', () => {
    const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));
    const petId = petData.pet.id;

    before(() => {
        console.log(` Iniciando testes com Pet ID: ${petId}\n`);
    });

    it('POST - Deve criar um novo pet', async () => {
        await pactum.spec()
            .post('/pet')
            .withJson(petData.pet)
            .expectStatus(200)
            .expectJsonLike(petData.pet)
            .inspect();
        
        await sleep(2000);
    });

    it('GET - Deve buscar o pet criado', async () => {
        await sleep(1000);
        
        for (let attempt = 1; attempt <= 5; attempt++) {
            try {
                await pactum.spec()
                    .get(`/pet/${petId}`)
                    .expectStatus(200)
                    .expectJsonLike(petData.pet)
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

    it('PUT - Deve Atualizar o Pet', async () => {
        await pactum.spec()
            .put('/pet')
            .withJson(petDataPut.pet)
            .expectStatus(200)
            .expectJsonLike(petDataPut.pet)
            .inspect();
        
        await sleep(4000);
    });

    it('GET - Deve buscar o pet atualizado', async () => {
        for (let attempt = 1; attempt <= 5; attempt++) {
            try {
                await pactum.spec()
                    .get(`/pet/${petId}`)
                    .expectStatus(200)
                    .expectJsonLike(petDataPut.pet)
                    .inspect();
                
                console.log(`✓ Validação bem-sucedida (tentativa ${attempt}/5)`);
                return;
            } catch (error) {
                if (attempt === 5) throw error;
                console.log(` Tentativa ${attempt}/5...`);
                await sleep(2000);
            }
        }
    });

    it('DELETE - Deve deletar o pet', async () => {
        await pactum.spec()
            .delete(`/pet/${petId}`)
            .expectStatus(200)
            .expectJsonLike({
                code: 200,
                type: "unknown",
                message: String(petId)
            })
            .inspect();
        
        await sleep(3000);
    });

    it('GET - Deve retornar 404 ao buscar o pet deletado', async () => {
        for (let attempt = 1; attempt <= 3; attempt++) {
            try {
                await pactum.spec()
                    .get(`/pet/${petId}`)
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




    



