# marketplaceApp
simple REST API for selling products

## Requirements

- Yarn
- Redis
- MongoDB

## Installation

```sh
yarn install
```

Run mongo:
`docker run --name nodemongo -p 27017:27017 -d -t mongo`

Run redis:
`docker run --name redisqueue -p 6379:6379 -d -t redis:alpine`

then start the application

`yarn start`