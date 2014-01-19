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

The callbacks will be available with POST request on URL ```/callback```

Launch the application (```node .```) and run cURL with POST data:
```
curl -X POST http://localhost:8000/callback -d "email=test@example.com&timestamp=1390078739&event=open&smtp-id=32131231&category=all"
```

## Healthy check

Since we are running this server on Amazon EC2 under a load balancer, it requires a healthy check to be set up. Our healthy check will connect to database and select last inserted row to see if the database connection can be established.

For this healthy check to work, you need to:

1. check table name in ```config.js``` - it should match the table name you are using to save the callbacks
2. set up healthy check in Amazon AWS load balancer. It is be available with GET request on URL ```/healthy-check```

![Healthy Check setup](./docs/img/aws-healthy-check-setup.png)
