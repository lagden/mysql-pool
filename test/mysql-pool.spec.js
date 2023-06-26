import test from 'ava'
import {parseNumber} from '../src/lib/parse-number.js'
import MysqlPool from '../src/mysql-pool.js'

const {
	MYHOST: host = '127.0.0.1',
	MYPORT: port = 3306,
	MYUSER: user = 'root',
	MYPASS: password = 'root',
} = process.env

const pool = new MysqlPool({
	host,
	port,
	user,
	password,
})

const dbName = 'tmp_test'
const table = 'tmp_tbl'

test.before(async () => {
	const createTable = [
		'CREATE DATABASE IF NOT EXISTS ??;',
		'CREATE TABLE IF NOT EXISTS ?? (',
		'`id` int(11) unsigned NOT NULL AUTO_INCREMENT,',
		'`name` varchar(30),',
		'`age` int(11),',
		'PRIMARY KEY (`id`));'
	].join('\n')
	await pool.query(createTable, [dbName, `${dbName}.${table}`])
})

// test.after(async () => {
// 	await pool.query('DROP DATABASE ??', [dbName])
// })

test('parseNumber', t => {
	t.is(parseNumber('2.'), 2)
	t.is(parseNumber(2.02), undefined)
	t.is(parseNumber(2.0), 2)
	t.is(parseNumber('2'), 2)
	t.is(parseNumber(2), 2)
	t.is(parseNumber('xxx'), undefined)
})

test('ok', async t => {
	const {results: [{total}]} = await pool.query('SELECT 1 + ? as total', [1])
	t.is(total, 2)
})

test('err', async t => {
	const error = await t.throwsAsync(pool.query('SELEC 1 + 1 as total'))
	t.is(error.message.split(':')[0], 'ER_PARSE_ERROR')
})

test('connection err', async t => {
	const _pool = new MysqlPool({
		user: 'none',
		password: 'none',
	})
	const error = await t.throwsAsync(_pool.query('SELEC 1 + 1 as total'))
	t.true([
		'MySQL is requesting the sha256_password authentication method, which is not supported.',
		'connect ECONNREFUSED ::1:3306',
	].includes(error.message))
})

test('bulk', async t => {
	const data = [{name: 'Sabrina', age: 40}, {name: 'Lucas', age: 6}, {name: 'Thiago', age: 37}]
	const keys = Object.keys(data[0])
	const items = []
	for (const o of data) {
		const item = []
		for (const k of keys) {
			item.push(o[k])
		}

		items.push(item)
	}

	const {results: {insertId}} = await pool.query(`INSERT INTO ?? (${keys.join(', ')}) VALUES ?`, [`${dbName}.${table}`, items])
	const {results} = await pool.query(`SELECT ${keys.join(', ')} FROM ??`, [`${dbName}.${table}`])
	t.snapshot(insertId, 'total')
	t.snapshot(results, 'results')
})

test('end', async t => {
	await pool.query('DROP DATABASE ??', [dbName])
	await pool.end()
	const error = await t.throwsAsync(pool.query('SELECT 1 + ? as total', [1]))
	t.is(error.message, 'Pool is closed.')
})
