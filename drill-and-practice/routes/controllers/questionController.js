import * as questionService from "../../services/questionService.js"
import * as topicService from "../../services/topicService.js"
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
    } else {
        await questionService.addQuestion(user.id, questionData.id, questionData.question_text)
        response.redirect("/topics/" + questionData.id)
    }
}

export { addQuestion }