import * as questionService from "../../services/questionService.js"
import * as topicService from "../../services/topicService.js"
import * as optionService from "../../services/optionService.js"
import { validasaur } from "../../deps.js"

const questionValidationRules = {
    question_text: [validasaur.required, validasaur.minLength(1)]
}

const getQuestionData = async (request, params) => {
    const body = request.body({ type: "form" })
    const bodyParams = await body.value
    return {
        question_text: bodyParams.get("question_text"),
        id: params.id
    }
}

const addQuestion = async ({ request, response, render, user, params }) => {
    const questionData = await getQuestionData(request, params)
    const [passes, errors] = await validasaur.validate(questionData, questionValidationRules)

    if (!passes) {
        questionData.validationErrors = errors
        render("topic.eta", { topic: await topicService.listSingleTopic(questionData.id), questionData })
        response.redirect("/topics/" + questionData.id)
    } else {
        await questionService.addQuestion(user.id, questionData.id, questionData.question_text)
        response.redirect("/topics/" + questionData.id)
    }
}

const listSingleQuestion = async ({ render, params }) => {
    const id = params.id
    const qId = params.qId
    const question = await questionService.listSingleQuestion(id, qId)
    if (question && question.length != 0) {
        render("question.eta", { topic: id, question: question[0], options: await optionService.listOptions(qId) })
    }
}

const deleteQuestion = async ({ response, params }) => {
    const questionID = params.qId
    const topicID = params.id
    await questionService.deleteQuestion(questionID)
    response.redirect("/topics/" + topicID)
}

export { addQuestion, listSingleQuestion, deleteQuestion }