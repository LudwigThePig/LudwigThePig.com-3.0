export const radiansToDegrees = radians => radians * (180 / Math.PI);

export const degreesToRadians = degrees => degrees * (Math.PI / 180);

/**
 * @param {number} min minimum value to clamp
 * @param {number} max the min and max values
 * @returns {function} function to call with value
 */
export const clamp = (min, max) => val => Math.min(Math.max(val, min), max);


// _______ Add Vector3 without mutating _______

/**
 * @param {Vector3} a
 * @param {Vector3} b
 * @returns {Vector3} result = a + b
 */
export const vecAdd = (a, b) => a.clone().add(b);

/**
 * @param {Vector3} a
 * @param {Vector3} b
 * @returns {Vector3} result = a - b
 */
export const vecSubtract = (a, b) => a.clone().subtract(b);


/**
 * @param {Vector3} a
 * @param {Vector3} b
 * @returns {Vector3} result = a * b
 */
export const vecMultiply = (a, b) => a.clone().multiply(b);

/**
 * @param {Vector3} vec
 * @param {number} scalar
 * @returns {Vector3} result = vec * scalar
 */
export const vecMultiplyScalar = (vec, scalar) => vec.clone().multiplyScalar(scalar);

/**
 * @param {Vector3} a
 * @param {Vector3} b
 * @returns {Vector3} result = a / b
 */
export const vecDivide = (a, b) => a.clone().divide(b);

/**
 * @param {Vector3} vec
 * @param {number} scalar
 * @returns {Vector3} result = vec / scalar
 */
export const vecDivideScalar = (vec, scalar) => vec.clone().divideScalar(scalar);
