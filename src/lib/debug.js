import debug from 'debug'

const DEBUG_PREFIX = 'mysql-pool'

const error = debug(`${DEBUG_PREFIX}:error`)
const info = debug(`${DEBUG_PREFIX}:info`)
const log = debug(`${DEBUG_PREFIX}:log`)

// const colors = [7, 54, 58]
const colors = [0, 2, 5]

log.color = debug.colors[colors[0]]
info.color = debug.colors[colors[1]]
error.color = debug.colors[colors[2]]

export {
	error,
	info,
	log,
}
