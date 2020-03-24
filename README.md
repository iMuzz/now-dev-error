# Starter Project with JWT based authentication

## How to Use

#### A. Start Development Server

```bash
$ now dev
```

#### B. In a seperate shell, start your Hasura Console.

```bash
$ hasura console --admin-secret '<your admin secret>'
```

#### C. In a seperate shell, create an ngrok server

```bash
$ ngrok http 3000 -subdomain=waitwhois-dev-faraaz.ngrok.io
```

---

## How to Deploy

##### Deploy App

```bash
$ now
```

##### Run Postgres Schema Migrations on Production

```bash
$ hasura migrate apply --endpoint 'https://prod-wait-who-is.herokuapp.com/' --admin-secret ''
```

---

## First-Time Setup Instructions

#### A. Create a `.env` in the root directory.

```bash
$ touch .env
```

#### B. Add the following variables to your newly created .env file.

`starterproject/.env`

```
###
# Environment Variables
###

### Twitter Variables
TWITTER_CONSUMER_API_KEY=""
TWITTER_CONSUMER_API_SECRET=""
TWITTER_ACCESS_TOKEN_KEY=""
TWITTER_ACCESS_TOKEN_SECRET=""
TWITTER_CALLBACK=""

### Hasura Variables
HASURA_URL=""
HASURA_ACCESS_KEY=""
```

---

## How to Setup Hasura Development Instance

#### 0. Install Hasura CLI

```bash
$ npm install -g hasura-cli
```

#### 1. Create your Development Hasura Instance

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy?template=https://github.com/hasura/graphql-engine-heroku)

Copy the heroku URL that points to your hasura instance.

#### 2. Setup Hasura Project Directory

```bash
$ hasura init --directory my-project --endpoint http://my-hasura-instance.herokuapp.com
```

#### 3. Initialize the migrations as per your current state

```bash
$ hasura migrate create "init" --from-server --admin-secret 'your-secret'
```

### Setting up admin secret

https://dev.to/hasurahq/securing-hasura-graphql-endpoint-with-admin-secret-key-3nf8

---

## How can I setup my production deployment?

### 1. Setup Zeit Production Environment

##### A. Add all the necessary keys to Zeit Servers.

```

now secrets add starter-project-prod-hasura-url "<enter value>"
now secrets add starter-project-prod-hasura-access-key "<enter value>"
now secrets add starter-project-prod-twitter-consumer-api-key "<enter value>"
now secrets add starter-project-prod-twitter-consumer-api-secret "<enter value>"
now secrets add starter-project-prod-twitter-access-token-key "<enter value>"
now secrets add starter-project-prod-twitter-access-token-secret "<enter value>"
now secrets add starter-project-prod-twitter-callback "<enter value>"

```

To find out all the keys you need to add, take a look at your `.env` file.

##### B. Navigate to `now.json` file and add your environment variables.

```json
{
  ...
  "env": {
    "YOUR_ENV_VAR": "@your-recently-added-key",
  }
}

```

### 2. Setup Hasura Production Instance on Heroku

##### A. Create your Production Hasura Instance on Heroku

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy?template=https://github.com/hasura/graphql-engine-heroku)

---

## How do I copy production data over to staging?

```bash
$ heroku pg:copy prod-wait-who-is::HEROKU_POSTGRESQL_OLIVE HEROKU_POSTGRESQL_BLACK --app waitwhois-development

```
