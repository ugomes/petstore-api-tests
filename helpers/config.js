const pactum = require('pactum');

// Configuração base da URL
const baseUrl = 'https://petstore.swagger.io/v2';

// Configurar settings globais
pactum.request.setBaseUrl(baseUrl);
pactum.request.setDefaultTimeout(5000);

// Adicionar headers padrão (se necessário)
pactum.request.setDefaultHeaders({
  'Content-Type': 'application/json',
  'Accept': 'application/json',
  // Adiciona headers para desabilitar cache
   'Cache-Control': 'no-cache, no-store, must-revalidate',
   'Pragma': 'no-cache',
   'Expires': '0'
});

module.exports = { baseUrl };
