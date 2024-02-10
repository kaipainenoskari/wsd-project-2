import { sql } from "../database/database.js";
import * as optionService from "./optionService.js"
import { randomNumber } from "https://deno.land/x/random_number/mod.ts";

const addQuestion = async (userId, topicID, text) => {
  await sql`INSERT INTO questions
      (user_id, topic_id, question_text)
        VALUES (${userId}, ${topicID}, ${text})`;
};

const listQuestions = async (topicId) => {
    return await sql`SELECT * FROM questions WHERE topic_id = ${topicId}`
}

const listRandomQuestionWithoutTopic = async () => {
  const questions = await sql`SELECT * FROM questions`
  const index = randomNumber({ min: 0, max: questions.length - 1 })
  return questions[index]
}

const listRandomQuestion = async (topicId) => {
  const questions = await listQuestions(topicId)
  if (questions.length === 0) {
    return null
  }
  const index = randomNumber({ min: 0, max: questions.length - 1 })
  return questions[index]
}

const listSingleQuestion = async (topicId, questionID) => {
  return await sql`SELECT * FROM questions WHERE topic_id = ${topicId} AND id = ${questionID}`
}

const deleteQuestion = async (questionID) => {
  await sql`DELETE FROM questions WHERE id = ${questionID}`
}

const deleteTopicQuestions = async (topicID) => {
  const questions = await listQuestions(topicID)
  // Delete all options
  await Promise.all(questions.map(question => optionService.deleteQuestionOptions(question.id)))
  await sql`DELETE FROM questions WHERE topic_id = ${topicID}`
}

export { addQuestion, listQuestions, listSingleQuestion, deleteQuestion, deleteTopicQuestions, listRandomQuestion, listRandomQuestionWithoutTopic };