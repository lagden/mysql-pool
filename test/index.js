'use strict'

import test from 'ava'
import MysqlPool from '../.'

const pool = new MysqlPool()

test('ok', async t => {
	const {results: [{total}]} = await pool.query('SELECT 1 + ? as total', [1])
	t.is(total, 2)
})

test('err', async t => {
	const error = await t.throws(pool.query('SELEC 1 + 1 as total'))
	t.is(error.message.split(':')[0], 'ER_PARSE_ERROR')
})
