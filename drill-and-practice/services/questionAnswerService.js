import { sql } from "../database/database.js";

const addAnswer = async (userId, questionId, optionId) => {
    await sql`INSERT INTO question_answers (user_id, question_id, question_answer_option_id) VALUES (${userId}, ${questionId}, ${optionId})`
}

const listQuestionAnswers = async () => {
    return await sql`SELECT * FROM question_answers`
}

export { addAnswer, listQuestionAnswers }