/**
 * Module Create Pool
 * @module lib/create
 */
'use strict'

const mysql = require('mysql')

/* istanbul ignore next */
const {
	MYHOST: host = 'localhost',
	MYPORT: port = 3306,
	MYUSER: user = 'root',
	MYPASS: password = ''
} = process.env

/**
 * Create pool connections
 *
 * @param {object} config  - connection options (https://github.com/mysqljs/mysql#connection-options)
 * @returns {object} createPool
 */
function create(config) {
	const _config = {
		...{
			host,
			port,
			user,
			password,
			connectionLimit: 10,
			multipleStatements: true
		},
		...config
	}
	return mysql.createPool(_config)
}

module.exports = create
