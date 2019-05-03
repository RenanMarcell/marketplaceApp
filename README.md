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

## How to use

Register users, then log in with the sessions route. After this, you can start creating ads, updating and deleting them if needed.
The purchases route you can place a purchased order, and then confirme the order in the sell route. Right now there is no authentication for the sell, any user can sell other users ads, but that can be easily implemented if anyone wants to use this API.