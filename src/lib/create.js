import {createPool} from '@vlasky/mysql'
import {parseNumber} from './parse-number.js'

/* c8 ignore start */
let {
	MYHOST: host = 'localhost',
	MYPORT: port = 3306,
	MYUSER: user = 'root',
	MYPASS: password = '',
	MYLIMIT: connectionLimit,
	MYCONNECTTIMEOUT: connectTimeout,
	MYACQUIRETIMEOUT: acquireTimeout,
	MYMULTIPLE: multipleStatements = true,
	MYWAITFORCONNECTIONS: waitForConnections = true,
	MYENCODE: useEncode,
} = process.env
/* c8 ignore stop */

port = parseNumber(port)
connectionLimit = parseNumber(connectionLimit) ?? 5
connectTimeout = parseNumber(connectTimeout) ?? 30_000
acquireTimeout = parseNumber(acquireTimeout) ?? 30_000
useEncode = parseNumber(useEncode) ?? 0

/* c8 ignore start */
if (useEncode === 1) {
	user = Buffer.from(user, 'base64').toString('ascii')
	password = Buffer.from(password, 'base64').toString('ascii')
}
/* c8 ignore stop */

/**
 * Creates a MySQL connection pool using the provided configuration.
 * @param {Object} config - The configuration object for creating the connection pool.
 * @returns {import('@vlasky/mysql').Pool} - The created MySQL connection pool.
 */
function create(config) {
	const _config = {
		host,
		port,
		user,
		password,
		connectionLimit,
		multipleStatements,
		connectTimeout,
		acquireTimeout,
		waitForConnections,
		...config
	}
	return createPool(_config)
}

export default create
