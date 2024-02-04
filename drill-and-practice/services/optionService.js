import { sql } from "../database/database.js";

const addOption = async (qId, option_text, is_correct) => {
    await sql`INSERT INTO question_answer_options (question_id, option_text, is_correct) VALUES (${qId}, ${option_text}, ${is_correct})`
}

export { addOption }