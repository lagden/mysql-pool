import process from 'node:process'
import { checkNaN } from './lib/utils.js'
import * as debug from './lib/debug.js'
import create from './lib/create.js'

/**
 * @typedef {Object} MysqlPoolConfig
 * @property {string} host - The database host
 * @property {number} port - The database port
 * @property {string} user - The database user
 * @property {string} password - The database password
 * @property {string} database - The database name
 */

const {
	MYQUERYTIMEOUT: timeout,
} = process.env

/**
 * Represents a MySQL connection pool
 */
class MysqlPool {
	/**
	 * Creates a new MysqlPool instance
	 * @param {MysqlPoolConfig | string} config - Configuration for the MySQL pool
	 */
	constructor(config) {
		this.pool = create(config)
	}

	/**
	 * Gets a connection from the pool
	 * @returns {Promise<import('mysql2').PoolConnection>} A promise that resolves with a database connection
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
	 * Executes a SQL query
	 * @param {string} sql - The SQL query to execute
	 * @param {Array} [values=[]] - The values to be inserted into the query
	 * @param {Object} [options={}] - Additional options for the query
	 * @returns {Promise<{results: any, fields: import('mysql2').FieldPacket[]}>} A promise that resolves with the query results and field information
	 */
	query(sql, values = [], options = {}) {
		return this
			.#conn()
			.then((connection) =>
				new Promise((resolve, reject) => {
					const query = connection.query({
						sql,
						values,
						timeout: checkNaN(timeout, 30_000),
						...options,
					}, (error, results, fields) => {
						connection.release()
						if (error) {
							debug.error(error)
							reject(error)
						} else {
							resolve({ results, fields })
						}
					})
					debug.info(query.sql)
				})
			)
	}

	/**
	 * Ends the connection pool
	 * @returns {Promise<void>} A promise that resolves when the pool has been ended
	 */
	end() {
		return new Promise((resolve, reject) => {
			this.pool.end((error) => {
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
