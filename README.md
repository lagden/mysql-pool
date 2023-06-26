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


## Usage

```js
import MysqlPool from '@tadashi/mysql-pool'

const pool = new MysqlPool()
const {results: [{total}]} = await pool.query('SELECT 1 + ? as total', [1])
// => 2
```


## License

MIT © [Thiago Lagden](http://lagden.in)
