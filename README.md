# mysql-pool

[![NPM version][npm-img]][npm]
[![Build Status][ci-img]][ci]
[![Coverage Status][coveralls-img]][coveralls]

[npm-img]:         https://img.shields.io/npm/v/@tadashi/mysql-pool.svg
[npm]:             https://www.npmjs.com/package/@tadashi/mysql-pool
[ci-img]:          https://github.com/lagden/mysql-pool/actions/workflows/nodejs.yml/badge.svg
[ci]:              https://github.com/lagden/mysql-pool/actions/workflows/nodejs.yml
[coveralls-img]:   https://coveralls.io/repos/github/lagden/mysql-pool/badge.svg?branch=master
[coveralls]:       https://coveralls.io/github/lagden/mysql-pool?branch=master


Make pooling connections with [MySQL](https://github.com/mysqljs/mysql#pooling-connections)


## Install

```
$ npm i -S @tadashi/mysql-pool
```


## Environment variable

Variable             | Type    | Required   | Default       | Description
--------             | --------| -----------| --------------| ------------
MYHOST               | string  | no         | localhost     | Hostname or server address
MYPORT               | number  | no         | 3306          | Port number for the connection
MYUSER               | string  | no         | root          | User authentication
MYPASS               | string  | no         |               | Authentication password
MYLIMIT              | number  | no         | 5             | Limit or threshold value
MYCONNECTTIMEOUT     | number  | no         | 30000         | Connection timeout in milliseconds
MYACQUIRETIMEOUT     | number  | no         | 30000         | Resource acquisition timeout in milliseconds
MYMULTIPLE           | boolean | no         | true          | Allowing multiple statements
MYWAITFORCONNECTIONS | boolean | no         | true          | Waiting for available connections
MYENCODE             | number  | no         | 0             | MYUSER and MYPASS encoded in base64


## Usage

```js
import MysqlPool from '@tadashi/mysql-pool'

const pool = new MysqlPool() // => https://github.com/mysqljs/mysql#connection-options
const {results: [{total}]} = await pool.query('SELECT 1 + ? as total', [1])
// => 2

// Closing all the connections in a pool
await pool.end()
```


## License

MIT © [Thiago Lagden](https://github.com/lagden)
