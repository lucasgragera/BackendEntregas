import { dirname } from "path";
import { fileURLToPath } from "url";
export const __dirname = dirname(fileURLToPath(import.meta.url));

export default __dirname;

import { hashSync, genSaltSync, compareSync } from "bcrypt";

//register
export const createHash = (password) => {
    return hashSync(password, genSaltSync(10));
};

//login

/**
 * 
 * @param {*} password contraseña proporcionada por el usuario, sin hashear
 * @param {*} user usuario existente en base de datos
 * @returns boolean
 */
export const isValidPassword = (user, password ) => {
    return compareSync(password, user.password);
};