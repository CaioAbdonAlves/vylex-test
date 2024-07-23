## Description

Este é um teste desenvolvido para a oportunidade de desenvolvedor backend na Vylex!

## Installation

Necessário instalar dependências e baixar as imagens docker do Mysql e do Mongodb. Todo os comandos estão na sessão de <a href="https://github.com/CaioAbdonAlves/vylex-test?tab=readme-ov-file#running-the-app">Running the app</a>

Atenção: É necessário um arquivo .env para funcionar, existe um arquivo chamado .env.example mas fornecerei o .env para ser colado na aplicação em particular.

## Running the app

Para rodar a aplicação, é necessário instalar as dependências do projeto, subir os containers docker e por fim iniciar a aplicação.

```bash
# instalando dependências
$ npm install

# iniciando containers do Mysql e do Mongodb
$ docker-compose up -d

# iniciando a aplicação
$ npm run start:dev

```

## Documentation

A API foi documentada utilizando o swagger, e a mesma pode ser acessada neste link: <a href="http://localhost:3000/api"> Documentação API </a>

## Important

No endpoint de reset de senha, foi desenvolvido uma integração com envio de e-mail, uma interface abstraída e foi implementado o serviço Brevo. Possa ser que na hora do envio esteja congestionado, mas o retorno é logado no console da api no docker. Além disso é retornado um link com um token na response da requisição simulando o retorno para um frontend da aplicação com um token.

## Stay in touch

- Author - [Caio Abdon]()
- GitHub - [https://github.com/CaioAbdonAlves](https://github.com/CaioAbdonAlves/)

## License

Nest is [MIT licensed](LICENSE).
