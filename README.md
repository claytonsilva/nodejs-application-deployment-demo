# nodejs-application-deployment-demo

Aplicação para validar processo de deploy (Canário ou BLUE/GREEN)

Com essa aplicação é possível analisar:

- Se um balanceamento de carga está correto
- Se um deploy está sendo efetivamente aplicado
- Tirar estatísticas de respostas de host para ver se o % de balanceamento está sendo respeitado
- Conduzir um deploy pelo health check
- Validar rollback pelo unhealth route

## Rotas a serem usadas na aplicação

- / - obter informação dos ip's de rede
- /version - checar a versão da aplicação
- /hostname - obter o hostname da instancia
- /health - retornar health se o express estiver ativo
- /unhealth - retornar erro 500 incondicionalmente

## Bibliotecas usadas

- [pino](https://github.com/pinojs/pino-http)
- [express](https://expressjs.com/pt-br/)

## Como rodar

```bash
docker build -t <nome> . 
docker run -it -p 3000:3000 <nome>
```
