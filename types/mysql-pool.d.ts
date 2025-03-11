export default MysqlPool;
export type MysqlPoolConfig = {
    /**
     * - The database host
     */
    host: string;
    /**
     * - The database port
     */
    port: number;
    /**
     * - The database user
     */
    user: string;
    /**
     * - The database password
     */
    password: string;
    /**
     * - The database name
     */
    database: string;
};
/**
 * Represents a MySQL connection pool
 */
declare class MysqlPool {
    /**
     * Creates a new MysqlPool instance
     * @param {MysqlPoolConfig | string} config - Configuration for the MySQL pool
     */
    constructor(config: MysqlPoolConfig | string);
    pool: import("mysql2").Pool;
    /**
     * Executes a SQL query
     * @param {string} sql - The SQL query to execute
     * @param {Array} [values=[]] - The values to be inserted into the query
     * @param {Object} [options={}] - Additional options for the query
     * @returns {Promise<{results: any, fields: import('mysql2').FieldPacket[]}>} A promise that resolves with the query results and field information
     */
    query(sql: string, values?: any[], options?: any): Promise<{
        results: any;
        fields: import("mysql2").FieldPacket[];
    }>;
    /**
     * Ends the connection pool
     * @returns {Promise<void>} A promise that resolves when the pool has been ended
     */
    end(): Promise<void>;
    #private;
}
