# mysql-pool

[![NPM version][npm-img]][npm]
[![Build Status][ci-img]][ci]
[![Coverage Status][coveralls-img]][coveralls]
[![Dependency Status][dep-img]][dep]
[![devDependency Status][devDep-img]][devDep]

[![XO code style][xo-img]][xo]
[![Greenkeeper badge][greenkeeper-img]][greenkeeper]


[npm-img]:         https://img.shields.io/npm/v/@tadashi/mysql-pool.svg
[npm]:             https://www.npmjs.com/package/@tadashi/mysql-pool
[ci-img]:          https://api.travis-ci.org/lagden/mysql-pool.svg?branch=master
[ci]:              https://travis-ci.org/lagden/mysql-pool
[coveralls-img]:   https://coveralls.io/repos/github/lagden/mysql-pool/badge.svg?branch=master
[coveralls]:       https://coveralls.io/github/lagden/mysql-pool?branch=master
[dep-img]:         https://david-dm.org/lagden/mysql-pool.svg
[dep]:             https://david-dm.org/lagden/mysql-pool
[devDep-img]:      https://david-dm.org/lagden/mysql-pool/dev-status.svg
[devDep]:          https://david-dm.org/lagden/mysql-pool#info=devDependencies

[xo-img]:          https://img.shields.io/badge/code_style-XO-5ed9c7.svg
[xo]:              https://github.com/sindresorhus/xo
[greenkeeper-img]: https://badges.greenkeeper.io/lagden/mysql-pool.svg
[greenkeeper]:     https://greenkeeper.io/


Make pooling connections with [MySQL](https://github.com/mysqljs/mysql#pooling-connections)

## Install

```
$ npm i -S @tadashi/mysql-pool
```


## Usage

```js
const MysqlPool = require('@tadashi/mysql-pool')

const pool = new MysqlPool()

;(async () => {
  const {results: [{total}]} = await pool.query('SELECT 1 + ? as total', [1])
  // => 2
})()
```


## API

[See documentation](https://lagden.github.io/mysql-pool)


## License

MIT © [Thiago Lagden](http://lagden.in)
