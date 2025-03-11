export default create;
export type ProcessEnv = {
    MYHOST?: string;
    MYPORT?: string;
    MYUSER?: string;
    MYPASS?: string;
    MYLIMIT?: string;
    MYCONNECTTIMEOUT?: string;
    MYMULTIPLE?: string;
    MYWAITFORCONNECTIONS?: string;
    MYENCODE?: string;
};
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
declare function create(config?: string | any): import("mysql2").Pool;
