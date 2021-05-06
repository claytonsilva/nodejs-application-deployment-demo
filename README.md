# nodejs-application-deployment-demo

Aplicação para validar processo de deploy (Canário ou BLUE/GREEN)

Com essa aplicação é possível analisar:

- Se um balanceamento de carga está correto
- Se um deploy está sendo efetivamente aplicado
- Tirar estatísticas de respostas de host para ver se o % de balanceamento está sendo respeitado
- Conduzir um deploy pelo health check
- Validar rollback pelo unhealth route
- Validar se os logs estão sendo filtrados corretamente pelo ingestor de logs da sua stack
- Verificar se as variaveis de ambiente estão sendo carregadas corretamente

## Rotas a serem usadas na aplicação

- / - obter informação dos ip's de rede
- /version - checar a versão da aplicação
- /hostname - obter o hostname da instancia
- /health - retornar health se o express estiver ativo
- /unhealth - retornar erro 500 incondicionalmente
- /payload - rota de post que reflete a entrada e loga o conteúdo na aplicação
- /env - lista todas as variáveis de ambiente carregadas

## Bibliotecas usadas

- [pino](https://github.com/pinojs/pino-http)
- [express](https://expressjs.com/pt-br/)

## Como rodar

```bash
docker build -t <nome> . 
docker run -it -p 3000:3000 <nome>
```
