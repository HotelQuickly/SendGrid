# SendGrid callback server

Node.js server using [Hapi framework](http://www.hapijs.com) to get callbacks from [SendGrid](http://www.sendgrid.com).

## Attributes sent

SendGrid sends 4 attributes in POST which we are saving to MySQL database:
* email
* smtp-id
* category
* timestamp
* event

For details about SendGrid's webhook documentation visit http://sendgrid.com/docs/API_Reference/Webhooks/event.html.

## Instalation

Install with npm

```shell
npm install hapi
```

Launch the application (```node .```) and run cURL with POST data:
```
curl -X POST http://localhost:8000/callback -d "email=test@example.com&timestamp=1390078739&event=open&smtp-id=32131231&category=all"
```
