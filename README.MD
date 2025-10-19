# Petstore API Testing Project

Este é um projeto de testes de API automatizados para a Petstore usando PactumJS.

## Pré-requisitos

- Node.js versão 20 ou superior
- NPM (Node Package Manager)

## Instalação

1. Clone o repositório:
```sh
git clone https://github.com/seu-usuario/petstore-api.git
cd petstore-api
```

2. Instale as dependências:
```sh
npm install
```

## Estrutura do Projeto

```
petstore-api/
├── data/                    # Arquivos de dados para os testes
├── helpers/                 # Arquivos de configuração
├── tests/                   # Arquivos de teste
│   └── api/
└── .github/                 # Configurações do GitHub Actions
```

## Scripts Disponíveis

- Executar todos os testes:
```sh
npm test
```

- Executar testes específicos:
```sh
npm run test:user   # Testes de usuário
npm run test:pet    # Testes de pet
npm run test:store  # Testes de store
```

- Executar testes com watch mode:
```sh
npm run test:watch
```

- Comandos para relatórios Allure:
```sh
npm run allure:generate  # Gerar relatório
npm run allure:open     # Abrir relatório no navegador
npm run allure:clean    # Limpar relatórios anteriores
```

- Executar testes completos com relatório:
```sh
npm run test:clean     # Limpa relatórios e executa novos testes
npm run test:allure    # Executa testes e gera relatório
```

## Configuração

A configuração base da API está localizada em `helpers/config.js`. A URL base é:
```
https://petstore.swagger.io/v2
```

## Suítes de Teste

O projeto contém três suítes principais de teste:

1. **User Tests** (`tests/api/user-test.js`)
   - Criação de usuário
   - Busca de usuário
   - Atualização de usuário
   - Deleção de usuário

2. **Pet Tests** (`tests/api/pet-test.js`)
   - Criação de pet
   - Busca de pet
   - Atualização de pet
   - Deleção de pet

3. **Store Tests** (`tests/api/store-test.js`)
   - Criação de pedido
   - Busca de pedido
   - Verificação de inventário
   - Deleção de pedido

## Integração Contínua

O projeto utiliza GitHub Actions para CI/CD. A configuração está em `.github/workflows/tests-api.yml`.
Os testes são executados automaticamente em:
- Push para a branch main
- Pull Requests para a branch main

## Relatórios

Os relatórios de teste são gerados usando Allure. Após executar os testes, você pode:
1. Gerar o relatório: `npm run allure:generate`
2. Abrir o relatório: `npm run allure:open`

## Dependências Principais

- PactumJS: Framework de testes de API
- Mocha: Framework de testes
- Allure: Geração de relatórios

## Timeout dos Testes

Os testes estão configurados com um timeout de 30 segundos. Isso pode ser ajustado no `package.json` modificando o parâmetro `--timeout`.