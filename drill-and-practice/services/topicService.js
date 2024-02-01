import { sql } from "../database/database";

const addTopic = async (userID, name) => {
    await sql`INSERT INTO topics (user_id, name) VALUES (${userID}, ${name})`
}

export { addTopic }