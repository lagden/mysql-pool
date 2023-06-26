import * as debug from './lib/debug.js'
import create from './lib/create.js'

const {
	MYQUERYTIMEOUT: timeout = 30_000,
} = process.env

/**
 * Represents a connection pool for MySQL database.
 */
class MysqlPool {
	/**
	 * Creates a new instance of MysqlPool.
	 * @param {Object} config - The configuration object for creating the connection pool.
	 */
	constructor(config) {
		this.pool = create(config)
	}

	/**
	 * Establishes a connection to the database.
	 * @private
	 * @returns {Promise<import('mysql').PoolConnection>} - A promise that resolves to the connection object.
	 */
	#conn() {
		return new Promise((resolve, reject) => {
			this.pool.getConnection((error, connection) => {
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
	 * Executes a SQL query on the database.
	 * @param {string} sql - The SQL query to execute.
	 * @param {Array} [values=[]] - The values to substitute in the SQL query.
	 * @param {Object} [options={}] - Additional options for the query.
	 * @returns {Promise<{results: Array<any>, fields: Array<import('mysql').FieldInfo>}>} - A promise that resolves to the query results and fields information.
	 */
	query(sql, values = [], options = {}) {
		return this
			.#conn()
			.then(connection => new Promise((resolve, reject) => {
				const query = connection.query({
					sql,
					values,
					timeout,
					...options,
				}, (error, results, fields) => {
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

	/**
	 * Closes the connection pool.
	 * @returns {Promise<void>} - A promise that resolves when the connection pool is closed.
	 */
	end() {
		return new Promise((resolve, reject) => {
			this.pool.end(error => {
				/* c8 ignore start */
				if (error) {
					debug.error(error)
					reject(error)
				} else {
					resolve()
				}
				/* c8 ignore stop */
			})
		})
	}
}

export default MysqlPool
