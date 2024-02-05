import { sql } from "../database/database.js";

const addOption = async (qId, option_text, is_correct) => {
    await sql`INSERT INTO question_answer_options (question_id, option_text, is_correct) VALUES (${qId}, ${option_text}, ${is_correct})`
}

const deleteOption = async (id) => {
    await sql`DELETE FROM question_answer_options WHERE id = ${id}`
}

const listOptions = async (id) => {
    return await sql`SELECT * FROM question_answer_options WHERE question_id = ${id}`
} 

const deleteQuestionOptions = async (questionID) => {
    await sql`DELETE FROM question_answer_options WHERE question_id = ${questionID}`
}

export { addOption, deleteOption, listOptions, deleteQuestionOptions }