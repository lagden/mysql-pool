/**
 * Checks if a value is NaN and returns a default value if true, otherwise returns the original value.
 *
 * @param {*} value - The value to check for NaN.
 * @param {number} [defaultValue=0] - The default value to return if the input is NaN. Defaults to 0.
 * @returns {*} The original value if it's not NaN, otherwise the default value.
 */
export function checkNaN(value: any, defaultValue?: number): any;
