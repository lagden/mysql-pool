/**
 * Module Create Pool
 * @module lib/create
 */
'use strict'

const {createPool} = require('mysql')

/* istanbul ignore next */
const {
	MYHOST: host = 'localhost',
	MYPORT: port = 3306,
	MYUSER: user = 'root',
	MYPASS: password = '',
	MYLIMIT: connectionLimit = 100,
	MYMULTIPLE: multipleStatements = true
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
			connectionLimit,
			multipleStatements
		},
		...config
	}
	return createPool(_config)
}

module.exports = create
