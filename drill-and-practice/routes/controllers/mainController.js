import * as topicService from "../../services/topicService.js";
import * as questionService from "../../services/questionService.js";
import * as questionAnswerService from "../../services/questionAnswerService.js";

const showMain = async ({ render }) => {
  const topics = await topicService.listTopics();
  const questions = await questionService.listAllQuestions();
  const questionAnswers = await questionAnswerService.listQuestionAnswers();
  render("main.eta", { topics: topics.length, questions: questions.length, questionAnswers: questionAnswers.length });
};

export { showMain };
