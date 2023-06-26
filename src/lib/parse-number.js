export function parseNumber(v) {
	let _v = Number(v)
	if (Number.isNaN(_v) === false && Number.isInteger(_v)) {
		return _v
	}
}
