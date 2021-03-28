/**
 * Module MysqlPool
 * @module index
 */
'use strict'

const debug = require('debug')
const create = require('./lib/create')

const log = {
	error: debug('mysql-pool:error'),
	info: debug('mysql-pool:info')
}

/** Class to create, connect and run queries. */
class MysqlPool {
	/**
	 * Create pool connections
	 * @param {object} config  - connection options (https://github.com/mysqljs/mysql#connection-options)
	 */
	constructor(config) {
		this.pool = create(config)
	}

	/**
	 * Get connection
	 * @private
	 * @returns {Promise} Connection
	 */
	_conn() {
		return new Promise((resolve, reject) => {
			this.pool.getConnection((error, connection) => {
				/* istanbul ignore next */
				if (error) {
					log.error(error)
					reject(error)
				} else {
					resolve(connection)
				}
			})
		})
	}

	/**
	 * Run queries
	 * @param {string} q         - MySQL Queries
	 * @param {array} [data=[]]  - Query parameters (https://github.com/mysqljs/mysql#escaping-query-values)
	 * @returns {Promise} Query result
	 */
	query(q, data = []) {
		return this
			._conn()
			.then(connection => new Promise((resolve, reject) => {
				const query = connection.query(q, data, (error, results, fields) => {
					connection.release()
					if (error) {
						log.error(error)
						reject(error)
					} else {
						resolve({results, fields})
					}
				})
				log.info(query.sql)
			}))
	}
}

module.exports = MysqlPool
