# Authentication Portal Sample

## Setup

- Clone this repository

-  Install [MongoDb](https://www.digitalocean.com/community/tutorials/how-to-install-mongodb-on-ubuntu-16-04)
-  Create Role 
```sh 
db.createRole({ createRole: <Role Name>, privileges: [ {
  resource: { db: <Database Name>, collection: "" },
  actions: [ "find","insert","update","createIndex","createCollection","remove" ]}
], roles: [{ role: "read", db: <Database Name>}] })
```
- Create User
```sh
- db.createUser({"user" : <User name>,pwd: <Password>, "roles" : [{"role" : <Role Name Created>, "db" : <Database Name>}]})
```
- Install npm packages
```sh
- npm install
```

- Make a .env file with the same fields as .env.sample
```sh
- cp .env.sample .env
```

- Fill the .env file accordingly

### For OAuth Credentials
- Use your oauth secrets by registering [here](https://console.developers.google.com/)

## Using the app
- Run the app
```sh
- npm start
```
- Visit the url as mentioned in the terminal, usually http://localhost:3000

