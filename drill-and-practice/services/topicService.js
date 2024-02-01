import { sql } from "../database/database.js";

const addTopic = async (userID, name) => {
    await sql`INSERT INTO topics (user_id, name) VALUES (${userID}, ${name})`
}

const listTopics = async () => {
    const rows = await sql`SELECT * FROM topics`
    return rows
}

export { addTopic, listTopics }