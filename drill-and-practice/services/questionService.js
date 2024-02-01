import { sql } from "../database/database.js";

const addQuestion = async (userId, topicID, text) => {
  await sql`INSERT INTO questions
      (user_id, topic_id, question_text)
        VALUES (${userId}, ${topicID}, ${text})`;
};

const listQuestions = async (topicId) => {
    return await sql`SELECT * FROM questions WHERE topic_id = ${topicId}`
}

export { addQuestion, listQuestions };