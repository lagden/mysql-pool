import * as debug from './lib/debug.js'
import create from './lib/create.js'

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
					debug.error(error)
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
						debug.error(error)
						reject(error)
					} else {
						resolve({results, fields})
					}
				})
				debug.info(query.sql)
			}))
	}
}

export default MysqlPool
