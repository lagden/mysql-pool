'use strict'

const test = require('ava')
const MysqlPool = require('..')

const pool = new MysqlPool({
	user: 'root'
})
const dbName = 'test'
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

test.after(async () => {
	await pool.query('DROP DATABASE ??', [dbName])
})

test('ok', async t => {
	const {results: [{total}]} = await pool.query('SELECT 1 + ? as total', [1])
	t.is(total, 2)
})

test('err', async t => {
	const error = await t.throwsAsync(pool.query('SELEC 1 + 1 as total'))
	t.is(error.message.split(':')[0], 'ER_PARSE_ERROR')
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
	t.is(insertId, 1)
	t.is(results.shift().name, 'Sabrina')
	t.is(results.pop().name, 'Thiago')
})
