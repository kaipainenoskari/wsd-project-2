import * as topicService from "../../services/topicService.js"
import * as questionService from "../../services/questionService.js"
import * as optionService from "../../services/optionService.js"
import * as questionAnswerService from "../../services/questionAnswerService.js"

const showTopics = async ({ render }) => {
    const topics = await topicService.listTopics()
    render("quiz.eta", { topics })
}

const showRandomQuestion = async ({ params, response }) => {
    const question = await questionService.listRandomQuestion(params.tId)
    if (question) {
        response.redirect(`/quiz/${params.tId}/questions/${question.id}`)
        return
    }
    response.redirect(`/quiz/${params.tId}/questions/0`)
}

const showQuestion = async ({ render, params }) => {
    if (params.qId === "0") {
        render("noQuestions.eta")
        return
    }
    const question = (await questionService.listSingleQuestion(params.tId, params.qId))[0]
    const options = await optionService.listOptions(params.qId)
    render("quizQuestion.eta", { question, options, topic: params.tId })
}

const addAnswer = async ({ params, response, user }) => {
    const userId = user.id
    await questionAnswerService.addAnswer(userId, params.qId, params.oId)
    const option = (await optionService.listOption(params.oId))[0]
    if (option.is_correct) {
        response.redirect(`/quiz/${params.tId}/questions/${params.qId}/correct`)
        return
    }
    response.redirect(`/quiz/${params.tId}/questions/${params.qId}/incorrect`)
}

const correctAnswer = async ({ render, params }) => {
    render("correct.eta", { topic: params.tId })
}

const incorrectAnswer = async ({ render, params }) => {
    const correctAnswer = (await optionService.listCorrectOption(params.qId))[0]
    render("incorrect.eta", { topic: params.tId, correctAnswer: correctAnswer.option_text })
}

const apiRandomQuestion = async ({ response }) => {
    const question = await questionService.listRandomQuestionWithoutTopic()
    if (!question) {
        response.body = {}
        return
    }
    const options = await optionService.listOptions(question.id)
    const res = {
        questionId: question.id,
        questionText: question.question_text,
        options: options.map(o => ({ optionId: o.id, optionText: o.option_text }))
    }
    response.body = res
}

const apiAnswerQuestion = async ({ request, response }) => {
    const body = request.body()
    const params = await body.value
    const optionId = params.get('optionId')
    const option = (await optionService.listOption(optionId))[0]
    response.body = { correct: option.is_correct }
}

export { showTopics, showRandomQuestion, showQuestion, addAnswer, correctAnswer, incorrectAnswer, apiRandomQuestion, apiAnswerQuestion }