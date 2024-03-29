import { sql } from "../database/database.js";
import * as questionService from "./questionService.js"

const addTopic = async (userID, name) => {
    await sql`INSERT INTO topics (user_id, name) VALUES (${userID}, ${name})`
}

const listTopics = async () => {
    const rows = await sql`SELECT * FROM topics`
    return rows
}

const listSingleTopic = async (id) => {
    return (await sql`SELECT * FROM topics WHERE id = ${id}`)[0]
}

const listSingleTopicWithName = async (name) => {
    return (await sql`SELECT * FROM topics WHERE name = ${name}`)[0]
}

const deleteTopic = async (id) => {
    await questionService.deleteTopicQuestions(id)
    await sql`DELETE FROM topics WHERE id = ${id}`
}

export { addTopic, listTopics, listSingleTopic, listSingleTopicWithName, deleteTopic }