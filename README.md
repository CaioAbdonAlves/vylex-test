## Description

Este é um teste desenvolvido para a oportunidade de desenvolvedor backend na Vylex!

## Installation

Não é necessário instalar nada, pois a aplicação completa está rodando em containers docker. Tanto a api, quanto o mysql e o mongodb.

Atenção: É necessário um arquivo .env para funcionar, existe um arquivo chamado .env.example mas fornecerei o .env para ser colado na aplicação em particular.

## Running the app

Para rodar a aplicação, é necessário apenas subir o container com o docker-compose no diretório da aplicação, pois todo o código necessário de migrations está dentro do entrypoint:

```bash
# iniciando a aplicação
$ docker-compose up --build

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
