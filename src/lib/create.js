import process from 'node:process'
import { Buffer } from 'node:buffer'
import { createPool } from 'mysql2'
import { checkNaN } from './utils.js'

/* c8 ignore start */
/**
 * @typedef {Object} ProcessEnv
 * @property {string} [MYHOST]
 * @property {string} [MYPORT]
 * @property {string} [MYUSER]
 * @property {string} [MYPASS]
 * @property {string} [MYLIMIT]
 * @property {string} [MYCONNECTTIMEOUT]
 * @property {string} [MYMULTIPLE]
 * @property {string} [MYWAITFORCONNECTIONS]
 * @property {string} [MYENCODE]
 */

/** @type {Record<string, string | number | boolean | undefined>} */
let {
	MYHOST: host = 'localhost',
	MYPORT: port = 3306,
	MYUSER: user = 'root',
	MYPASS: password = '',
	MYLIMIT: connectionLimit = 5,
	MYCONNECTTIMEOUT: connectTimeout = 30_000,
	MYMULTIPLE: multipleStatements = true,
	MYWAITFORCONNECTIONS: waitForConnections = true,
	MYENCODE: useEncode = 0,
} = process.env

if (checkNaN(useEncode, 0) === 1) {
	user = Buffer.from(user, 'base64').toString('ascii')
	password = Buffer.from(password, 'base64').toString('ascii')
}
/* c8 ignore stop */

/**
 * Creates a MySQL connection pool
 * @param {string|Object} config - The configuration for the MySQL connection
 * @param {Object} [config] - The configuration object for the MySQL connection
 * @param {string} [config.host] - The MySQL host
 * @param {number} [config.port] - The MySQL port
 * @param {string} [config.user] - The MySQL user
 * @param {string} [config.password] - The MySQL password
 * @param {number} [config.connectionLimit] - The connection limit
 * @param {boolean} [config.multipleStatements] - Whether to allow multiple statements
 * @param {number} [config.connectTimeout] - The connection timeout
 * @param {boolean} [config.waitForConnections] - Whether to wait for connections
 * @returns {import('mysql2').Pool} The MySQL connection pool
 */
function create(config) {
	let _config
	if (typeof config === 'string') {
		_config = config
	} else {
		_config = {
			host,
			port: checkNaN(port, 3306),
			user,
			password,
			connectionLimit: checkNaN(connectionLimit, 5),
			multipleStatements: multipleStatements === 'true' || multipleStatements === true,
			connectTimeout: checkNaN(connectTimeout, 30_000),
			waitForConnections: waitForConnections === 'true' || waitForConnections === true,
			...config,
		}
	}

	return createPool(_config)
}

export default create
