import { Vector3 } from 'three';

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
export const v3Add = (a, b) => a.clone().add(b);

/**
 * @param {Vector3} a
 * @param {Vector3} b
 * @returns {Vector3} result = a - b
 */
export const v3Subtract = (a, b) => a.clone().subtract(b);


/**
 * @param {Vector3} a
 * @param {Vector3} b
 * @returns {Vector3} result = a * b
 */
export const v3Multiply = (a, b) => a.clone().multiply(b);

/**
 * @param {Vector3} a
 * @param {Vector3} b
 * @returns {Vector3} result = a / b
 */
export const v3Divide = (a, b) => a.clone().divide(b);

/**
 * @param {Vector3} vec
 * @param {number} scalar
 * @returns {Vector3} result = vec * scalar
 */
export const v3MultiplyScalar = (vec, scalar) => vec.clone().multiplyScalar(scalar);
