# mysql-pool

[![NPM version][npm-img]][npm] [![Build Status][ci-img]][ci] [![Coverage Status][coveralls-img]][coveralls]

[npm-img]: https://img.shields.io/npm/v/@tadashi/mysql-pool.svg
[npm]: https://www.npmjs.com/package/@tadashi/mysql-pool
[ci-img]: https://github.com/lagden/mysql-pool/actions/workflows/nodejs.yml/badge.svg
[ci]: https://github.com/lagden/mysql-pool/actions/workflows/nodejs.yml
[coveralls-img]: https://coveralls.io/repos/github/lagden/mysql-pool/badge.svg?branch=master
[coveralls]: https://coveralls.io/github/lagden/mysql-pool?branch=master

Make pooling connections with [MySQL](https://sidorares.github.io/node-mysql2/docs/examples/connections/create-pool#pooloptions)

## Install

```
$ npm i @tadashi/mysql-pool
```

## Environment variable

| Variable             | Type    | Required | Default   | Description                         |
| -------------------- | ------- | -------- | --------- | ----------------------------------- |
| MYHOST               | string  | no       | localhost | Hostname or server address          |
| MYPORT               | number  | no       | 3306      | Port number for the connection      |
| MYUSER               | string  | no       | root      | User authentication                 |
| MYPASS               | string  | no       |           | Authentication password             |
| MYLIMIT              | number  | no       | 5         | Limit or threshold value            |
| MYCONNECTTIMEOUT     | number  | no       | 30000     | Connection timeout in milliseconds  |
| MYMULTIPLE           | boolean | no       | true      | Allowing multiple statements        |
| MYWAITFORCONNECTIONS | boolean | no       | true      | Waiting for available connections   |
| MYENCODE             | number  | no       | 0         | MYUSER and MYPASS encoded in base64 |

## Usage

```js
import MysqlPool from '@tadashi/mysql-pool'

const pool = new MysqlPool() // => https://sidorares.github.io/node-mysql2/docs/examples/connections/create-pool
const { results: [{ total }] } = await pool.query('SELECT 1 + ? as total', [1])
// => 2

// Closing all the connections in a pool
await pool.end()
```

## Team

[<img src="https://avatars.githubusercontent.com/u/130963?s=390" alt="Lagden" width="90">](https://github.com/lagden)

---

> [!IMPORTANT]\
> Buy me a coffee!\
> BTC: `bc1q7famhuj5f25n6qvlm3sssnymk2qpxrfwpyq7g4`

## License

MIT © [Thiago Lagden](https://github.com/lagden)
