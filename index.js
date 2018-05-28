/**
 * Module MysqlPool
 * @module index
 */
'use strict'

const {log} = require('@tadashi/debug')('mysql-pool')
const create = require('./lib/create')

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
			this.pool.getConnection((err, connection) => {
				/* istanbul ignore next */
				if (err) {
					reject(err)
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
				const query = connection.query(q, data, (err, results, fields) => {
					connection.release()
					if (err) {
						reject(err)
					} else {
						resolve({results, fields})
					}
				})
				log(query.sql)
			}))
	}
}

module.exports = MysqlPool
