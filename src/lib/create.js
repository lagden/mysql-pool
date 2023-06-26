import {createPool} from '@vlasky/mysql'

/* c8 ignore start */
const {
	MYHOST: host = 'localhost',
	MYPORT: port = 3306,
	MYUSER: user = 'root',
	MYPASS: password = '',
	MYLIMIT: connectionLimit = 100,
	MYMULTIPLE: multipleStatements = true,
	MYCONNECTTIMEOUT: connectTimeout = 30_000,
	MYACQUIRETIMEOUT: acquireTimeout = 30_000,
	MYWAITFORCONNECTIONS: waitForConnections = true
} = process.env
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
