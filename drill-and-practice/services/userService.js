import { sql } from "../database/database.js";

const addUser = async (email, password) => {
  await sql`INSERT INTO users
      (email, password)
        VALUES (${email}, ${password})`;
};

const findUserByEmail = async (email) => {
    return await sql`SELECT * FROM users WHERE email = ${email}`
}

export { addUser, findUserByEmail };