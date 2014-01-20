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

Install ```hapi``` and the other dependencies (as listed in ```package.json```) from ```npm``` with command

```shell
npm install
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

## Config

Don't forget to create ```config.js``` file before you launch the application. You have two options:

1. copy ```config.template.js``` to ```config.js``` and update parameters
2. create a symlink to another directory with other config files, i.e. ```ln -s /srv/SecretConfig/production/config/config.sendgrid.js ./config.js```

## Run it on a server

We recommend running it on a server with ```forever``` which is a great tool making sure it will run continuously, literaly, forever :-) See more info [about forever](https://github.com/nodejitsu/forever) in the documentation.

This is what we use to run it on our server:
```shell
forever start --minUptime 1000 --spinSleepTime 5000 /srv/nodejs/SendGrid/index.js
```